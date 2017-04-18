var express = require('express');
// var routes = express.Router();
var app = express();

var mockData = require('./mock/route-data');
var promotionIndex = require('./web/promotion/index');


//路由
app.use('/v6/web/mock', mockData);                   //假数据路由
app.use('/v6/mock', mockData);                   //假数据路由
app.use('/v6/web/promotions', promotionIndex);    //专题模板路由




module.exports = app;
