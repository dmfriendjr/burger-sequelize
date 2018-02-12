const mysql = require('mysql');

var pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = pool;