const config = require('config');
const server = require('./server');

server.listen(config.get('port'), config.get('host'));
