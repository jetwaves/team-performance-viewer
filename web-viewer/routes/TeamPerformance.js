"use strict";
let express = require('express');
let router = express.Router();
require('./common');

let moment = require('moment');
let util = require('../../helpers/util.js');

router.get('/list',teamPerformanceList);
router.post('/search',search);

// 模板渲染
function teamPerformanceList(req,res){
    res.render('TeamPerformance/TeamPerformanceList.html');
}


function search(req,res,next){
    let queryParam = {};
    let start_ts = req.body.start_date;       // 操作起始时间
    let end_ts   = req.body.start_date;         // 操作结束时间
    if(start_ts && !end_ts) queryParam.date = { $gte: start_ts };
    if(!start_ts && end_ts) queryParam.date = { $lte: end_ts };
    if(start_ts && end_ts)  queryParam.date = { $gte: start_ts, $lte: end_ts };

    let paginate = {};
    if(req.body.pages){
        paginate = util.parsePaginateRule(req.body.pages, 50);       // 把分页规则变成  skip 和 take,  默认每页50条
    }
    console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
    console.log('┏---- INFO: ----- start [paginate @ ] -----');console.dir(paginate);console.log('┗---- INFO: -----  end  [paginate @ ] -----');


    console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
    console.log('┏---- INFO: ----- start [queryParam @ ] -----');console.dir(queryParam);console.log('┗---- INFO: -----  end  [queryParam @ ] -----');
    let mongojs = require('mongojs');
    let db = mongojs('git:123456@127.0.0.1/gitperf', ['test']);
    let col = db.collection('test');
    col.count(queryParam, function(cntErr, cntRes){                                          // 先统计总数
        console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
        console.log('┏---- INFO: ----- start [cntRes @ ] -----');console.dir(cntRes);console.log('┗---- INFO: -----  end  [cntRes @ ] -----');
        col.find(queryParam).skip(paginate.skip).limit(paginate.limit).toArray(function(err, docs){   // 再分页获取结果数据集
            if(err) {
                res.send({result: 'false', msg: '查询错误' + err.toString() });
                return;
            }
            res.send({result: 'true', msg: '查询成功', count : cntRes, data : docs});
        });
    });



}






module.exports = router;
