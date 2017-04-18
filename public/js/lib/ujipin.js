!(function(a,b){
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return b()
    }) : b()
})(this,function(){
    var nativeKeys = Object.keys;
    u = {
        getCookie:function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        setCookie:function(name,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
        },
        delCookie:function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=this.getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
                document.cookie= name + "="+cval+";path=/v4;expires="+exp.toGMTString();
        },
        getUrlString:function(key){
            var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
            var result = window.location.search.substr(1).match(reg);
            return result?decodeURIComponent(result[2]):null;
        },
        isApp:function(){
            var Agent = window.navigator.userAgent.toLowerCase();
            var arr = Agent.split("/");
            arr = arr[arr.length - 1].split(" ");
            var o = {};
            for(var i = 0;i<arr.length;i++)
            {
                if(arr[i].indexOf("=") != -1)
                {
                    var c = arr[i].split("=");
                    o[c[0]] = c[1];
                }
            }
            if(o.platform === "ios")
            {
                return "ios";
            }else if(o.platform === "android"){
                return "android";
            }
        },
        appUrl:function(goods,type_id,id){
            var goods = goods || "features";
            if(goods == "goods")
            {
                return "ujipin://"+goods+"?id="+arguments[1]+"";

            }else{
                return "ujipin://"+goods+"?type="+arguments[1]+"&id="+arguments[2]+"";
            }
        },
        appLogin:"ujipin://login",
        appShare:function(title,desc,imgUrl,link){
            return "ujipin://share?title="+title+"&desc="+desc+"&imgUrl="+imgUrl+"&link="+link+"";
        },
        format:function(time,format){
            var date=new Date(time);
            var o = {
                "M+" : date.getMonth()+1, //month
                "d+" : date.getDate(), //day
                "h+" : date.getHours(), //hour
                "m+" : date.getMinutes(), //minute
                "s+" : date.getSeconds(), //second
                "q+" : Math.floor((date.getMonth()+3)/3), //quarter
                "S" : date.getMilliseconds() //millisecond
            }

            if(/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }

            for(var k in o) {
                if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
                }
            }
            // date.format("yyyy-MM-dd hh:mm:ss")
            return format;
        },
        pairs:function(obj){
            var keys = u.keys(obj);
            var length = keys.length;
            var pairs = Array(length);
            for (var i = 0; i < length; i++) {
              pairs[i] = [keys[i], obj[keys[i]]];
            }
            return pairs;
        },
        keys:function(obj) {
            if (!u.isObject(obj)) return [];
            if (nativeKeys) return nativeKeys(obj);
            var keys = [];
            for (var key in obj) if (u.has(obj, key)) keys.push(key);
            // Ahem, IE < 9.
            if (hasEnumBug) collectNonEnumProps(obj, keys);
            return keys;
        },
        isObject:function(obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!obj;
        },
        has:function(obj, key) {
            return obj != null && hasOwnProperty.call(obj, key);
        },
        isWeiXin:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        },
        defaultHeader:function(){
            return {
                "platform":"h5",
                "udid":"",
                "version":"5.0.0",
                "channel": this.getCookie('refer_source'),
                "is_old": this.getCookie('is_old') == 'true' ? 1 : 0
            }
        },
        throttle:function(func, wait, options){
            var context, args, timeout, result;
            var previous = 0;
            var later = function() {
                previous = new Date;
                timeout = null;
                result = func.apply(context, args);
            };
            return function() {
                var now = new Date;
                var remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },
        ajax:function(options,callback){
            var headers = u.defaultHeader();
            var sid = u.getUrlString('access_token') || u.getCookie("sid");
            if(sid) headers.Authorization = "Bearer " +sid;
            _options = {
                dataType:"json",
                contentType: "application/json; charset=utf-8",
                headers:headers,
                success:function(data){
                    if(data.status_code == 1002){
                        alert(data.message)
                        window.location.href = '/v4/login_cover?callback=' + document.URL;
                    }else{
                        callback && callback(data);   
                    }
                },
                beforeSend:function(){
                    $(".shade").addClass("block");
                },
                complete:function(){
                    $(".shade").removeClass("block");
                },
            };
            $.ajax($.extend(_options,options));

        },
        getCartCount:function(){
            u.ajax({
                url: "/api/v4/cart/count",
                beforeSend:function(){},
                complete:function(){},
            },function(data){
                if(data.status_code == 200)
                {
                    $(".nav .personal em").html(data.data.count).show();
                }else{
                    console.log(data.message)
                }
            });
        },
        GetRequest:function(){
             var url = location.search; //获取url中"?"符后的字串
             var theRequest = new Object();
             if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
               theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
              }
             }
             return theRequest;
        },
        strRequest:function(json){
            var str = '?';
            $.each(json,function(k,v){
                str += k +'='+ v + '&';
            });
            var _str = str.substring(0,str.length-1);
            return _str;
        },
        addCart:function(_data,callback){
            u.ajax({
                type:'post',
                url:'/api/v4/cart/products',
                data:JSON.stringify(_data),
            },function(data){
                if(data.status_code == 200)
                {
                    callback && callback(data);
                }else if (data.status_code == 1002 || data.status_code == 401){
                    alert(data.message);
                    window.location.href = "/v4/login_cover?callback="+window.location.href+"";
                }else{
                    alert(data.message)
                }
            });

        },
        client:{
            "client_id" : "80f4066ab805300c1feb514781e2869bd3f69d74",
            "client_secret":"0a485989c3609cfea24fa936f147b499bd8bbaa4"
        },
        extension:function(){
            var aid = this.getUrlString("aid");
            var channel = this.getUrlString("channel");
            var cid = this.getUrlString("cid");
            var wi = this.getUrlString("wi");
            var ext = aid && channel && aid && wi;
            if(ext) {
                this.setCookie("aid",aid);
                this.setCookie("channel",channel);
                this.setCookie("cid",cid);
                this.setCookie("wi",wi);
            }
        }

    };

});
if(u.isApp() == "ios" || u.isApp() == "android" )
{
    $(".nav").hide();
    $(".nav_h").hide();
    $(".gui-down-2").hide();
}

if(u.isApp() == "ios" || u.isApp() == "android" && !u.getUrlString('access_token'))
{
    u.delCookie('sid');
}
u.extension();
