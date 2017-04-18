(function($){
	//只能选择一个属性
	$.fn.onlyCheckOne=function(){
		$(this).on("click","li",function(){
			$(this).addClass("on").siblings().removeClass("on");
		})
	}
	//划过商品显示遮罩层
	$.fn.hovermask=function(del){
		if($(".item_submit").length>0) return false;
		var dls=$(this).find("dl");
		dls.each(function(){
			$(this).hover(function(){
				$(this).find("dd").addClass("hov");
				if($(this).find(".mask").length==0 && $(this).find(".brand_name").length==0 ){
					var hre=$(this).find("dt").children("a").attr("href");
					$(this).find("dt").append($("<a class='mask' href="+hre+" target='_blank'>")).append($("<a class='brand_name' hre="+hre+" target='_blank'></a>"));
					if(del){
						$(this).find("dt").append($("<span class='del'>"));
						$(this).on("click",".del",function(e){
								delObj($(this));
								return false;
						})
					}
				}
			},function(){
				$(this).find("dd").removeClass("hov");
				$(this).find(".mask").remove().end().find(".brand_name").remove();
				if($(this).find(".del")){
					$(this).find(".del").remove();
				}
			})
		})
	}
	//划过显示的蒙层上的删除操作
	function delObj(del){
		//ajax del为删除按钮
		var goods_id=del.siblings("a.mask").attr("href").split("/")[2],
			url='/api/v4/goods/'+goods_id+'/collect',
			data={target:0};
			function successFn(data){
				if(data.status_code==200){
					del.closest("a").remove();
					if(!$("#goods_list>a").length>0){
						location.reload();
					}
				}else{
					alert("网络出现问题请重试～");
				}
			}
			access_server(url,data,successFn,"","","POST");
	}

/*	this.dialog=function(tit,con,btn,callback){
		var self=this;
		if($("#mark").length==0){
			var mark=$("<div></div>");
			mark.addClass("mark").attr("id","mark").appendTo($("#container"));
		}
		if($("#ui-dialog").length==0){
			var dialog=$("<div></div>");
			var html='<div class="tipcontainer"><h2></h2><div class="content">'+con+'</div><p class="btns">'+btn+'</p></div>';

			dialog.addClass("ui-dialog").attr("id","ui-dialog").html(html).appendTo($("body"));
		}
		$("#ui-dialog p.btns").on("click",self.hidedialog);
		if(callback) callback();
	}
	this.hidedialog=function(){
		$("#ui-dialog").remove();
		$(".mark").remove();
	}*/
})(jQuery);
//弹窗
function dialog(title,con,btn,leftBtn,lCallback,rightBtn,rCallback){
	if($("#mark").length==0){
		var mark=$("<div></div>");
		mark.addClass("mark").attr("id","mark").appendTo($("body"));
	}
	if($("#ui-dialog").length==0){
		var dialog=$("<div></div>");
		var html='<b></b><h2>'+title+'</h2><h3>'+con+'</h3><p class="btns"><span>'+leftBtn+'</span>'
			if(btn==2 && rightBtn){
				html+='<span class="gray">'+rightBtn+'</span>'
			}
		html+= '</p>';
		dialog.addClass("ui-dialog").attr("id","ui-dialog").html(html).appendTo($("body"));
	}
	//点击关闭按钮，关闭弹窗
	$("#ui-dialog b").on("click",function(){
		hidedialog();
	})
	//右边按钮点击的时候
	if(rightBtn){
		$("#ui-dialog span").eq(1).on("click",function(){
			if(rCallback) rCallback();
			hidedialog();
		})
	}
	$("#ui-dialog span").eq(0).on("click",function(){
		if(lCallback) lCallback();
	})
	//设置弹窗的位置
	setMarkTop();
}
//隐藏弹窗
function hidedialog(){
	if($("#mark").length!=0){
		$("#ui-dialog").remove();
		$(".mark").remove();
	}
}
//设置弹窗的位置
 function setMarkTop(){
 	var sH=$(window).scrollTop()*1,
 		mH=sH+$(window).height()/2-(225/2);
 		$("#ui-dialog").css("top",mH)
 }



//显示弹窗
function showSDialog(tit,callback){
	if($("#mark").length) return false;
	$("body").append($("<div class='mark' id='mark' style='display:none'></div>"));
	$(".mark").fadeIn(600);
	$("body").append($("<div class='dialog' id='dialog' style='display:none'><p>"+tit+"</p></div>"));
	$(".dialog").fadeIn(600);
	setsMarkTop()
	hideSDialog(callback);
}
//1200毫秒后隐藏弹窗
function hideSDialog(callback){
	if($("#mark").length==0) return false;
	setTimeout(function(){
		$("#mark").fadeOut(600,function(){
			$(this).remove();
		});
		$("#dialog").fadeOut(600,function(){
			$(this).remove();
			if(callback) callback();
		});
	},1200);
}
//设置弹窗的位置
function setsMarkTop(){
 	var sH=$(window).scrollTop()*1,
 		mH=sH+$(window).height()/2-$("#dialog").height()/2*1;
 		$("#dialog").css("top",mH);
 }
