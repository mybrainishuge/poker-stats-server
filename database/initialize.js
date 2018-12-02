const mysql = require('mysql');
const {
  createTableCountry,
  createTablePlayer,
  insertIntoCountry,
  insertIntoPlayer,
} = require('./query.js');

module.exports = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    // get user, password, and database from environment
    user: 'pokeruser',
    password: 'password',
    database: 'pokerdb',
  });

  connection.connect(err => {
    if (err) throw err;
    console.log(`Connected to mysql as id ${connection.threadId}`);

    connection.query(createTableCountry, (err, result) => {
      if (err) throw err;
      console.log('Table "country" -> exists');
    });

    connection.query(insertIntoCountry, (err, result) => {
      if (err) throw err;
      console.log(`Table "country" -> ${result.affectedRows} new records added`);
    });

    connection.query('DROP TABLE IF EXISTS player', (err, result) => {
      if (err) throw err;
      console.log('Table "player"  -> dropped');
    });

    connection.query(createTablePlayer, (err, result) => {
      if (err) throw err;
      console.log('Table "player"  -> exists');
    });

    connection.query(insertIntoPlayer, (err, result) => {
      if (err) throw err;
      console.log(`Table "player"  -> ${result.affectedRows} new records added`);
    });
  });

  return connection;
};
