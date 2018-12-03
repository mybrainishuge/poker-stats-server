const env = require('dotenv').config();

if (env.error) throw env.error;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initializeDatabase = require('./database/initialize.js');
const {
  insertIntoPlayer,
  selectPlayer,
  selectAllPlayers,
  updatePlayerWinnings,
} = require('./database/query.js');
const { decorateAndSortPlayers } = require('./helper.js');

const server = express();
const port = env.parsed.PORT || 3333;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const db = initializeDatabase();

server.get('/players', (req, res) => {
  db.query(selectAllPlayers, (err, result) => {
    if (err) throw err;
    res.send(decorateAndSortPlayers(result));
  });
});

server.post('/add', (req, res) => {
  const { country, first, last, winnings } = req.body;
  const data = [[first, last, winnings, country]];

  db.query(insertIntoPlayer, [data], (err, result) => {
    if (err) throw err;

    db.query(selectAllPlayers, (err, result) => {
      if (err) throw err;
      res.send(decorateAndSortPlayers(result));
    });
  });
});

server.patch('/update', (req, res) => {
  const { id, value } = req.body;

  db.query(selectPlayer, [id], (err, result) => {
    if (err) throw err;
    const { winnings } = result[0];

    db.query(updatePlayerWinnings, [winnings + value, id], (err, result) => {
      if (err) throw err;

      db.query(selectAllPlayers, (err, result) => {
        if (err) throw err;
        res.send(decorateAndSortPlayers(result));
      });
    });
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
