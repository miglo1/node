/*
    专题模板二级路由配置页面
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/theme', function(req, res) {
  // res.send('respond with a resource');
  res.render('www/mobile/h5/promotions/index', { title: '优集品'});
});




module.exports = router;