//设置cookie
var setCookie=function(name,value,days){
	days=days?days:30;
	var date=new Date();
	date.setTime(date.getTime()+days*24*60*60*1000);//过期日期
	document.cookie=name+'='+escape(value)+';expires='+date.toUTCString()+";path=/";
	//escape 进行编码  能将一些特殊符号或汉字用16进制表示
};
//获取cookie
var getCookie=function(name){
	var cookies=document.cookie;
	var arr=cookies.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));
	if(arr!=null)return unescape(arr[2]); return "";
	//unescape解译escape编译过得对象
};
//删除cookie 不能直接删除  设置cookie的时间过期
var delCookie=function(name){
	var date=new Date();
	date.setTime(date.getTime()-1);
	document.cookie=name+'='+getCookie(name)+';expires='+date.toUTCString()+";path=/";
};
//滚动导航定位
	function scrollNavFix(){
		var goods_reg=/^\/goods\/[0-9]*$/;
		if(goods_reg.test(location.pathname) || location.pathname=="/tag/brand"){return false;};
		$(window).on("scroll",function(){
			var nH=parseInt($(window).scrollTop());
			if(nH>71 && $("#nav_bar_container").css("position")!="fixed"){
				$("#nav_bar_container").css({
					position: "fixed",
					left: "0px",
					top: "0px",
					"z-index": "100000"
				})
				$("#web_im_kf").hide();
				$("#scroll_shop").show();
			}else if(nH<71){
				$("#nav_bar_container").css({
					position: "relative",
					"z-index":"1"
				});
				$("#web_im_kf").show();
				$("#scroll_shop").hide();
			}
		})
	}
	scrollNavFix()
 //设置默认的请求头
 function defaultHeader(){
 	var channel=getCookie("refer_source"),
    	obj={};
    if(channel){
    	obj={
			platform:"website",
	        udid:"",
	        version:"4.1.0",
	        channel:channel
    	}
    	return obj;
    } else{
		return {
			platform:"website",
	        udid:"",
	        version:"4.1.0"
	    }
    }
}
//ajax 请求
function access_server(url,data,successFn,errorFn,async,type){
    //设置heades的参数
    var hea = defaultHeader();
    hea["Content-type"] = "application/json";
    if(getCookie("_ujp_access_token")) hea["Authorization"] = "Bearer " + getCookie("_ujp_access_token");
	$.ajax({
		url:url,
		data:JSON.stringify(data),
		type:type,
		headers:hea,
		dataType:"json",
		success:function(result){
			successFn && successFn(result);
		},
		error:function(data){
			if(typeof((errorFn))=="function"){
				errorFn();
			}else{
				alert("网络出现问题请重试～");
			}
		}
	});
}
//获取地址栏参数
function getParam(url) {
	if (url) {
		url = url.substr(1);
		var arr = url.split("&"),
			obj = {},
			param;
		for (var i = 0, len = arr.length; i < len; i++) {
			param = arr[i].split("=");
			obj[param[0]] = decodeURI(param[1]);
		}
		return obj;
	} else {
		return false;
	}
}

function MouseEvent(e) {
	this.x = e.pageX;
	this.y = e.pageY;
}

//图片懒加载
$("img.lazy").lazyload({
    failure_limit : 20,
    skip_invisible : false
});
//获取地址栏else
function getParad(url){
	if (url) {
		url = url.substr(1);
		var arr = url.split("&"),
			obj = {},
			param;
		for (var i = 0, len = arr.length; i < len; i++) {
			var k=arr[i].indexOf("="),param=[];
			param[0] = arr[i].substring(0,k);
			param[1]=arr[i].substring(k+1);
			obj[param[0]] = decodeURI(param[1]);
		}
		return obj;
	} else {
		return false;
	}
}
//广告商 一起发
function advertisement (){
	var aObj=getParad(location.search);
	if(aObj.aid){

		setCookie("aid",aObj.aid,30);
		// 如果这个存在 就删掉 linkstars（类似领科特的一个东西）;
		delCookie("linkstars");
		//如果这个广告存在删掉领科特
		if(getCookie("a_id") && getCookie("m_id") && getCookie("c_id") && getCookie("l_id") && getCookie("l_type1") && getCookie("rd")){
			delCookie("a_id");
			delCookie("m_id");
			delCookie("c_id");
			delCookie("l_id");
			delCookie("l_type1");
			delCookie("rd");
		}
	}
	if(aObj.channel){
		setCookie("channel",aObj.channel,30);
	}
	if(aObj.cid){
		setCookie("cid",aObj.cid,30);
	}
	if(aObj.wi){
		setCookie("wi",aObj.wi,30);
	}
}
advertisement();

//领科特
function lkt(){
	var aObj=getParad(location.search);
	if(aObj.a_id){
		setCookie("a_id",aObj.a_id,30);
		// 如果这个存在 就删掉 linkstars（类似领科特的一个东西）;
		delCookie("linkstars");
		// 如果这个存在 就删掉一起发
		if(getCookie("aid") && getCookie("channel") && getCookie("cid") && getCookie("wi")){
			delCookie("aid");
			delCookie("channel");
			delCookie("cid");
			delCookie("wi");
		}
	}
	if(aObj.m_id){
		setCookie("m_id",aObj.m_id,30);
	}
	if(aObj.c_id){
		setCookie("c_id",aObj.c_id,30);
	}
	if(aObj.l_id){
		setCookie("l_id",aObj.l_id,30);
	}
	if(aObj.l_type1){
		setCookie("l_type1",aObj.l_type1,30);
	}
	if(aObj.rd){
		setCookie("rd",aObj.rd,30);
	}
	if(aObj.a_id && aObj.m_id && aObj.c_id && aObj.l_id && aObj.rd && aObj.l_type1 && aObj.url){
		location.href=aObj.url;
	}
}
lkt();
