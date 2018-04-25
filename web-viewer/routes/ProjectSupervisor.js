"use strict";
let express = require('express');
let router = express.Router();
require('./common');

let moment = require('moment');
let util = require('../../helpers/util.js');
let config = require('../../config/config.js');


router.get('/list',ProjectSupervisorList);
router.post('/search',search);

// 模板渲染
function ProjectSupervisorList(req,res){
    res.render('ProjectSupervisor/ProjectSupervisorList.html');
}


function search(req,res,next){
    try{
        console.log('           ProjectSupervisor/Search   req.body  = ');  console.dir(req.body);
        let queryParam = {};
        if(req.body.projectName) queryParam.projectName = req.body.projectName;
        if(req.body.repoName) queryParam.repoName = req.body.repoName;
        if(req.body.projectFolder) queryParam.projectFolder = req.body.projectFolder;

        let paginate = util.parsePaginateRule(req, 50);
        let sortParam = util.parseSortParam(req);
        // console.log('           ProjectSupervisor/Search   paginate  = ');  console.dir(paginate);
        // console.log('           ProjectSupervisor/Search   sortParam  = ');  console.dir(sortParam);
        // console.log('           ProjectSupervisor/Search   queryParam  = ');  console.dir(queryParam);

        let col = req.app.locals.mongodb.collection('projects');
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
