"use strict";
let express = require('express');
let router = express.Router();
require('./common');

router.get('/list',teamPerformanceList);

// 模板渲染
function teamPerformanceList(req,res){
    res.render('TeamPerformance/TeamPerformanceList.html');
}






module.exports = router;
