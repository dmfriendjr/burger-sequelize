const express = require('express');
const db = require('../models');

var router = express.Router()

router.get('/api/burgers/:eaten?', async (req, res) => {
  if (!req.params.eaten) {
    let data = await db.burgers.findAll();
    res.statusCode = 200;
    res.send(data);
  } else if (req.param.eaten == 'true') {
    let data = await db.burgers.findAll({where: {devoured: true}});
    res.statusCode = 200;
    res.send(data);
  } else {
    let data = await db.burgers.findAll({where: {devoured: false}});
    res.statusCode = 200;
    res.send(data);
  }
});

router.put('/api/burgers', async (req, res) => {
  let data = await db.burgers.update(req.body, {where: {id: req.body.id}});
  res.statusCode = 200;
  res.send(data);
});

router.post('/api/burgers', async (req, res, next) => {
  if (req.body.burger_name.length === 0) {
    res.statusCode = 400;
    res.send();
    return;
  }
  //Ensure burger name contains the word 'burger' for consistency
  if (req.body.burger_name.match(/(burger)/gi) === null) {
    req.body.burgerName += ' Burger';
  }

  let data = await db.burgers.create(req.body);

  res.statusCode = 200;
  res.send(data);
});

router.get('/', async (req, res) => {
  let uneatenData = await db.burgers.findAll({where: {devoured: false}});
  let eatenData = await db.burgers.findAll({where: {devoured: true}});
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