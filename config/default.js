const path = require('path');

module.exports = {
  clientPath: path.join(process.cwd(), 'client/dist/online-chess'),
  host: '127.0.0.1',
  port: 3000,
  jwt_secret: 'onetwothreeten'
};
