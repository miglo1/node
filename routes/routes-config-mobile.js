var express = require('express');
// var routes = express.Router();
var app = express();

//mockData
var mockData = require('./mock/route-data');

var promotionIndex = require('./mobile/promotion/index');
var upass = require('./mobile/upass/index');


//路由
app.use('/v6/mock', mockData);  //假数据路由
app.use('/v6/mobile/promotions', promotionIndex);   //专题模板路由
app.use('/v6/upass', upass);    //upass路由





module.exports = app;
