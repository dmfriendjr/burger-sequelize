const mysql = require('mysql');

var connection = mysql.createConnection(process.env.DATABASE_URL);

connection.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connection = mysql.createConnection(process.env.DATABASE_URL)
  }
})

module.exports = connection;