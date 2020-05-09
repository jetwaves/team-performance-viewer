/*      处理用户登录退出和鉴权     */
"use strict";
var express = require('express');
var router = express.Router();
var config = require('../../config/config.js');
var msgTxt = config.txt;
var Hashes = require('jshashes');
var moment = require('moment');
require('./common');

var tool = {
    checkUser                   : checkUser,
    ensureAuthenticatedUrl      : ensureAuthenticatedUrl,
    ensureAuthenticatedRouter   : ensureAuthenticatedRouter,
    ensureAuthenticated         : ensureAuthenticated
};







function checkUser(req,username,password,done){
    var ip = req.ip.toString().split(":").pop();
    console.log('           ip  = ');  console.dir(ip);

    checkUserLocally(req, username, password).then(function(authRes){
        console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
        console.log('┏---- INFO: ----- start [authRes @ ] -----');console.dir(authRes);console.log('┗---- INFO: -----  end  [authRes @ ] -----');
        return done(null, authRes);          // 鉴权成功的时候  authRes  是用户信息
    }).catch(function(authErr){
        console.log('           checkUser  authErr  = ');  console.dir(authErr);
        return done(null, {authResult: false, msg : authErr.msg });         // 鉴权失败的情况下， authErr是错误信息
    });
}



function checkUserLocally(req, username, password){
    return new Promise(
function(resolve, reject){
    if(username === '' || password === '' || password === 'd41d8cd98f00b204e9800998ecf8427e'){   //      d41d8cd98f00b204e9800998ecf8427e 是'空'的md5
        return reject({ msg : msgTxt.AUTH_MUST_PROVIDE_USERNAME_PASSWORD });
    }

    // ===== 以下是简单的文本比对，可以自行改成api调用或数据库调用鉴权
    var md5 = new Hashes.MD5;
    if(username === config.system.testAdmin.username && password === md5.hex(config.system.testAdmin.password )){
        //  auth success with username and password
        var userData = {
            name : config.system.testAdmin.username,
            role:  config.system.testAdmin.role
        };
        // 鉴权成功返回用户信息  这个数组会被赋值给  req.user
        return resolve(userData);                     //  鉴权成功用这一句
    } else {
        console.log(' checkUserLocally: auth fail');
        return reject({ msg : msgTxt.AUTH_FAILED });        //  鉴权失败用这一句
    }

})
}


// function checkUser_STATIC(req,username,password,done){
//     console.log('           req  = ');  console.dir(req.body);
//     var ip = req.ip.toString().split(":").pop();
//     console.log('           ip  = ');  console.dir(ip);
//     var postData = {name: username, password: password, ip:ip};
//
//
//     var md5 = new Hashes.MD5;
//     if(username === config.system.testAdmin.username && password === md5.hex(config.system.testAdmin.password )){
//         //  auth success with username and password
//         var userData = {
//             name : config.system.testAdmin.username,
//             role:  config.system.testAdmin.role
//         };
//         // 鉴权成功返回用户信息  这个数组会被赋值给  req.user
//         return done(null, userData);
//     } else {                                                //  auth failed but we we use success routine to return error messages
//         if(username === '' || password === '' || password === 'd41d8cd98f00b204e9800998ecf8427e'){
//             // 这样返回，会进入成功回调，从而返回错误消息提示              //      d41d8cd98f00b204e9800998ecf8427e 是'空'的md5
//             return done(null, {authResult: false, msg : msgTxt.AUTH_MUST_PROVIDE_USERNAME_PASSWORD});
//
//         } else {
//             // 鉴权失败，返回 /login
//             return done(null, {authResult: false, msg : msgTxt.AUTH_FAILED });
//             // return done(new Error('AUTH_FAILDED'), null);        // 这样返回，会被 app.js 中的 AUTH_ERROR_EVENT_HANDLER  处理
//             // return done(null, '');                               // 这样返回，会进入passport的 failureRedirect
//         }
//     }
// }



// // 使用用户名和密码检查用户身份是否合法
// function checkUser_ByAPI(req,username,password,done){
//     console.log('           req  = ');  console.dir(req);
//     var url = '/Staff/check';
//     var ip = req.ip.toString().split(":").pop();
//     console.log('           ip  = ');  console.dir(ip);
//     var postData = {name: username, password: password, ip:ip};
//     urllib.api(url, postData).then(function(result){
//         try{
//             result = JSON.parse(result);
//         }catch( err){
//             console.log('failed while parsing auth result ' + result);
//             return done(new Error('failed while parsing auth result '), null);
//         }
//         //console.log('   ---- LOG: ' + __filename + os.EOL + '        result  = ');  console.dir(result);
//         if(result.result.toLowerCase() =='true'){
//             //result.data.store_gid = result.data.FK_store_gid;
//             //result.data.role_gid  = result.data.FK_role_gid;
//             console.log('   auth.js     checkUser()      result.result  = true');  console.dir(result);
//             return done(null, result.data);     // 鉴权成功返回用户信息  这个数组会被赋值给  req.user
//         } else {
//             console.log('   auth.js     checkUser()      result.result  = false');  console.dir(result);
//             //return done(null, '');            // 这样返回，会进入passport的 failureRedirect
//             return done(null, result);          // 这样返回，会进入成功回调，从而返回错误消息提示
//         }
//     }).catch(function(err){
//         console.log('   auth.js     checkUser()      err  = ');  console.dir(err);
//         return done(new Error('failed in strategy 2'), null);
//     });
// }




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
