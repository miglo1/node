/**
 * Created by ujipin on 17/1/22.
 */
var Mock = require('mockjs');

var data = Mock.mock({
    //头图
    "head_image": "http://ujipinwww.ufile.ucloud.com.cn/upassThemeTop_v6.jpg",
    "content|8": [
        {
            "icon_image": "http://ujipinwww.ufile.ucloud.com.cn/upasstheme_logo_v6_01.jpg",
            "title_image": "http://ujipinwww.ufile.ucloud.com.cn/upasstheme_1_v6.png",
            "nav_number|+1":1,
            "goods|4": [
                {
                    "redirect": "http://m.ujipin.com/v4/goods/30040",
                    "thumbnail": "http://ujipin.ufile.ucloud.com.cn/c2a22a3e4524b8d31320e826f16e8eff?UCloudPublicKey=ucloudjiawoyong@ujipin.cn14466281690001077321672&Expires=1485683689&Signature=c6b9QkgwcN8IOLdqRoVk2G3WJG8=&width=375&iopcmd=thumbnail&type=4&format=JPEG",
                    "brand": "CHEZ MOI蓝紫根",
                    "name": "chez moi 蓝紫根 眉间精华棒",
                    "goods_price": 138.00,
                    "vip_price": 100.00,
                },
            ]
        },
    ],
    "foot_image": "http://ujipinwww.ufile.ucloud.com.cn/upasstheme_footer.png",
});
module.exports = data;