//判斷是否為行動裝置
!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /Windows Phone/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); if ("undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() }(this);

// IE 的 placeholder
function add_placeholder(clas,color) {
    var el = document.getElementsByClassName(clas);

    for (var i = 0, len = el.length; i < len; i++) {
        el[i].onfocus = function () {
            if (this.value == this.getAttribute("placeholder")) {
                this.value = "";
                this.style.cssText = "";
            }
        }
        el[i].onblur = function () {
            if (this.value.length == 0) {
                this.value = this.getAttribute("placeholder");
                this.style.cssText = 'color:'+color+';';
            }
        }
        el[i].onblur();
    }
}

// 首頁隨高度縮放
function resizePage(){
    var h=$(window).height();
    var i = h/940;
    $(".main-box").css({
        "-ms-transform": "translate(-50%,0%) scale(" + i + ")",
        "-moz-transform": "translate(-50%,0%) scale(" + i + ")",
        "-webkit-transform": "translate(-50%,0%) scale(" + i + ")",
        transform: "translate(-50%,0%) scale(" + i + ")",
        "transform-origin":"center 0"
    })
}

// 選單關閉
function menuClose(){
    TweenMax.to(".menu-module", .6,{
        autoAlpha: 0, display:"none",
        onComplete:function(){
            $(".menu-module").remove()
        }
    });
    TweenMax.to(".menu-wrap", .6,{
        right: 0, x:"100%", display:"none",
        onComplete:function(){
            $("html").css("overflow","auto")
        }
    });
}

// 動畫光
function animLight(){
    var tl = new TimelineMax({repeat:-1});
    tl.to(".anim-light",8,{ x:"0%",y:"0%", ease: Linear.easeInOut }).to('.anim-light',1,{ autoAlpha:0,delay:4 })
}

// 動畫亮點
function animDot(){
    var t1 = new TimelineMax({repeat:-1,ease: Linear.easeInOut});
    t1.to(".dot1",1,{autoAlpha:1}).to(".dot1",12,{ x:'-=700',y:700 }).to(".dot1",1,{autoAlpha:0})

    var t2 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:2});
    t2.to(".dot2",1,{autoAlpha:1}).to(".dot2",14,{ x:'+=800',y:400 }).to(".dot2",1,{autoAlpha:0})

    var t3 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:1});
    t3.to(".dot3",1,{autoAlpha:1}).to(".dot3",22,{ x:'-=450',y:900 }).to(".dot3",1,{autoAlpha:0})

    var t4 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:3});
    t4.to(".dot4",1,{autoAlpha:1}).to(".dot4",16,{ x:'-=400',y:600 }).to(".dot4",1,{autoAlpha:0})

    var t5 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:2});
    t5.to(".dot5",1,{autoAlpha:1}).to(".dot5",18,{ x:'-=850',y:700 }).to(".dot5",1,{autoAlpha:0})

    var t6 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:1});
    t6.to(".dot6",1,{autoAlpha:1}).to(".dot6",12,{ x:'-=350',y:300 }).to(".dot6",1,{autoAlpha:0})

    var t7 = new TimelineMax({repeat:-1,ease: Linear.easeInOut,repeatDelay:3});
    t7.to(".dot7",1,{autoAlpha:1}).to(".dot7",16,{ x:'+=1200',y:-300 }).to(".dot7",1,{autoAlpha:0})
}

// 影片播放
// $("#myVideo").YTPlayer();
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player
function onYouTubeIframeAPIReady() {
    var videoId = document
        .getElementById('home-video')
        .getAttribute('data-video')
    player = new YT.Player('home-video', {
        videoId: videoId,
        playerVars: {
            controls: 0,
            modestbranding: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            fs: 0, // 顯示全螢幕按鈕
            cc_load_policty: 0, // 隱藏字幕
            iv_load_policy: 3, // 隱藏影片註解
            autohide: 0 // 播放影片時隱藏影片控制列
        },
        events: {
            onReady: function(e) {
                e.target.playVideo()
                e.target.mute();
                $("#myPlayer").fadeOut(1000)
            },
            onStateChange: function(e) {
                if (e.data === YT.PlayerState.ENDED) {
                    player.playVideo()
                }
            }
        }
    })
}

