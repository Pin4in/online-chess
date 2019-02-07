const router = require('express').Router();
const db = require('../db')
const passport =require('passport');


router
  .get('/games', (req, res, next) => {
    const userId = 1;

    db('games')
      .where({ 'owner': userId })
      .orWhere({ competitor: userId })
      // .first()
      .then(games => {
        console.log(games);
        if (games.length > 0) {
          res.send(games);
        } else {
          res.sendStatus(404);
        }
      }, next)
  })
  .get('/game/:id', (req, res, next) => {
  // .get('/game/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('    loading game')
    const { id } = req.params;
    const userId = 1;
    db('games')
      .where({
        'id': id,
        'owner': userId
      })
      .orWhere({
        'id': id,
        competitorId: userId
      })
      .first()
      .then(game => {
        if(!game) {
          res.sendStatus(404);
        }
        const _game = {
          fen: game.fen,
          owner: game.owner === userId,
          competitorId: game.competitorId,
          side: game.ownerSide,
          title: game.title
        }
        res.send(_game);
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
