;(function(){
    $(document).ready(function(){
        function init(){
            bindEvent();
            scroll_shop_num();
            //计算总价
            // mathM();
        }
        //nav定位购物袋商品数量
        function scroll_shop_num(){
            // console.log($("#shop_good_num").length);
            if($("#shop_good_num").length>0){
                $("#scroll_shop").find("b").html($("#shop_good_num").html());
            }else{
                $("#scroll_shop").find("b").hide();
            }
        }
    //请求热搜
    var d_header = defaultHeader();
       $.ajax({
        type: "get",
        dataType: "json",
        url: "/api/v4/search/hotwords",
        headers:d_header,
        success: function(data){
            var hotwords = data.data.content;
            var list = '';
            $(hotwords).each(function(i,e){
              list += ' <li><a href="javascript:;">'+e+'</a></li>';
            })
            $("#hot_list").append(list);
        }
    });
    //点击热搜下的选项
    $("#hot_list").on("click","li",function(){
        console.log($(this).text());
        window.location.href = '/search?q='+$(this).text();
    });
    //自动完成
     var search_btn = true;
    $("#search_word").on('input propertychange', function(e) {
        if(search_btn){
            var _this = $(this);
            setTimeout(function(){
                search_req(_this.val());
                search_btn = true;
            },300);
        }
        search_btn = false;
    });
    //鼠标滑过搜索下拉列表高亮显示
    $("#hot_list").on("mouseenter","li",function(){
        $(this).addClass("on").siblings().removeClass("on");
    })
    function upDown(){
        var i=0;
        //键盘上下箭头控制
        $("#search_word").on("keyup",function(e){
            var event= e || window.event;
            var code=event.keyCode;
            if(code==40){
                console.log(i)
                if(!$("#hot_list").is(":hidden")){
                    var len=$("#hot_list>li").length;
                    i=$("#hot_list>li.on").index() ? $("#hot_list>li.on").index() :i;
                    i++;
                    if(i>=len) i=len-1;
                    var txt=$("#hot_list").children("li").eq(i).children("a").text();
                    $("#hot_list").children("li").eq(i).addClass("on").siblings().removeClass("on");
                }else if(!$("#category_list").is(":hidden")){
                    var len=$("#category_list>li").length;
                    i=$("#category_list>li.on").index() ? $("#category_list>li.on").index() :i;
                    i++;
                    if(i>=len) i=len-1;
                    var txt=$("#category_list").children("li").eq(i).children("a").text();
                    $("#category_list").children("li").eq(i).addClass("on").siblings().removeClass("on");
                }
                $(this).val(txt);
            }
            if(code==38){
                i=$("#hot_list>li.on").index() ? $("#hot_list>li.on").index() :i;
                i--;
                if(!$("#hot_list").is(":hidden")){
                    var txt=$("#hot_list").children("li").eq(i).children("a").text();
                    $("#hot_list").children("li").eq(i).addClass("on").siblings().removeClass("on");
                }else if(!$("#category_list").is(":hidden")){
                    var txt=$("#category_list").children("li").eq(i).children("a").text();
                    $("#category_list").children("li").eq(i).addClass("on").siblings().removeClass("on");
                }
                $(this).val(txt);
            }
            if(code==13){
                window.location.href="/search?q=" + $(this).val() +"";
            }
        })
    }
    upDown();
    function search_req(q){
        if(q == '')
        {
            $("#hot_list").show();
            $("#category_list").hide();
        }else{
               $("#hot_list").hide();
            // $("#category_list").show();

            $.ajax({
                type: "get",
                // dataType: "json",
                url: "/api/v4/search/autocomplete?q="+q+"",
                headers:d_header,
                success: function(data){
                    var con = '';
                    $(data.data.content).each(function(i,e){
                        if(e.type_id == 4)
                        {
                            con += '<li><a href="javascript:;">'+e.text+'</a></li>';
                        }
                    });
                    $("#category_list").html(con).show();
                    $("#category_list").on("click", "a", function() {
                        window.location.href = "/search?q=" + $(this).text() +"";
                    });
                },
                error: function(a,b,c){
                 console.log(b);
                },
               });
        }
    }
    //点击搜索按钮
    $("#search_btn").on("click",function(){
        var sub_txt = $("#search_word").val();
        if(sub_txt==""){
            //
        }else{
            window.location.href = '/search?q='+sub_txt;
        };
    });
    function bindEvent(){
        //显示二级菜单
        /*$("#nav_bar>li").hover(function(){
            $(this).children("p").fadeIn(600).end().find("ol").stop().slideDown(600).end().siblings().find("ol").stop().slideUp(100);
            $(this).siblings().find("p").hide();
        },function(){
            $(this).children("p").hide().end().find("ol").stop().slideUp(600);
        })*/
        //登出
        $("#logout").on("click",function(){
            var url=window.location.pathname;
            var reg=/^\/order\/[0-9]*$/g;
            delCookie("_ujp_access_token");
            delCookie("session");
            delCookie("user_id");
            delCookie("username");
            delCookie("user_type");
            delCookie("sid");
            if(reg.test(url)){
                location.href="/user";
            }else{
                location.reload();
            }
            return false;
        })
        var p=null;
        $("#nav_bar>ul>li").hover(function(){
            $(this).addClass("on").siblings().removeClass("on");
            if($(this).hasClass("brand")){
                $("#nav_bar_cont").hide();
                $(this).children("p").fadeIn("400").end().siblings().children("p").hide();
                return false;
            }
            $("#nav_bar_cont").slideDown(400);
            $(this).children("ol").clone().appendTo($("#nav_bar_cont").empty());
            $(this).children("p").fadeIn("400").end().siblings().children("p").hide();
        },function(){
            // $(this).children("p").fadeOut("400");
            // $(this).removeClass("on");
        })
        $("#nav_bar").hover(function(){
            clearTimeout(p);
            // $("#nav_bar_cont").slideDown(600);
        },function(e){
            var event=e || window.event;
            clearTimeout(p);
            p=setTimeout(function(){
                $("#nav_bar_cont").slideUp(600,function(){
                    $("#nav_bar").find("li").removeClass("on");
                    $("#nav_bar>ul>li p").hide();
                });
            },400)
        })
        //划过页尾的微信图标显示公众号二维码
        $("#weichat").hover(function(){
            $(this).children().show();
        },function(){
            $(this).children().hide();
        })
        //点击搜索显示输入框
        $("#search_box").on("click",function(){
            if(!$(this).find("p").is(":animated") && $(this).find("p").css("width")=="200px"){
                // $(this).find("p").css("border-bottom","1px solid #CBCAC8");
                $(this).find("p").stop().animate({"width":300},400,function(){
                    $("#hot_list").show();
                    $("#search_box").css("background","white");
                });
                $(this).find("input").css("display","inline-block");
                $(this).find("input").animate({"width":270},400,function(){
                	$(this).focus();
                });
            }else{
                return false;

            }
            // $(this).find("input").animate({"width":120},600);
        })
        //点击页面除搜索框以外的地方，隐藏搜索框
        $(document).on("click",function(e){
            var event=e || window.event,
                tar=$(event.target);
            if($("#search_word").css("width")=="270px" && tar.attr("id")!="search_box" && tar.attr("id")!="search" && tar.attr("id")!="search_word"){
                $("#search_word").val("");
                $("#hot_list").hide();
                $("#search_word").stop().animate({"width":170},400);
                $("#search_word").parent().animate({"width":200},400,function(){
                    // $(this).css("border-bottom","none");
                    $("#search_word").blur().val("");
                    $("#search_box").css("background","#F8F8F8");
                });
                $("#search_box em").animate({"width":0},400);
            };
        })
        //点击搜索
        $("#search").on("click",function(){
            console.log(111);
        })
        /*$("#shopping_bag").on("mouseenter",function(){

        })*/
        //
        W=$(window).width();
        $("#nav_bar>li>ol").css("width",W)
        //划过手机图标显示下载APP二维码
        $(".download_app a").hover(function(){
            $(this).next().fadeIn(400);
        },function(){
            $(this).next().fadeOut(400);
        })
        //鼠标滑过购物袋，购物袋弹窗显示
        var t=null;
        /*$(".shopping_bag").hover(function(){
            clearTimeout(t);
            $(this).children("div").fadeIn(600);
        },function(e){
        //离开购物袋弹窗隐藏
            var _this=$(this);
            var event=e || window.event;
            clearTimeout(t);
            t=setTimeout(function(){
                _this.children("div").fadeOut(600);
            },400)
        })*/
        //鼠标滑过个人中心，个人中心弹窗显示
        var d=null;
        $(".user_center").hover(function(){
            clearTimeout(d);
            $(this).children("div").fadeIn(400);
        },function(e){
        //离开购物袋弹窗隐藏
            var _this=$(this);
            var event=e || window.event;
            clearTimeout(d);
            d=setTimeout(function(){
                $("#user_center_cont").fadeOut(400);
            },400)
        })
        $(".user_functions").on("mouseenter","li",function(){
            $(this).siblings().children("div").hide();
        })
        //以后点击添加购物袋能用到
        // $(".shopping_bag").mouseenter()
        // $(".shopping_bag").mouseleave()
    }
    init();
    })
})(jQuery)
