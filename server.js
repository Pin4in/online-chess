const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const app = express();

const passport = require('passport');
require('./passport.js');

const auth = require('./routes/auth');
const userApi = require('./routes/user');
const gameApi = require('./routes/game');
// const staticAssets = __dirname + '/client/dist/online-chess';
// app
//   .use(express.static(staticAssets));

app
  .use(morgan('dev'))
  .use(cors())
  .use(bodyParser.json())

  // Here we declare our API which will be visible under prefix path
  // router.get('/', function (req, res) {
  //   console.log("request to subspace hello");
  //   res.send({ message: "Hi from subspace /api/v1/"});
  // });

  // we attach our routes under /api
  // .use('/api', router)

  // protect api calls
  // app.all('/api/*', requireAuthentication);
if(process.env.NODE_ENV === 'production') {
  app
    .use(express.static(config.get('clientPath')));
}
app
  .use(passport.initialize())
  .use(passport.session())
  .use(auth)
  .use('/api', userApi)
  .use('/api', gameApi)
;



module.exports = app;