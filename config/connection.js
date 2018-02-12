const mysql = require('mysql');
console.log('Database URL:', process.env.DATABASE_URL);

const connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connection;