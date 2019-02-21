const jwt = require('jwt-simple');
const passport = require('passport');
const router = require('express').Router();
const db = require('../db');
const pick = require('lodash').pick;


router
  .get('/user/', (req, res, next) => {
    const user = pick(req.user, ['id', 'username', 'email'])
    if (!user) {
      res.sendStatus(401);
    }
    res.send(user);
  })
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



module.exports = router;