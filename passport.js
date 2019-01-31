const config         = require('config');
const db             = require('./db');
const passport       = require('passport');
const JwtStrategy    = require('passport-jwt').Strategy;
const extractJwt     = require('passport-jwt').ExtractJwt;
const LocalStrategy  = require('passport-local').Strategy;
const bcrypt         = require('bcrypt-nodejs');


const jwtOptions = {
  jwtFromRequest: extractJwt.fromHeader('authorization'),
  secretOrKey: config.get('jwt_secret')
};
const signupOptions = {
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
};

passport.use(new JwtStrategy(jwtOptions, jwtLogin));
passport.use(new LocalStrategy({ usernameField: 'email'}, login));
passport.use('signup', new LocalStrategy(signupOptions, signup))

function jwtLogin(payload, done) {
  db('users')
    .where('id', payload.id)
    .first()
    .then(user => {
        done(null, user)
    })
    .catch(err => done(err));
}

function login(email, password, done) {
  db('users')
    .where('email', email)
    .first()
    .then((user) => {
      if(!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'invalid email and password combination'});
      }
      done(null, user);
    })
    .catch(err => {
      console.log('Passport login', err);
      done(err)
    });
}

function signup(req, name, password, done) {
  db('users')
    .where('email', name)
    .first()
    .then((user) => {
      if (user) {
        return done(null, false, {message: 'an account with that email has already been created'});
      }
      if (password !== req.body.password2) {
        return done(null, false, {message: "passwords don't match"})
      }

      const newUser = {
        name,
        email: req.body.email,
        password: bcrypt.hashSync(password)
      };

      db('users')
        .insert(newUser)
        .then((ids) => {
          newUser.id = ids[0];
          done(null, newUser);
        })
    })
    .catch(err => {
      console.log(err)
    });
}

passport.serializeUser((user, done) => {
  done(null, user.id);
})
passport.deserializeUser((id, done) => {
  db('users')
    .where('id', id)
    .first()
    .then(user => {
        done(null, user)
    })
    .catch(err => done(err));
})