"use strict";
let express = require('express');
let router = express.Router();
require('./common');

let moment = require('moment');
let util = require('../../helpers/util.js');
let config = require('../../config/config.js');


router.get('/list',teamPerformanceList);
router.post('/search',search);

// 模板渲染
function teamPerformanceList(req,res){
    res.render('TeamPerformance/TeamPerformanceList.html');
}


function search(req,res,next){
    console.log('           req.body  = ');  console.dir(req.body);
    let queryParam = {};
    let queryDate = undefined;
    if(queryDate = util.parseStartEndTime(req.body)){
        queryParam.date = queryDate;
    }


    if(req.body.author) queryParam.author = queryParam.author = eval("/" + req.body.author + "/i"); // query with 'like' as SQL
    if(req.body.project) queryParam.project = req.body.project;
    if(req.body.branch) queryParam.branch = req.body.branch;
    if(req.body.msg) queryParam.msg = queryParam.msg = eval("/" + req.body.msg + "/i");
    if(req.body.hash) queryParam.hash = req.body.hash;

    let paginate = {};
    if(req.body.pages){
        paginate = util.parsePaginateRule(req.body.pages, 50);       // 把分页规则变成  skip 和 take,  默认每页50条
    }
    let sortParam = {};
    let arr = req.body.sortParam.split(':');
    sortParam[arr[0]] = parseInt(arr[1]);

    console.log('           queryParam  = ');  console.dir(queryParam);

    let mongojs = require('mongojs');
    // let db = mongojs('userName:userPassword@hostName/DatabaseName', ['collectionName']);  // like // let db = mongojs('git:123456@127.0.0.1/gitperf', ['test']);
    let db = mongojs( config.mongoDB.user + ':' + config.mongoDB.password + '@'
                    + config.mongoDB.host + ':' + config.mongoDB.port     + '/'
                    + config.mongoDB.db, [ config.mongoDB.collection]);
    let col = db.collection('test');
    // console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
    // console.log('┏---- INFO: ----- start [queryParam @ ] -----');console.dir(queryParam);console.log('┗---- INFO: -----  end  [queryParam @ ] -----');
    col.count(queryParam, function(cntErr, cntRes){                                          // 先统计总数
        col.find(queryParam).sort(sortParam).skip(paginate.skip).limit(paginate.limit).toArray(function(err, docs){   // 再分页获取结果数据集
            if(err) {
                res.send({result: 'false', msg: '查询错误' + err.toString() });
                return;
            }
            res.send({result: 'true', msg: '查询成功', count : cntRes, data : docs});
        });
    });

}






module.exports = router;
