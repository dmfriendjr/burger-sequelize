const express = require('express');
const db = require('../models');

var router = express.Router()

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
    res.send();
    return;
  }

  res.statusCode = 200;
  res.send(data);
});

router.post('/api/burgers', async (req, res, next) => {
  //Ensure burger name contains the word 'burger' for consistency
  if (req.body.burger_name.match(/(burger)/gi) === null) {
    req.body.burgerName += ' Burger';
  }

  let data;
  try {
    data = await db.burgers.create(req.body);
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

  let uneatenBurgers = convertBurgerData(uneatenData); 
  let eatenBurgers = convertBurgerData(eatenData);
  res.render('index', { uneatenBurgers, eatenBurgers });
});

function convertBurgerData(data) {
  return data.map(burger => {
    return burger.dataValues;
  });
}

module.exports = router;