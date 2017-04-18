var domain = 'ujipin.com';
var exp = new Date();

//获取guid
var guid = GetCookie('guid');
//获取uv_track
var uv_track = GetCookie('uv_track');

//记录新老标志
var user_type = GetCookie('user_type');
if(user_type == null){
	if(uv_track == null){
		user_type = 1;
	}else{
		user_type = 2;
	}
	exp.setTime(exp.getTime() + 9999*24*3600*1000);
	document.cookie = "user_type="+user_type+";path=/;expires="+exp.toGMTString()+";domain="+domain;
}else{
	if(guid == null){
		user_type = parseInt(user_type)+1;
		exp.setTime(exp.getTime() + 9999*24*3600*1000);
		document.cookie = "user_type="+user_type+";path=/;expires="+exp.toGMTString()+";domain="+domain;
	}
}

//guid
if(guid == null){
	guid = newGuid();
	document.cookie = "guid="+guid+";path=/;domain="+domain;
}
//uv_track
if(uv_track == null){
	uv_track = newGuid();
	exp.setTime(exp.getTime() + 9999*24*3600*1000);
	document.cookie = "uv_track="+uv_track+";path=/;expires="+exp.toGMTString()+";domain="+domain;
}



exp.setTime(exp.getTime() + 30*24*3600*1000);

//统计来源
var scs = getQueryString('scs');
var utm_source = getQueryString('utm_source');
var utm_medium = getQueryString('utm_medium');
var from_cps_alliance = getQueryString('lpwin');
if(scs != null){
	document.cookie = "refer_source="+scs+";path=/;expires="+exp.toGMTString()+";domain="+domain;
	setLpwin();
}else if(utm_source != null && utm_medium != null){ 
	if(utm_source == 'baidu'){
		if(utm_medium == 'cpc'){
			document.cookie = "refer_source=baidu_search;path=/;expires="+exp.toGMTString()+";domain="+domain;
			setLpwin();
		}
	}
}else{
	var refer = document.referrer;
	var reg_refer = new RegExp("baidu\.com",'i');
	if(reg_refer.test(refer)){
		document.cookie = "refer_source=baidu_other;path=/;expires="+exp.toGMTString()+";domain="+domain;
		setLpwin();
	}
	var reg_refer = new RegExp("http:\/\/www\.soso\.com",'i');
	if(reg_refer.test(refer)){
		document.cookie = "refer_source=soso_search;path=/;expires="+exp.toGMTString()+";domain="+domain;
		setLpwin();
	}
	var reg_refer = new RegExp("http:\/\/www\.google\.com",'i');
	if(reg_refer.test(refer)){
		document.cookie = "refer_source=google_search;path=/;expires="+exp.toGMTString()+";domain="+domain;
		setLpwin();
	}
	var reg_refer = new RegExp("http:\/\/www\.sogou\.com",'i');
	if(reg_refer.test(refer)){
		document.cookie = "refer_source=sogou_search;path=/;expires="+exp.toGMTString()+";domain="+domain;
		setLpwin();
	}
	var reg_refer = new RegExp("http:\/\/www\.so\.com",'i');
	var reg_refer2 = new RegExp("http:\/\/so\.360\.cn",'i');
	if(reg_refer.test(refer) || reg_refer2.test(refer)){
		document.cookie = "refer_source=360_search;path=/;expires="+exp.toGMTString()+";domain="+domain;
		setLpwin();
	}
	//分析没有渠道的连接
	var is_scs = GetCookie('refer_source');
	if(is_scs == null){
		if(refer == ''){
			document.cookie = "refer_source=u-blank;path=/;expires="+exp.toGMTString()+";domain="+domain;
		}else{
			document.cookie = "refer_source=u-other;path=/;expires="+exp.toGMTString()+";domain="+domain;
		}
	}
}

//上个地址来源
var refer = encodeURIComponent(document.referrer);
if(refer == null) refer = '';
//获取浏览器的分辨率
var screen_width = window.screen.width;
var screen_height = window.screen.height;
//获取cookie的相关值
var lpwin = GetCookie('from_cps_alliance');
if(lpwin == null) lpwin = '';
var channel_refer = GetCookie('refer_source');
if(channel_refer == null) channel_refer = '';
var user_id = GetCookie('ECS[user_id]');
if(user_id == null) user_id = '';
var user_name = GetCookie('ECS[username]');
if(user_name == null) user_name = '';
//记录pv
// $.ajax({
//   url: "/media/js/lib/weblog.js?act=pv&user_id="+user_id+"&user_name="+user_name+"&refer="+refer+"&lpwin="+lpwin+"&channel_refer="+channel_refer+"&guid="+guid+"&uv_track="+uv_track+"&screen_height="+screen_height+"&screen_width="+screen_width+"&user_type="+user_type,
//   dataType: "script",
//   cache: true
// });
_getScript("https://weblog.ujipin.com/weblog.js?act=pv&user_id="+user_id+"&user_name="+user_name+"&refer="+refer+"&lpwin="+lpwin+"&channel_refer="+channel_refer+"&guid="+guid+"&uv_track="+uv_track+"&screen_height="+screen_height+"&screen_width="+screen_width+"&user_type="+user_type);
//页面加载完毕执行方法
$(document).ready(function() 
{	
	//记录click  a标签
	var obj = document.getElementsByTagName("a");
	insert_click(obj, 'a');
	//记录click  area标签
	var obj = document.getElementsByTagName("area");
	insert_click(obj, 'area');
});

