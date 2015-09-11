var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash=require('connect-flash');
// session
var session = require('express-session');
// mongodb
var MongoStore = require('connect-mongo')(session);

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/book');
var login = require('./routes/login');
var reg = require('./routes/reg');

// cookies db 配置
var settings = require('./settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// cookies
app.use(session(
  {
    secret:settings.cookieSecret,
    name:'microblogkey',
    cookie:{maxAge:1000*30*20}, // 单位毫米
    resave:false,
    saveUninitialized:true,
    store:new MongoStore({
      host:settings.host,
      port:settings.port,
      db:settings.db      
    })
   }));
app.use(express.static(path.join(__dirname, 'public')));

// controller 
app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/login',login);
app.use('/register',reg);

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
