const mysql = require('mysql');
const players = require('./data/players.js');
const {
  createTableCountry,
  createTablePlayer,
  insertIntoCountry,
  insertIntoPlayer,
} = require('./query.js');

module.exports = () => {
  const connection = mysql.createConnection({
    host: process.env.POKER_HOST || 'localhost',
    user: process.env.POKER_USER || 'pokeruser',
    password: process.env.POKER_PASSWORD || 'password',
    database: process.env.POKER_DATABASE || 'pokerdb',
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

    connection.query(insertIntoPlayer, [players], (err, result) => {
      if (err) throw err;
      console.log(`Table "player"  -> ${result.affectedRows} new records added`);
    });
  });

  return connection;
};
