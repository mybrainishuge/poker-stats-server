const env = require('dotenv').config();

if (env.error) throw env.error;

const express = require('express');
const cors = require('cors');

const initializeDatabase = require('./database/initialize.js');
const { selectAllPlayers } = require('./database/query.js');
const { decoratePlayersWithAvatars } = require('./helper.js');

const server = express();
const port = env.parsed.PORT || 3333;

server.use(cors());
const db = initializeDatabase();

server.get('/', (req, res) => res.send('Hello World!'));

server.get('/players', (req, res) => {
  db.query(selectAllPlayers, (err, result) => {
    if (err) throw err;
    res.send(decoratePlayersWithAvatars(result));
  });
});

server.post('/add', (req, res) => res.send('player added'));

server.listen(port, () => console.log(`Server listening on port ${port}`));
