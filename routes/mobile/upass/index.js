/*
    upass二级路由配置页面
*/
var http = require('http');
var express = require('express');
var router = express.Router();
var request_sync = require('sync-request');


// var upass_theme_data = require('../../../model/upass-theme-data');
// var upass_theme_data = require('../../../model/mobile/upass/upassData');


/* GET users listing. */
router.get('/index', function(req, res) {
  res.render('www/mobile/upass/index',  { title: '优集品'});
});

//专题模板
router.get('/theme', function(req, res) {
  //获取请求头
  var ua = req.get('user-agent');
  //获取当前请求的url
  var URL = require('url');
  var originalUrl = URL.parse(req.originalUrl);
  var str = originalUrl.search || '';
  var url = 'http://m.ujipin.com/api/v5/upass/theme'+ str;
  //请求接口数据
  var resp = request_sync ('GET', url,{
    'headers': {
      'user-agent': ua
    }
  });
  var buff = resp.getBody().toString();
  var data = JSON.parse(buff);
  res.render('www/mobile/upass/theme',  { title: '优集品',data: data.data});
});
//开通页面
router.get('/openUpass', function(req, res) {
  //获取请求头
  var ua = req.get('user-agent');
  //当前请求的url
  var url = 'http://m.ujipin.cn/api/v5/upass/advertise';
  //请求接口数据
  var resp = request_sync ('GET', url,{
    'headers': {
      'user-agent': ua
    }
  });
  var buff = resp.getBody().toString();
  var data = JSON.parse(buff);
  console.log(data);
  res.render('www/mobile/upass/openUpass',  { title: 'U-PASS专享',data: data.data});
});


//开通成功页面
router.get('/openSuccess', function(req, res) {
  res.render('www/mobile/upass/openSuccess',  { title: '开通U-PASS'});
});


//特权一览页面
router.get('/privilege', function(req, res) {
  res.render('www/mobile/upass/privilege',  { title: 'U-PASS特权'});
});

router.get('/welfare', function(req, res) {
  res.render('www/mobile/upass/service/welfare',  { title: '优集品'});
});

router.get('/boncake', function(req, res) {
  res.render('www/mobile/upass/service/boncake',  { title: '优集品'});
});

router.get('/flower', function(req, res) {
  res.render('www/mobile/upass/service/flower',  { title: '优集品'});
});


module.exports = router;
