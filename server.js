const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./controllers/burgers_controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port);