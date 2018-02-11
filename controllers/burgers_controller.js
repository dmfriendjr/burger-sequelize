const express = require('express');
const burger = require('../models/burger');

var router = express.Router()

router.get('/burgers', async (req, res) => {
  let data = await burger.getAllBurgers();
  res.send(data);
});

router.put('/burgers', async (req, res) => {
  let data = await burger.updateBurger(req.body.burgerId,req.body.devoured);
  res.send(data);
});

router.post('/burgers', async (req, res, next) => {
  await burger.addBurger(req.body.burgerName);
  renderIndex(res);
});

router.get('/', async (req, res) => {
  renderIndex(res);
});

async function renderIndex(res) {
  let data = await burger.getAllBurgers();
  res.render('index', { uneatenBurgers: data });
}


module.exports = router;