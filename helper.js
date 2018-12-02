const cloudinary = require('cloudinary');

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'viz',
});

const normalizeName = (first, last) =>
  `${first} ${last}`
    .replace(/[^a-z+]+/gi, '-')
    .replace(/(^[^a-z]+)|([^a-z]+$)/gi, '')
    .toLowerCase();

const getAvatarUrl = (first, last) =>
  cloudinary.url(`avatar/${normalizeName(first, last)}.jpg`, {
    aspect_ratio: '1:1',
    crop: 'fill',
    gravity: 'face:auto',
    quality: 100,
    radius: 'max',
    secure: true,
    width: 50,
  });

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const decoratePlayersWithAvatars = players =>
  players.map(player => {
    player.avatar = getAvatarUrl(player.first, player.last);
    player.winnings = currency.format(player.winnings);
    return player;
  });

module.exports = { decoratePlayersWithAvatars };