// 區碼選單
var selectStyle=(function(){
    var selectStyles=function(fix,reveal){
        this.fix=fix;
        this.reveal=reveal;
    }
    selectStyles.prototype.init=function(){
        if ($(this.fix).find('option[selected]').length === 1) {
            $(this.reveal).find('p').html($(this.fix).find('option[selected]').html());
        } else {
            $(this.reveal).find('p').html($(this.fix).find('option:first-child').html());
        }
        var _this=this;
        $(this.fix).on("change",function(){
            var newHTML = $(this).find(":selected").html();
            $(_this.reveal).find('p').html(newHTML);
        })
    }
    var init=function(fix,reveal){
        new selectStyles(fix,reveal).init();
    }
    return {
        init:init
    }
})()
selectStyle.init(".part1-phone-area__select",".part1-phone-area__style")

$(function(){
    if(!isMobile.any){
        // animDot()
        // animLight()
        resizePage()
    }

    // 判斷是否H5
    var href=location.href;
    href=href.toLocaleLowerCase();
    if(href.indexOf("beango") > -1){
        $(".h5-hide").hide();
        $(".part3-btn-group2").addClass("h5")
        $(".part3-h5-text").css("display","inline-block")
        $(".part4-h5-text").show()
    }
})

$(window).on('resize',function(){
    if(!isMobile.any){
        resizePage()
    }
})

// 判斷是否手機版本設置 menu 的初始位置
if(isMobile.any){
    TweenMax.set(".menu-wrap", { right: 0, x:"100%" });
}else{
    TweenMax.set(".menu-wrap", { left: 0, x:"-100%" });
    TweenMax.to(".main-btn__mouse span",.4,{ y:4, yoyo:true, repeat:-1 })
}

// menu 開
$(".menu-btn__open").on("click",function(){
    if(isMobile.any){
        $("body").append("<div class='menu-module'></div>")
        $("html").css("overflow","hidden")
        TweenMax.to(".menu-wrap", .6,{ right: 0, x:"0%", display:"block" });
        TweenMax.to(".menu-module", .6,{ autoAlpha: 1, display:"block" });
        return;
    }
    TweenMax.to(".menu-wrap", .6,{ left: 0, x:"0%", display:"block" });
})

// menu 關
$(".menu-btn__close").on("click",function(){
    if(isMobile.any){
        menuClose()
        return;
    }
    TweenMax.to(".menu-wrap", .6,{
        left: 0,
        x:"-100%",
        display:"none"
    });
})

$("body").on("click",'.menu-module',function(){
    if(isMobile.any){
        menuClose()
        return;
    }
})

// 滾動判斷 TOP 的顯示
$(window).on("scroll",function(e){
    var scrollY=$(this).scrollTop();
    var scrollTotal=$(document).height() - $(window).height();
    if(isMobile.any){
        if(scrollY >= (scrollTotal - 200)){
            $("#top").show()
            TweenMax.to("#top",.5,{ autoAlpha:1,display:"block" });
        }else if(scrollY <= 200){
            TweenMax.to("#top",.3,{ autoAlpha:0,display:"none" });
        }
        return;
    }
    if(scrollY >= $("#part1").offset().top){
        TweenMax.to("#top",.5, { autoAlpha:1,display:"block" });
    }else if(scrollY <= 200){
        TweenMax.to("#top",.3, { autoAlpha:0,display:"none" });
    }
})

// 點 TOP 的效果
$("#top").on("click",function(){
    $("body,html").animate({
        scrollTop:0
    },600)
})

// 點 立即事先預約 和 滑鼠小動畫 滾動到事先預約頁面
$(".main-btn__reg,.main-btn__mouse").on('click',function(){
    if($(this).is(":disabled")){
        return;
    }
    $("html,body").animate({
        scrollTop:$("#part1").offset().top
    },700)
})

// 選單點及滾動
$(".menu-list li").on("click",function(){
    var t=$(this).attr("data-target");
    if(t){
        $("html,body").animate({
            scrollTop:$(t).offset().top
        },700)
    }
    if(isMobile.any){
        menuClose()
    }
})