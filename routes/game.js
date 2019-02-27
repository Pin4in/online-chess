const router = require('express').Router();
const db = require('../db')
const pick = require('lodash').pick;
const Game = require('../models/Game');



router
  .get('/games', (req, res, next) => {
    const { id } = req.user;
    const queryObj = {
      $or:[ 
        {'owner':id}, {'competitor':id} 
      ]
    };

    Game.find(queryObj)
      .then(games => {
        if (games.length > 0) {
          const _games = games.map(g => {
            return pick(g, ['_id', 'title'])
          })
          res.send(_games);
        } else {
          res.status(404);
          res.send('No active games');
        }
      }, next)
    // const id = 1
    // db('games')
    //   .where({ 'owner': id })
    //   .orWhere({ competitorId: id })
    //   .then(games => {
    //     if (games.length > 0) {
    //       res.send(games);
    //     } else {
    //       res.sendStatus(404);
    //     }
    //   }, next)
  })
  // .get('/game/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   const userId = 1;
  //   db('games')
  //     .where({
  //       'id': id,
  //       'owner': userId
  //     })
  //     .orWhere({
  //       'id': id,
  //       competitorId: userId
  //     })
  //     .first()
  //     .then(game => {
  //       if(!game) {
  //         res.sendStatus(404);
  //       }
  //       const _game = {
  //         fen: game.fen,
  //         owner: game.owner === userId,
  //         competitorId: game.competitorId,
  //         side: game.ownerSide,
  //         title: game.title
  //       }
  //       res.send(_game);
  //     }, next)
  // })
  // .put('/game/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   const { fen } = req.body;
  //   db('games')
  //     .where('id', id)
  //     .update({ fen })
  //     .then(done => {
  //       if (!done) {
  //         return res.sendStatus(500);
  //       }
  //       res.send({fen});
  //     }, next)
  // });


module.exports = router;
