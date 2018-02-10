const connection = require('./connection');

connection.query('CREATE DATABASE IF NOT EXISTS burgers_db', (err, res) => {
  if (err) throw err;
  connection.query('USE burgers_db', (err, res) => {
    connection.query('CREATE TABLE IF NOT EXISTS burgers (id int NOT NULL AUTO_INCREMENT, burger_name VARCHAR(100) NOT NULL, devoured boolean DEFAULT false, time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))');
  })
});

var orm = {
  selectAll: (tableName) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ??', tableName, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
    });
  },
  insertOne: (tableName, column, value) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO ?? (??) VALUE (?)', [tableName, column, value], (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
    })
  },
  updateOne: (tableName, column, value, selectionTarget, selectionValue) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE ?? SET ?? = ? WHERE ?? = ?', [tableName, column, value, selectionTarget, selectionValue], (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
    })
  }
}

module.exports = orm;