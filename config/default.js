const path = require('path');

module.exports = {
  client: path.join(process.cwd(), 'client/dist/online-chess'),
  port: process.env.PORT || 3000,
  jwt_secret: 'onetwothreeten',
};
