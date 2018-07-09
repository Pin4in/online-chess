const express = require('express');

const app = express();

const staticAssets = __dirname + '/client/dist/online-chess';
app
  .use(express.static(staticAssets));

app.listen(3000);
