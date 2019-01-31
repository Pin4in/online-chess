const config    = require('config');
const jwt       = require('jwt-simple');
const passport  = require('passport');
const router    = require('express').Router();

function tokenForUser(user) {
  const { id } = user;
  const iat = new Date().getTime();
  return jwt.encode({id, iat}, config.get('jwt_secret'));
}

router
  .post("/signup",  function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.send({
          authenticated: false,
          message: info.message
        }); 
      }
      req.logIn(user, { session: false }, function(err) {
        if (err) { return next(err); }
        return res.send({
          token: tokenForUser(user),
          user: req.user,
          authenticated: req.isAuthenticated(),
        });
      });
    })(req, res, next);
  })
  .post('/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', { session: false }, function(err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.send({
          authenticated: false,
          message: info.message
        }); 
      }
      req.logIn(user, { session: false }, function(err) {
        if (err) { return next(err); }
        return res.json({
          token: tokenForUser(user),
          user: req.user,
          authenticated: req.isAuthenticated(),
        });
      });
    })(req, res, next);
  })
  .get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      res.send({
        authenticated: false,
      });
    });
  })
;

module.exports = router;