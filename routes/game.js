const router = require('express').Router();
const db = require('../db')


router
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
        // res.sendStatus(200);
        res.send({fen});
      }, next)
  });


module.exports = router;
