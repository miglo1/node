/*
    专题模板二级路由配置页面
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/index', function(req, res) {
  // res.send('respond with a resource');
  res.render('www/web/promotions/index',  { layout: 'web' ,title: '优集品'});
});


module.exports = router;
