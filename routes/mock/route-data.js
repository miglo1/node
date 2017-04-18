var express = require('express');
var router = express.Router();

// var promotion_data = require('../../m-theme-data');
var promotion_data = require('../../model/mock/mobile/m-theme-data');
var upass_theme_data = require('../../model/mock/mobile/upass-theme-data');

router.get('/promotion/data',function(req,res){
  res.json({
    data:promotion_data
  });
});

router.get('/upass/theme/data',function(req,res){
  res.json({
    data:upass_theme_data
  });
});

module.exports = router;
