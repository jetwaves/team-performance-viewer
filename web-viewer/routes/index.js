var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/nav', function(req, res, next) {
    res.render('nav.html', { title: 'Express' });
});


router.get('/workbench', function(req, res, next) {
    res.render('workbench.html', { title: 'Express' });
});





module.exports = router;
