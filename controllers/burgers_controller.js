const express = require('express');
const burger = require('../models/burger');

var router = express.Router()

router.get('/api/burgers/:eaten?', async (req, res) => {
  console.log(!req.params.eaten);
  if (!req.params.eaten) {
    let data = await burger.getAllBurgers();
    res.send(data);
  } else if (req.param.eaten == 'true') {
    let data = await burger.getAllEatenBurgers();
    res.send(data);
  } else {
    let data = await burger.getAllUneatenBurgers();
    res.send(data);
  }
});

router.put('/api/burgers', async (req, res) => {
  console.log(req.body);
  let data = await burger.updateBurger(req.body.burgerId,req.body.devoured);
  res.send(data);
});

router.post('/api/burgers', async (req, res, next) => {
  if (req.body.burgerName.length === 0) {
    return;
  }
  //Ensure burger name contains the word 'burger' for consistency
  if (req.body.burgerName.match(/(burger)/gi) === null) {
    req.body.burgerName += ' Burger';
  }

  let data = await burger.addBurger(req.body.burgerName);

  res.send(data);
});

router.get('/', async (req, res) => {
  let uneaten = await burger.getAllUneatenBurgers();
  let eaten = await burger.getAllEatenBurgers();
  res.render('index', { uneatenBurgers: uneaten, eatenBurgers: eaten });
});

module.exports = router;