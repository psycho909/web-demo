//判斷是否為行動裝置
!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /Windows Phone/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); if ("undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() }(this);

// 影片播放
$("#myVideo").YTPlayer();

$(function(){
    resizePage()
    // part1Anim()
})
// 首頁隨高度縮放
function resizePage(){
    var h=$(window).height();
    var i = h/1080;
    $(".main-box").css({
        "-ms-transform": "translate(-50%,0%) scale(" + i + ")",
        "-moz-transform": "translate(-50%,0%) scale(" + i + ")",
        "-webkit-transform": "translate(-50%,ㄢ%) scale(" + i + ")",
        transform: "translate(-50%,0%) scale(" + i + ")"
    })
}
$(window).on('resize',function(){
    resizePage()
})

// 事前預約頁動畫
function part1Anim(){
    var falling = true;

    TweenLite.set("#part1", { perspective: 600 })
    // TweenLite.set("img", { xPercent: "-50%", yPercent: "-50%" })

    var total = 8;
    var container = document.getElementById("part1"), w = container.clientWidth, h = container.clientHeight;

    for (i = 0; i < total; i++) {
        var Div = document.createElement('div');
        TweenLite.set(Div, { attr: { class: 'dot' }, x: R(0, w), y: R(0, -150), z: R(-200, 200) });
        container.appendChild(Div);
        animm(Div);
    }

    function animm(elm) {
        TweenMax.to(elm, R(6, 15), { y: h + 100, ease: Linear.easeNone, delay: -15 });
        TweenMax.to(elm, R(4, 8), { x: '-=150', rotationZ: R(0, 180), yoyo: true, ease: Sine.easeInOut });
        TweenMax.to(elm, R(2, 8), { rotationX: R(0, 360), rotationY: R(0, 360), yoyo: true, ease: Sine.easeInOut, delay: -5 });
    };

    function R(min, max) { return min + Math.random() * (max - min) };
}


// 判斷是否手機版本設置 menu 的初始位置
if(isMobile.any){
    TweenMax.set(".menu-wrap", {
        right: 0,
        x:"100%"
    });
}else{
    TweenMax.set(".menu-wrap", {
        left: 0,
        x:"-100%"
    });

    TweenMax.to(".main-btn__mouse span",.4,{
        y:4,
        yoyo:true,
        repeat:-1
    })
}

// menu 開
$(".menu-btn__open").on("click",function(){
    if(isMobile.any){
        TweenMax.to(".menu-wrap", .6,{
            right: 0,
            x:"0%",
            display:"block"
        });
        return;
    }
    TweenMax.to(".menu-wrap", .6,{
        left: 0,
        x:"0%",
        display:"block"
    });
})

// menu 關
$(".menu-btn__close").on("click",function(){
    if(isMobile.any){
        TweenMax.to(".menu-wrap", .6,{
            right: 0,
            x:"100%",
            display:"none"
        });
        return;
    }
    TweenMax.to(".menu-wrap", .6,{
        left: 0,
        x:"-100%",
        display:"none"
    });
})

// 滾動判斷 TOP 的顯示
$(window).on("scroll",function(e){
    var scrollY=$(this).scrollTop();
    var scrollTotal=$(document).height() - $(window).height();
    if(isMobile.any){
        if(scrollY >= (scrollTotal - 200)){
            $("#top").show()
        }else if(scrollY <= 200){
            $("#top").hide()
        }
        return;
    }
    if(scrollY >= $("#part1").offset().top){
        $("#top").show()
    }else if(scrollY <= 200){
        $("#top").hide()
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