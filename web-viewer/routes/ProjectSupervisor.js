"use strict";
let express = require('express');
let router = express.Router();
require('./common');

const moment = require('moment');
const util = require('../../helpers/util.js');
const config = require('../../config/config.js');
const mongojs = require('mongojs');

router.get('/list',ProjectSupervisorList);
router.post('/search',search);
router.post('/add', add);
router.post('/modify', modify);
router.post('/remove', remove);

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



function add(req,res,next){
    try{
        // console.log('       ' + __filename + ':add        req.body = '); console.dir(req.body);
        let queryParam = {};
        if(req.body.projectName) queryParam.projectName = req.body.projectName;
        if(req.body.repoName) queryParam.repoName = req.body.repoName;
        if(req.body.projectFolder) queryParam.projectFolder = req.body.projectFolder;
        if(req.body.branches) queryParam.branches = req.body.branches;

        let col = req.app.locals.mongodb.collection('projects');
        col.insert(queryParam, function (err, docs) {
            console.log('          add    docs  = ');  console.dir(docs);

            res.send({result: 'true', msg: '', count : 1, data : docs.toString()});
        });
    }catch(err){
        // console.log('           err.stack  = ');  console.dir(err.stack);       // 这个是error的 stackTrace
        console.log(__filename + '        err = ');  console.dir(err);
        res.send({result: 'false', msg: err.message, count : 0, data : undefined});
    }
    
}


function modify(req,res,next){
    try{
        console.log('       ' + __filename + ':modify        req.body = '); console.dir(req.body);
        let queryParam = {};
        if(req.body.projectName) queryParam.projectName = req.body.projectName;
        if(req.body.repoName) queryParam.repoName = req.body.repoName;
        if(req.body.projectFolder) queryParam.projectFolder = req.body.projectFolder;
        if(req.body.branches) queryParam.branches = req.body.branches;
        let id = req.body._id;
        delete queryParam._id;
        let col = req.app.locals.mongodb.collection('projects');
        col.update({_id: mongojs.ObjectID(id)}, queryParam, function (err, docs) {
            res.send({result: 'true', msg: '', count : 1, data : docs.toString()});
        });
    }catch(err){
        // console.log('           err.stack  = ');  console.dir(err.stack);       // 这个是error的 stackTrace
        console.log('       ' + __filename + ':modify        err = ');  console.dir(err);
        res.send({result: 'false', msg: err.message, count : 0, data : undefined});
    }
}


function remove(req,res,next){
    try{
        // console.log('       ' + __filename + ':remove        req.body = '); console.dir(req.body);
        let id = req.body.id;
        let col = req.app.locals.mongodb.collection('projects');
        col.remove({_id: mongojs.ObjectID(id) }, function (err, docs) {
            console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
            console.log('┏---- INFO: ----- start [err @ ] -----');console.dir(err);console.log('┗---- INFO: -----  end  [err @ ] -----');

            console.log("\r\n"+moment().format('Y/MM/DD HH:mm:ss\t\t\t\t')+__filename);
            console.log('┏---- INFO: ----- start [docs @ ] -----');console.dir(docs);console.log('┗---- INFO: -----  end  [docs @ ] -----');
            res.send({result: 'true', msg: '', count : 1, data : docs.toString()});
        });

    }catch(err){
        // console.log('           err.stack  = ');  console.dir(err.stack);       // 这个是error的 stackTrace
        console.log('       ' + __filename + ':remove        err = ');  console.dir(err);
        res.send({result: 'false', msg: err.message, count : 0, data : undefined});
    }
}








module.exports = router;
