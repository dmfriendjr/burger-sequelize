const express = require('express');
const db = require('../models');

var router = express.Router()

db.customers.hasMany(db.burgers, {foreignKey: 'creator_id', constraints: false, as: 'burgers'});
db.burgers.belongsTo(db.customers, {foreignKey: 'creator_id', constraints: false, as: 'creator'});

router.get('/api/burgers/:eaten?', async (req, res) => {
  let data;

  try {
    if (!req.params.eaten) {
        data = await db.burgers.findAll();
    } else if (req.param.eaten == 'true') {
        data = await db.burgers.findAll({where: {devoured: true}});
    } else {
        data = await db.burgers.findAll({where: {devoured: false}});
    }
  } catch(e) {
    if (e.name === 'SequelizeValidationError') {
      console.log('Validation error occured.');
    } else {
      throw(e);
    }
    res.statusCode = 400;
    res.send();
    return;
  }

  res.statusCode = 200;
  res.send(data);
});

router.put('/api/burgers', async (req, res) => {

  let data;  
  try {
    data = await db.burgers.update(req.body, {where: {id: req.body.id}});
  } catch(e) {
    if (e.name === 'SequelizeValidationError') {
      console.log('Validation error occured.');
    } else {
      throw(e);
    }
    res.statusCode = 400;
    res.send()
    return;
  }

  res.statusCode = 200;
  res.send(data);
});

router.post('/api/burgers', async (req, res, next) => {
  //Ensure burger name contains the word 'burger' for consistency
  if (req.body.burger_name.match(/(burger)/gi) === null) {
    req.body.burger_name += ' Burger';
  }

  console.log(req.body);

  let data;
  try {
    if (req.body.customer_name != null) {
      let custData  = await db.customers.create({customer_name: req.body.customer_name});
      data = await db.burgers.create({burger_name: req.body.burger_name}).then(burgerData => {
        custData.addBurger(burgerData);
      })
    } else {
      data = await db.burgers.create(req.body.burger_name);
    }
    
    res.end();
  } catch(e) {
    if (e.name === 'SequelizeValidationError') {
      console.log('Validation error occured');
    } else {
      throw (e);
    }
    res.statusCode = 400;
    res.send();
    return;
  }

  res.statusCode = 200;
  res.send(data);
});

router.get('/', async (req, res) => {
  let uneatenData;
  let eatenData;
  try {
    uneatenData = await db.burgers.findAll({where: {devoured: false}});
    eatenData = await db.burgers.findAll({where: {devoured: true}});
  } catch(e) {
    res.statusCode = 500;
    res.send();
    return;
  }

  let uneatenBurgers = await convertBurgerData(uneatenData); 
  let eatenBurgers = await convertBurgerData(eatenData);
  console.log('Uneaten is:',uneatenBurgers);
  res.render('index', { uneatenBurgers, eatenBurgers });
});

async function convertBurgerData(data) {
  //Get customer data for each value
    let result = data.map(async (burger) => {
      return burger.getCreator()
        .then(creatorData => {
          console.log(creatorData);
          return {
            creator_name: creatorData.dataValues.customer_name,
            burger_name: burger.dataValues.burger_name           
          } 
        });
    });

    return Promise.all(result).then((completed) => completed);
}

module.exports = router;