var express = require('express');
var router = express.Router();

var config = require('../../config/config.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    console.log('           config.ui  = ');  console.dir(config.ui);
    res.render('loginPage.html', { ui: config.ui, enable_login_captcha : config.system.enable_login_captcha });
});



router.get('/nav', function(req, res, next) {
    res.render('nav.html', { title: 'Express' });
});


router.get('/workbench', function(req, res, next) {

    res.render('workbench.html', {});
});





module.exports = router;
