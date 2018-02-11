const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const apiRoutes = require('./controllers/burgers_controller');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.listen(port);