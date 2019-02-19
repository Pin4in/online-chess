const passport = require('passport');
require('../libs/passport.js');

exports.init = app => app
  .use(passport.initialize())
  // .use(passport.session())
;