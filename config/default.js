const path = require('path');

module.exports = {
  client: path.join(process.cwd(), 'client/dist/online-chess'),
  port: process.env.PORT || 3000,
  jwt_secret: process.env.JWT_SECRET || 'onetwothreeten',
  mongodb: {
    debug: false,
    uri: process.env.MONGODB_URI || 'mongodb://localhost/online_chess'
  },
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  }
};
