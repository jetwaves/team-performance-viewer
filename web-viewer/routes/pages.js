"use strict";
let express = require('express');
let router = express.Router();
require('./common');

router.get('/',index);

//跳转首页
function index(req,res){
    res.send('working');
}







module.exports = router;
