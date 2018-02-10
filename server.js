const express = require('express');
const bodyParser = require('body-parser');
const orm = require('./config/orm');
const burger = require('./models/burger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/burgers', async (req, res) => {
  let data = await burger.getAllBurgers();
  res.send(data);
})

app.post('/api/burgers', async (req, res) => {
  let data = await burger.addBurger(req.body.burgerName);
  res.send(data);
})

app.put('/api/burgers', async (req, res) => {
  let data = await burger.updateBurger(req.body.burgerId,req.body.devoured);
  res.send(data);
})


app.listen(port);