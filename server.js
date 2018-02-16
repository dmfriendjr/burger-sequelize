const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./controllers/burgers_controller');
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

db.burgers.sync({force: true});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/static', express.static('public'));

app.listen(port);