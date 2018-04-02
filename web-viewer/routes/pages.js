"use strict";
let express = require('express');
let router = express.Router();
require('./common');

router.get('/',index);
// router.get('/selectd',selectd);
// router.get('/update',update);
// router.get('/getupdate',getupdate);
// router.get('/add',add);
// router.get('/deleted',deleted);
// router.get('/getUomList',getUomList);
//跳转首页
function index(req,res){
    //res.render('Uom/index.html');
    res.send('working');
}

//删除
function deleted(req,res){
    async.waterfall(
        [function(callback){
            cacheHelper.getHeader(callback);
        },
            function(headers,callback){
                var gid = req.param('gid');
                var postData = { gid: gid };
                urllib.post('/Uom/delete', headers, postData, callback );
            },
            function(result, callback){
                res.send(result);
            }],
        function(err,result){
            console.log('   .()       error !!   err = ');console.dir(err);
            console.log('       result = ');        console.dir(result);
            res.json({code: err, msg: JSON.parse(result)});
        }
    );
}





module.exports = router;
