const countries = require('./data/countries.js');
const players = require('./data/players.js');

const createTableCountry = `
  CREATE TABLE IF NOT EXISTS country (
    id              SMALLINT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL UNIQUE,
    alpha2code      VARCHAR(2) NOT NULL UNIQUE,
    alpha3code      VARCHAR(3) NOT NULL UNIQUE
  )`;

const insertIntoCountry = `
  INSERT IGNORE INTO country
    (name, alpha2code, alpha3code)
  VALUES
    ${countries}
`;

const createTablePlayer = `
  CREATE TABLE IF NOT EXISTS player (
    id              INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first           VARCHAR(150) NOT NULL,
    last            VARCHAR(150) NOT NULL,
    winnings        DECIMAL(12,2) NOT NULL,
    country_id      SMALLINT unsigned NOT NULL,
    FOREIGN KEY(country_id) REFERENCES country(id)
  )`;

const insertIntoPlayer = `
  INSERT IGNORE INTO player
    (first, last, winnings, country_id)
  VALUES
    ${players}
`;

const selectAllPlayers = `
  SELECT p.id, p.first, p.last, p.winnings, c.alpha3code AS country, c.alpha2code
  FROM PLAYER p
  JOIN COUNTRY c ON (p.country_id = c.id)
`;

module.exports = {
  createTableCountry,
  createTablePlayer,
  insertIntoCountry,
  insertIntoPlayer,
  selectAllPlayers,
};
