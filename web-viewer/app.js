var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');

var moment = require('moment');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var pagesRouter = require('./routes/pages');
var TeamPerformanceRouter = require('./routes/TeamPerformance');


var app = express();

// require('./routes/common');

var localConfig = require('../config/config.js');
var auth = require('./routes/auth.js');
//
// passport 鉴权和session相关依赖
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// session 相关设置
app.use(session({
    /*store: new FileStore(sessionOptions),*/   /*不用 FileStore 就存入内存了, 以后换成mongodb */
    secret: localConfig.system.session_secret,
    retries: 50,    maxTimeout: 15000,
    resave: true, saveUninitialized: true,
    maxAge : 86400

}));

// 声明passport中间件的 LocalStrategy 本地（自定义）鉴权策略
passport.use(new LocalStrategy({passReqToCallback: true},
    function(req,username, password, done) {

        console.log('  LocalStrategy()      start ');
        auth.checkUser(req,username, password,function(err, res){
            // console.log('  LocalStrategy()      checkUser callback()  ');
            if(err){        // 后台鉴权期间报错扔Error的地方在这里处理    AUTH_ERROR_EVENT_HANDLER
                console.log('           AUTH_ERROR_EVENT_HANDLER    ERR:  err  = ');  console.dir(err);
                return done(null, { msg: err.toString(), authResult: false });      // 按ajax策略，这里通常是进不来的，只有server内部错误才会进来
            }else{
                console.log('           LocalStrategy  callback      success ');
                if(res && res.authResult && res.authResult === false ){             // 鉴权失败并返回错误信息的情况
                    return done(null, res);
                } else {                                                //  鉴权成功的情况
                    return done(null, res);
                }
            }
        });


    }
));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//  =========== 以下是静态路由部分 ==============
app.use('/public', express.static(__dirname + '/public'));                        // 映射public 目录
app.use('/fe', express.static(path.join( path.dirname(__dirname), 'node_modules')) ); // 映射Bower 静态目录
app.use('/vc', express.static(path.join( __dirname, 'webapp', 'vc')) );           // 映射Vuejs controller 静态目录
app.use('/webapp', express.static(path.join( __dirname, 'webapp')) );           // 映射Vuejs controller 静态目录

app.use('/webapp/moment.js', express.static(path.join( path.dirname(__dirname), 'node_modules','moment','min','moment.min.js')) ); // 映射Bower 静态目录
app.use('/webapp/angular-sanitize.js', express.static(path.join( path.dirname(__dirname), 'node_modules','angular-sanitize','angular-sanitize.min.js')) ); // 映射Bower 静态目录



// passport 把用户信息序列化和反序列化存入cookie
passport.serializeUser(function (user, cb) {
    //console.log('   ---- LOG: ' + __filename + os.EOL + '      serializeUser:  user  = ');  console.dir(user);
    cb(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, cb) {
    //console.log('   deserializeUser  user = ');  console.dir(user);
    try {
        user = JSON.parse(user);
        cb(null, user);
    } catch (err) {
        console.log('       passport.deserializeUser   fail.    ERR = ');
        console.dir(err);
        return cb('fail');
    }
});

app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
    req.settings = app.settings;
    if (req.user) {           // 登录后把用户身份加入req.body
        req.body.DRC_user_gid = req.user.gid;                   // 用户gid
    }
    //console.dir(req.settings);
    next();
});

app.get('/favicon.ico', function(req, res){
    res.end();
});


app.post('/login',      // 处理空用户名和密码
    function (req, res, next) {
        if (!req.body.username) return res.json({result: false, err: 'LOGIN_USERNAME_NULL', msg: '用户名不能为空'});
        if (!req.body.password)  res.json({result: false, err: 'LOGIN_USERNAME_NULL', msg: '密码不能为空'});
        next();
    }
);


// if (sysConf.system.activate_login_captcha) {
//     app.post('/login',      // 核对验证码
//         function (req, res, next) {
//             var inputCode = req.body.code;
//             //var codeCompData = { inputCode : inputCode, sessionCode : req.session.code};
//             //console.log('   ---- LOG: ' + __filename + os.EOL + '        codeCompData  = ');  console.dir(codeCompData);
//             if (inputCode == req.session.code) {
//                 next();
//             } else {
//                 res.redirect('/login?msg=LOGIN_VERIFY_ERROR');
//             }
//         }
//     );
// }


app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: false}),
    function (req, res, next) {
        console.log('login success');  // console.dir(req.user);
        console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
        console.log('┏---- INFO: ----- start [req.user @ ] -----');console.dir(req.user);console.log('┗---- INFO: -----  end  [req.user @ ] -----');

        if(req.user.authResult === false){
            res.json({result: false, data: req.user.msg, msg: req.user.msg});
        } else {
            res.json({result: true, data: '', msg: 'user authenticated successfully '});
        }
    }
);

app.get('/logout',
    function (req, res, next) {
        if( req.isAuthenticated() ){
            req.logout();
        }
        res.redirect('/login');
    }
);




//  =========== 以下是动态路由部分 ==============
app.use('/', indexRouter);
// app.use('/TeamPerformance', TeamPerformanceRouter);
app.use('/TeamPerformance', auth.ensureAuthenticatedUrl, TeamPerformanceRouter);
// app.use('/AuthedPages', auth.ensureAuthenticatedUrl, pagesRouter);

// app.use('/users', usersRouter);
// app.use('/pages', pagesRouter);
















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
