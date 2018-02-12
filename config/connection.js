const mysql = require('mysql');

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connnection.createConnection(process.env.DATABASE_URL)
  }
})

module.exports = connection;