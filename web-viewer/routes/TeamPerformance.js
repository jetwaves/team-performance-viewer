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
    try{
        console.log('           TeamPerformance/search      req.body  = ');  console.dir(req.body);
        let queryParam = {};
        let queryDate = undefined;
        if(queryDate = util.parseStartEndTime(req.body)) queryParam.date = queryDate;
        if(req.body.author) queryParam.author = queryParam.author = eval("/" + req.body.author + "/i"); // query with 'like' as SQL
        if(req.body.project) queryParam.project = req.body.project;
        if(req.body.branch) queryParam.branch = req.body.branch;
        if(req.body.msg) queryParam.msg = queryParam.msg = eval("/" + req.body.msg + "/i");
        if(req.body.hash) queryParam.hash = req.body.hash;

        let paginate = util.parsePaginateRule(req, 50);
        let sortParam = util.parseSortParam(req);
        // console.log('           TeamPerformance/search      paginate  = ');  console.dir(paginate);
        // console.log('           TeamPerformance/search      sortParam  = ');  console.dir(sortParam);
        // console.log('           TeamPerformance/search      queryParam  = ');  console.dir(queryParam);

        let col = req.app.locals.mongodb.collection('logs');
        col.count(queryParam, function(cntErr, cntRes){                                          // 先统计总数
            col.find(queryParam).sort(sortParam).skip(paginate.skip).limit(paginate.limit).toArray(function(err, docs){   // 再分页获取结果数据集
                if(err) {
                    res.send({result: 'false', msg: '查询错误' + err.toString() });
                    return;
                }
                res.send({result: 'true', msg: '查询成功', count : cntRes, data : docs});
            });
        });
    }catch(err){
        // console.log('           err.stack  = ');  console.dir(err.stack);       // 这个是error的 stackTrace
        console.log('        err = ');  console.dir(err);
        res.send({result: 'false', msg: err.message, count : 0, data : undefined});
    }

}






module.exports = router;
