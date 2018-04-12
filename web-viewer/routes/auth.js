/*      处理用户登录退出和鉴权     */
"use strict";
var express = require('express');
var router = express.Router();
require('./common');

var tool = {
    checkUser                   : checkUser,
    ensureAuthenticatedUrl      : ensureAuthenticatedUrl,
    ensureAuthenticatedRouter   : ensureAuthenticatedRouter,
    ensureAuthenticated         : ensureAuthenticated
};



function checkUser(req,username,password,done){
    console.log('           req  = ');  console.dir(req.body);
    var ip = req.ip.toString().split(":").pop();
    console.log('           ip  = ');  console.dir(ip);
    var postData = {name: username, password: password, ip:ip};

    if(username =='admin' && password == '1'){
        var userData = {
            name : 'jetwaves',
            role:  'admin'
        };
        // 鉴权成功返回用户信息  这个数组会被赋值给  req.user
        return done(null, userData);
    } else {
        if(username == '' || password == ''){
            // 这样返回，会进入成功回调，从而返回错误消息提示
            return done(null, {authResult: false, msg : 'must provide username AND password'});
            //return done(null, '');            // 这样返回，会进入passport的 failureRedirect
        } else {
            // 鉴权失败，返回 /login
            return done(new Error('failed in strategy 2'), null);
        }
    }
}




// 使用用户名和密码检查用户身份是否合法
function checkUser_ByAPI(req,username,password,done){
    console.log('           req  = ');  console.dir(req);
    var url = '/Staff/check';
    var ip = req.ip.toString().split(":").pop();
    console.log('           ip  = ');  console.dir(ip);
    var postData = {name: username, password: password, ip:ip};
    urllib.api(url, postData).then(function(result){
        try{
            result = JSON.parse(result);
        }catch( err){
            console.log('failed while parsing auth result ' + result);
            return done(new Error('failed while parsing auth result '), null);
        }
        //console.log('   ---- LOG: ' + __filename + os.EOL + '        result  = ');  console.dir(result);
        if(result.result.toLowerCase() =='true'){
            //result.data.store_gid = result.data.FK_store_gid;
            //result.data.role_gid  = result.data.FK_role_gid;
            console.log('   auth.js     checkUser()      result.result  = true');  console.dir(result);
            return done(null, result.data);     // 鉴权成功返回用户信息  这个数组会被赋值给  req.user
        } else {
            console.log('   auth.js     checkUser()      result.result  = false');  console.dir(result);
            //return done(null, '');            // 这样返回，会进入passport的 failureRedirect
            return done(null, result);          // 这样返回，会进入成功回调，从而返回错误消息提示
        }
    }).catch(function(err){
        console.log('   auth.js     checkUser()      err  = ');  console.dir(err);
        return done(new Error('failed in strategy 2'), null);
    });
}




function ensureAuthenticatedUrl(req, res, next) {
    if (req.isAuthenticated()) {
        res.cookie('currentUser',JSON.stringify(req.user));
        //console.log('ensureAuthenticatedUrl set User cookie.  req.cookie.currentUser = ');  console.dir(req.cookie.currentUser);
        return next();
    }
    res.redirect('/login');
}

function ensureAuthenticatedRouter(req, res, next) {
    //console.log('   ---- LOG: ' + __filename + os.EOL + '        req.cookies  = ');  console.dir(req.cookies);
    if (req.isAuthenticated()) {

        res.cookie('currentUser',JSON.stringify(req.user));
        // console.log('ensureAuthenticatedRouter set User cookie res.cookie.currentUser = ');  console.dir(res.cookie.currentUser);
        return next();
    }
    res.status(401).send('Bad Request. Permission Denied');
}

function ensureAuthenticated(req, res, next) {
    return req.isAuthenticated();
}

module.exports = tool;
