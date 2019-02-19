const favicon = require('serve-favicon')

exports.init = app => app.use(favicon('assets/favicon.png'));
