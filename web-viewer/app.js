var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');






var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var pagesRouter = require('./routes/pages');



var app = express();



// require('./routes/common');
//
// var localConfig = require('./config/config.js');
// var auth = require('./routes/auth.js');
//
// // passport 鉴权和session相关依赖
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//
// // session 相关设置
// app.use(session({
//     /*store: new FileStore(sessionOptions),*/   /*不用 FileStore 就存入内存了, 以后换成mongodb */
//     secret: localConfig.session_secret,
//     retries: 50,    maxTimeout: 15000,
//     resave: true, saveUninitialized: true,
//     maxAge : 86400
//
// }));
//
// passport.use(new LocalStrategy({passReqToCallback: true},
//     function(req,username, password, done) {
//         console.log('  LocalStrategy()      start ');
//         auth.checkUser(req,username, password,function(err, res){
//             console.log('  LocalStrategy()      checkUser callback()  ');
//             if(err){
//                 console.log('   checkUser   callback      error ');
//                 return done(err, null);      // TODO： 这里要改成404
//             }else{
//                 console.log('   checkUser   callback      success ');
//                 return done(null, res);
//             }
//         });
//     }
// ));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/pages', pagesRouter);













// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
