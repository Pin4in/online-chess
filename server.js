const express = require('express');
const app = express();
const http = require('http').Server(app);
const passport = require('passport');
const config = require('config');
const socket = require('./libs/socket')

const auth = require('./routes/auth');
const userApi = require('./routes/user');
const gameApi = require('./routes/game');
// const staticAssets = __dirname + '/client/dist/online-chess';


// HANDLERS
require('./handlers/01-favicon').init(app);
// require('./handlers/02-static').init(app);
app.use(express.static(config.get('client')))
require('./handlers/03-logger').init(app);
require('./handlers/05-cors').init(app);
require('./handlers/06-bodyParser').init(app);
require('./handlers/07-passport').init(app);


// ROUTES
app
  .use(auth)
  // Protected routes
  .use('/api/*', passport.authenticate('jwt', { session: false }))
  .use('/api', userApi)
  .use('/api', gameApi)
;

// start socket
socket(http);


// ERROR HANDLER
require('./handlers/99-errors').init(app);


module.exports = http;