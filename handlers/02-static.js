const staticAssets = __dirname + '/client/dist/online-chess';

exports.init = app => app.use(express.static(staticAssets))