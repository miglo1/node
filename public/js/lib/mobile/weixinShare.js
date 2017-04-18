
function shareAjax(type_id,content_id){
    var d_header = u.defaultHeader();
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/api/v4/app/share",
        data:{
            type_id:type_id,
            content_id:content_id
        },
        headers:d_header,
        success: function(data){
            if(data.status_code == 200){
                weixinShare({
                    tit:data.data.title,
                    link:data.data.share_url,
                    imgUrl:data.data.image,
                    desc:data.data.content
                });
            }
        }
    });
}

function weixinShare(datas){
  //调用微信接口
  function configWX(){
      $.ajax({
          type: "GET",
          url: "/api/v4/weixin/config?url=" + encodeURIComponent(window.location.href.split('#')[0]),
          dataType: "json",
          success: function(data) {
              if (data.status_code == '200') {
                  wx.config({
                      debug: false,
                      appId: data.data.appId,
                      timestamp: data.data.timestamp,
                      nonceStr: data.data.nonceStr,
                      signature: data.data.signature,
                      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                  });
                  // share("http://" + window.location.host + '/v4/game/smell');
              }
          }});
  }
  configWX();
  wx.ready(function(){
      // var link = "http://m.ujipin.com/v4/promotions/storage";
      // var shareFriend = getShareFriend(my.result);
      wx.onMenuShareTimeline({
          //朋友圈
          title: datas.tit,
          link: datas.link,
          imgUrl: datas.imgUrl,
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });

      // var shareVar = getShare(my.result);
      wx.onMenuShareAppMessage({
          //给朋友
          title: datas.tit,
          desc: datas.desc,
          link: datas.link,
          imgUrl: datas.imgUrl,
          type: '',
          dataUrl: '',
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });
  });

}
