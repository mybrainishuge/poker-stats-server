// chaning regular expressions feels a bit clunky
const normalizeName = (first, last) =>
  `${first} ${last}`
    .replace(/[^a-z+]+/gi, '-')
    .replace(/(^[^a-z]+)|([^a-z]+$)/gi, '')
    .toLowerCase();

// may want to get the cloudinary base url from an environment variable
const getAvatarUrl = (first, last) =>
  `https://res.cloudinary.com/viz/image/upload/ar_1:1,c_fill,g_auto:face,q_100,r_max,w_100/v1543707820/avatar/${normalizeName(
    first,
    last
  )}.jpg`;

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