//给href打track标，并记录click
function insert_click(obj, type){
	//匹配串
	var reg_track = new RegExp("track",'i');
	var reg  = new RegExp("^http:\/\/[a-z]+\.ujipin\.com\/goods\.php\\?id=[0-9]+.*",'i');
	var reg2 = new RegExp("^http:\/\/[a-z]+\.ujipin\.com\/ty\/item\.php\\?id=[0-9]+.*",'i');
	var reg3 = new RegExp("^http:\/\/[a-z]+\.ujipin\.com\/g-i[0-9]+.*",'i');
	var reg4 = new RegExp("^http:\/\/[a-z]+\.ujipin\.com\/g\/[0-9]+.*",'i');
	
	for(var i=0;i<obj.length;i++)
	{
		//找出标签中class=track的标签并且连接中没有track
		if(reg_track.test(obj[i].className) && obj[i].href.indexOf('track=') <= 0)
		{
			//单品页链接后接track
			if(reg.test(obj[i].href) || reg2.test(obj[i].href)){
				if(type == 'a'){
					obj[i].href += '&track='+obj[i].name;
				}else{
					obj[i].href += '&track='+obj[i].lang;
				}
			}
			//伪静态单品地址
			if(reg3.test(obj[i].href) || reg4.test(obj[i].href)){
				if(obj[i].href.indexOf('?') > 0){
					var con_str = '&';
				}else{
					var con_str = '?';
				}
				if(type == 'a'){
					obj[i].href += con_str+'track='+obj[i].name;
				}else{
					obj[i].href += con_str+'track='+obj[i].lang;
				}
			}
			obj[i].onclick = function(){
				var click_time = new Date().getTime();
				if(type == 'a'){
					var track = this.name;
				}else{
					var track = this.lang;
				}
				var go_url = encodeURIComponent(this.href);
				track = encodeURIComponent(track);
				_getScript("https://weblog.ujipin.com/weblog.js?act=click&user_id="+user_id+"&user_name="+user_name+"&lpwin="+lpwin+"&channel_refer="+channel_refer+"&click_time="+click_time+"&track="+track+"&go_url="+go_url+"&guid="+guid+"&uv_track="+uv_track);
			}
		}
	}
}

//获取cookie的值
function GetCookie(name) { 
    var arg = name + "="; 
    var alen = arg.length; 
    var clen = document.cookie.length; 
    var i = 0; 
    while (i < clen) { 
        var j = i + alen; 
        //alert(j); 
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j); 
        i = document.cookie.indexOf(" ", i) + 1; 
        if (i == 0) break; 
    } 
    return null; 
} 
function getCookieVal(offset) { 
    var endstr = document.cookie.indexOf(";", offset); 
    if (endstr == -1) endstr = document.cookie.length; 
    return unescape(document.cookie.substring(offset, endstr)); 
} 

//生成guid
function newGuid(){
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function S4(){
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

//获取url的参数
function getQueryString(name) {
	/*
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    */
	var paramValue = null;
	var isFound = false;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=")>1)
	{
		var arrSource = unescape(this.location.search).substring(1,this.location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound)
		{
			if (arrSource[i].indexOf("=") > 0)
			{
				if (arrSource[i].split("=")[0].toLowerCase()==name.toLowerCase())
				{
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}   
	}
	return paramValue;
}	


//统计lpwin
function setLpwin() {
//	var from_cps_alliance = getQueryString('lpwin');
	if(from_cps_alliance == null){
		exp.setTime(exp.getTime() - 30*24*3600*1000);
	}
	if(from_cps_alliance == 'douban'){
		document.cookie = "from_cps_user="+1+";path=/;domain="+domain;
		document.cookie = "from_cps_alliance="+from_cps_alliance+";path=/;domain="+domain;
	}else{
		document.cookie = "from_cps_user="+1+";path=/;expires="+exp.toGMTString()+";domain="+domain;
		document.cookie = "from_cps_alliance="+from_cps_alliance+";path=/;expires="+exp.toGMTString()+";domain="+domain;
	}
}

function _getScript(url, callback) {
 var head = document.getElementsByTagName('head')[0],
     js = document.createElement('script');
     js.setAttribute('type', 'text/javascript'); 
     js.setAttribute('src', url); 
     head.appendChild(js);
 //执行回调
 var callbackFn = function(){

         if(typeof callback === 'function'){

             callback();
         }

     };
 if (document.all) { //IE
     js.onreadystatechange = function() {
         if (js.readyState == 'loaded' || js.readyState == 'complete') {

             callbackFn();
         }
     }
 } else {
     js.onload = function() {
         callbackFn();
     }
 }
}

//异步请求记录数据
/*
function request(request_url, type){
	
	var xmlhttp = null;
	if (window.XMLHttpRequest)
	{
		//IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		//IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
//			alert(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET",request_url,type);
	xmlhttp.send();
	
}
*/
