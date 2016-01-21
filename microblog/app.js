var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose') // mongodb操作中间件
var partials = require('express-partials'); // 使用 layout .ejs

// session
var session = require('express-session');
// mongodb 存储cookies
var MongoStore = require('connect-mongo')(session);

// mongodb conection
var dbUrl = 'mongodb://localhost/microblog';
var configDB = require('./config/db.js');
mongoose.connect(dbUrl);




// cookies db 配置
var settings = require('./settings');

var app = express();
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




// cookies
app.use(session(
    {
        secret: settings.cookieSecret,
        name: 'microblogkey',
        cookie: { maxAge: 1000 * 30 * 20 }, // 单位毫米
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            host: settings.host,
            port: settings.port,
            db: settings.db
        })
    }));
app.use(express.static(path.join(__dirname, 'public')));



// controller 

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/book');
var login = require('./routes/login');
var reg = require('./routes/reg');

// dynamicviews 
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.flash('error');
    var success = req.flash('error');
    res.locals.error = err.length ? err : null;
    res.locals.success = success.length ? success : null;
    next();
});
 
 
app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/login', login);
app.use('/register', reg); 

// require('./app/routes.js')(app, passport)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3005);

module.exports = app;
