const User = require('../models/User');
const Game = require('../models/Game');
const mongoose = require('../libs/mongoose');
const users = require('./users');
const games = require('./games');
const { pick, merge } = require('lodash');

(async () => {
  await User.remove();
  await Game.remove();

  const newUsers = [];
  for (let user of users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
    newUsers.push(u);
  }

  for (let game of games) {
    const owner = newUsers.find(u => u.username === game._owner)._id;
    const competitor = newUsers.find(u => u.username === game._competitor)._id;
    const _game = merge(pick(game, ['fen', 'ownerSide', 'title']), {owner, competitor});
    const g = new Game(_game);
    await g.save();
  }

  mongoose.disconnect();
  console.log(`${users.length} users have been saved in DB`);
  console.log(`${games.length} games have been saved in DB`);
  console.log('All done.')
})();