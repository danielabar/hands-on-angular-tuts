var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function Auth(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // A real app would hash pswd and check in db
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      process.nextTick(function() {
        if (username === 'admin@test.com' && password === 'password') {
          var user = {email: username, displayName: 'Administrator'}
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  ));

  // Serialized and deserialized methods when got from session
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

  // route to test if the user is logged in or not
  app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // route to log in
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  // route to log out
  app.post('/api/logout', function(req, res) {
    req.logOut();
    res.send(200);
  });

};