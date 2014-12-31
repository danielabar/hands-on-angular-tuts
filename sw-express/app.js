var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Auth = require("./lib/auth");

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var edges = require('./routes/edges');
var categories = require('./routes/categories');
var ranks = require('./routes/ranks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'somesillyexamplenottherealthing',
  resave: false,
  saveUninitialized: true
}));

// passport
var auth = new Auth(app);
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Put all the passport stuff here unless can figure out a way to extract to separate file
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// A real app would hash pswd and check in db
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   function(username, password, done) {
//     process.nextTick(function() {
//       if (username === 'admin@test.com' && password === 'password') {
//         var user = {email: username, displayName: 'Administrator'}
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   }
// ));

// Serialized and deserialized methods when got from session
// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });

// route to test if the user is logged in or not
// app.get('/api/loggedin', function(req, res) {
//   res.send(req.isAuthenticated() ? req.user : '0');
// });

// route to log in
// app.post('/api/login', passport.authenticate('local'), function(req, res) {
//   res.send(req.user);
// });

// route to log out
// app.post('/api/logout', function(req, res) {
//   req.logOut();
//   res.send(200);
// });

app.use('/', routes);
app.use('/users', users);
app.use('/api/edges', edges);
app.use('/api/categories', categories);
app.use('/api/ranks', ranks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
