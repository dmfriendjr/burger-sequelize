const express = require('express');
const burger = require('../models/burger');

var router = express.Router()

router.get('/burgers', async (req, res) => {
  let data = await burger.getAllBurgers();
  res.send(data);
})

router.post('/burgers', async (req, res) => {
  let data = await burger.addBurger(req.body.burgerName);
  res.send(data);
})

router.put('/burgers', async (req, res) => {
  let data = await burger.updateBurger(req.body.burgerId,req.body.devoured);
  res.send(data);
})


module.exports = router;