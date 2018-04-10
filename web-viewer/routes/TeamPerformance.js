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
    console.log('           req.body  = ');  console.dir(req.body);
    let queryParam = {};
    let start_ts = req.body.start_time;         // 查询起始时间
    let end_ts   = req.body.end_time;         // 查询结束时间
    if(start_ts && !end_ts) queryParam.date = { $gte: start_ts };
    if(!start_ts && end_ts) queryParam.date = { $lte: end_ts };
    if(start_ts && end_ts)  queryParam.date = { $gte: start_ts, $lte: end_ts };
    if(req.body.author) queryParam.author = queryParam.author = eval("/" + req.body.author + "/i");
    if(req.body.project) queryParam.project = req.body.project;
    if(req.body.branch) queryParam.branch = req.body.branch;
    if(req.body.msg) queryParam.msg = queryParam.msg = eval("/" + req.body.msg + "/i");;
    if(req.body.hash) queryParam.hash = req.body.hash;

    // console.log('           req.body  = ');  console.dir(req.body);
    let paginate = {};
    if(req.body.pages){
        paginate = util.parsePaginateRule(req.body.pages, 50);       // 把分页规则变成  skip 和 take,  默认每页50条
    }
    // console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
    // console.log('┏---- INFO: ----- start [paginate @ ] -----');console.dir(paginate);console.log('┗---- INFO: -----  end  [paginate @ ] -----');
    let sortParam = undefined;
    if(req.body.sortParam){
        let arr = req.body.sortParam.split(':');
        switch(arr[0]){                     // js不允许用变量做kv对的key，只能这么写
            case 'date':    sortParam = {'date':       parseInt(arr[1])};   break;
            case 'author':  sortParam = {'author':     parseInt(arr[1])};   break;
            case 'msg':     sortParam = {'msg':        parseInt(arr[1])};   break;
            case 'project': sortParam = {'project':    parseInt(arr[1])};   break;
            case 'branch':  sortParam = {'branch':     parseInt(arr[1])};   break;
            case 'hash':    sortParam = {'hash':       parseInt(arr[1])};   break;
        }
    }

    let mongojs = require('mongojs');
    let db = mongojs('git:123456@127.0.0.1/gitperf', ['test']);
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
