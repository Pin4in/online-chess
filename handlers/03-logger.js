const morgan = require('morgan');

exports.init = app => app.use(morgan('tiny'));
