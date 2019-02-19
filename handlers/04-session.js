const session = require('express-session')

exports.init = app => app.use(session({
  signed: false
}, app));
