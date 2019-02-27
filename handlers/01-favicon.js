const favicon = require('serve-favicon')

exports.init = app => app.use(favicon('client/dist/online-chess/favicon.ico'));
