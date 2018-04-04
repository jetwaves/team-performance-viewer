"use strict";
let express = require('express');
let router = express.Router();
require('./common');

router.get('/',teamPerformance);
router.get('/teamPerformance',teamPerformance);

//跳转首页
function index(req,res){
    //res.render('Uom/index.html');
    res.send('working');
}

//删除
function teamPerformance(req,res){
    res.render('pages/team-performance.html')
}





module.exports = router;
