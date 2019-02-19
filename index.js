const config = require('config');
const server = require('./server');

server.listen(config.get('port'), () => {
  console.log(`Server is running on port ${config.get('port')}`);
});
