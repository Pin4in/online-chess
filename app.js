const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();



// const staticAssets = __dirname + '/client/dist/online-chess';
// app
//   .use(express.static(staticAssets));

app
  .use(cors())
  .use(bodyParser.json())
  .get('/user/:id', (req, res, next) => {
    const { id } = req.params;

    db('users')
      .where('id', id)
      .first()
      .then(user => {
        if(!user) {
          res.sendStatus(404);
        }
        res.send(user);
      }, next)
  })
  .post('/user', (req, res, next) => {
    db('users')
      .insert(req.body)
      .then(user => {
        res.send(user);
      }, next)
  })
  .put('/user/:id', (req, res, next) => {
    const { id } = req.params;

    db('users')
      .where('id', id)
      .update(req.body)
      .then(user => {
        if (!user) {
          return res.sendStatus(400);
        }

        res.sendStatus(200);
      }, next)
  })
  .delete('/user/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .delete()
      .then(result => {
        if (!result) {
          return res.send(400);
        }
        res.send(200);
      }, next)
  })
  .get('/game/:id', (req, res, next) => {
    const { id } = req.params;

    db('games')
      .where('id', id)
      .first()
      .then(game => {
        if(!game) {
          res.sendStatus(404);
        }
        res.send(game);
      }, next)
  })
  .put('/game/:id', (req, res, next) => {
    const { id } = req.params;
    const { fen } = req.body;
    console.log(fen)
    db('games')
      .where('id', id)
      .update({ fen })
      .then(done => {
        if (!done) {
          return res.sendStatus(400);
        }

        res.sendStatus(200);
      }, next)
  });

app.listen(3000);
