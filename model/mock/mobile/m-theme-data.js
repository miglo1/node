var Mock = require('mockjs');

var data = Mock.mock({
  "order":["head", "goods", "coupon", "foot"],
  "items":{
    "head": [  // 头图区
        {"image": "http://ujipinwww.ufile.ucloud.com.cn/new0106Top.jpg", "url": "http://m.ujipin.com/v4/goods/29121"}
    ],
    "goods|2-4": [  // 商品区
        {
            "title": {
                "url": "http://ujipin.com",
                "text": '@name',
                "image": "http://ujipinwww.ufile.ucloud.com.cn/new0106Title1.jpg"
            },
            "icon|3-6": [
                {"image": "http://ujipinwww.ufile.ucloud.com.cn/skin1230_17.jpg", "url": "http://m.ujipin.com/v4/goods/29121"},  // 商品图片，商品链接
            ],
            "goods|4-10": [
                {
                    "brand": "今儿天儿不错",  //商品品牌名称
                    "country": "美国",       //商品品牌归属地
                    "brand_url": "http://m.ujipin.com/tag/325e4175795f4c609c964ee41746513a",  //商品品牌链接
                    "name": "竹炭陶经典日式加盖饭碗 密封收纳碗（300ml）",
                    "price|10-1000": 1000.00,
                    "market_price|10-1000": 1000.00,
                    "product_stock_total|3-10": 10,   //商品库存数量
                    "url": "http://m.ujipin.com/v4/goods/19696",
                    "image": "http://ujipin.ufile.ucloud.com.cn/4542d49572c469554b007cac64da7628?UCloudPublicKey=ucloudjiawoyong@ujipin.cn14466281690001077321672&Expires=1484294044&Signature=YAGQbG/ZTD/UHlqAo+bZgNNcsZE=&width=375&iopcmd=thumbnail&type=4&format=JPEG",
                }
            ],
            "top_from": 3
        }
    ],
    "coupon": [
        {"image": "http://ujipinwww.ufile.ucloud.com.cn/code0105_1.jpg", "code": "huadianshijian"}
    ],
    "foot": [
        {"image": "http://ujipinwww.ufile.ucloud.com.cn/new0106Bottom.jpg", "url": "http://m.ujipin.com/v4/goods/29121"}
    ],
    "navigation": ["家居品牌", "餐厨品牌","美体品牌"," 日用品牌"]   //导航区
  }
});
// module.exports = JSON.stringify(data, null, 4);
module.exports = data;
