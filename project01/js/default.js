function initSlick(){
    $(".ranks__wrap").slick({
        infinite: false,
        draggable:false,
        touchMove:false,
        vertical:true,
        verticalSwiping:false,
        arrows:false,
        swipe:false,
        speed:0
    })
    $(".ranks__box").slick({
        infinite: false,
        arrows:true,
    })
}
function unInitSlick(){
    $(".ranks__wrap").slick("unslick");
    $(".ranks__box").slick("unslick");
}

function initBtn(){
    $(".next").removeAttr("disabled")
    $(".prev").attr("disabled","")
}
!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /Windows Phone/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); if ("undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() }(this);

var _direction="";
var box=`
<div class="ranks__box">
    <div class="ranks__item">{{floor}}A</div>
</div>
`;
var item=`<div class="ranks__item">{{floor}}B</div`;

$(function(){
    var _index=parseInt($('.floor').attr("data-index"));
    var _total=parseInt($('.floor').attr("data-total"));
    var boxHTML="";

    if (window.orientation == 180 || window.orientation == 0) {
        // 直
        _direction="portrait";
    }
    if (window.orientation == 90 || window.orientation == -90) {
        // 橫
        _direction="landscape";
    }

    _floor=(_index*10)+10;
    boxHTML=box.replace(/{{floor}}/g,_floor)
    $('.ranks__wrap').append(boxHTML);
    if(!isMobile.any || _direction == 'landscape'){
        initSlick()
        $('.floor').attr("data-index",_index).attr("data-total",$('.ranks__box').length).text(_floor);
    }
})

window.addEventListener("orientationchange", function () {
    if (window.orientation == 180 || window.orientation == 0) {
        // 直
        _direction="portrait";
        unInitSlick()
        $('.ranks__wrap').hide();
    }
    if (window.orientation == 90 || window.orientation == -90) {
        // 橫
        _direction="landscape";
        var _index=parseInt($('.floor').attr("data-index"));
        $('.ranks__wrap').show();
        initSlick()
        $('.ranks__wrap').slick("slickGoTo",_index)
    }
}, false);

$('.ranks__open').on('click',function(){
    var _index=parseInt($('.floor').attr("data-index"));
    $('.ranks__wrap').show();
    $(".ranks_control-item").show();
    $("#app").append("<div class='slick-module'></div>")
    initSlick()
    initBtn();
    $('.ranks__wrap').slick("slickGoTo",_index)
})

$('.up').on("click",function(){
    var _index=parseInt($('.floor').attr("data-index"));
    var _total=parseInt($('.floor').attr("data-total"));
    var _floor=10;
    var boxHTML="";
    _index+=1;
    _floor=(_index*10)+10;

    if(_index >= 10){
        return;
    }
    if(_index >= _total){
        if(!isMobile.any || _direction == 'landscape'){
            unInitSlick();
        }

        boxHTML=box.replace(/{{floor}}/g,_floor)
        $('.ranks__wrap').append(boxHTML);

        if(!isMobile.any || _direction == 'landscape'){
            initSlick();
            initBtn();
        }
    }

    $('.floor').attr("data-index",_index).attr("data-total",$('.ranks__box').length).text(_floor);
    
    if(!isMobile.any || _direction == 'landscape'){
        $('.ranks__wrap').slick("slickGoTo",_index)
    }
})

$('.down').on("click",function(){
    var _index=parseInt($('.floor').attr("data-index"));
    var _floor=10;
    _index-=1;
    _floor=(_index*10)+10;

    if(_index < 0){
        return;
    }
    $('.floor').attr("data-index",_index).text(_floor);

    $('.ranks__wrap').slick("slickGoTo",_index)
})

$(window).on('click',function(e){
    if($(e.target).hasClass('slick-module')){
        $(".slick-module").remove();
        $('.ranks__wrap').hide();
        $(".ranks_control-item").hide();
        unInitSlick()
    }
})

$(".next").on("click",function(){
    var _index=parseInt($('.floor').attr("data-index"));
    var _length=$('.ranks__box').eq(setting.index).find('.ranks__item').length;
    var itemHTML="";
    itemHTML=item.replace(/{{floor}}/g,(_index*10)+10)
    if(_length < 2){
        unInitSlick()
        $('.ranks__box').eq(_index).append(itemHTML)
        initSlick()
    }
    $('.ranks__wrap').slick("slickGoTo",_index)
    $('.ranks__box').eq(_index).slick("slickGoTo",1)
    $(this).attr('disabled',"")
    $(".prev").removeAttr("disabled")
})
$(".prev").on("click",function(){
    var _index=parseInt($('.floor').attr("data-index"));
    $('.ranks__box').eq(_index).slick("slickGoTo",0)

    $(this).attr('disabled',"")
    $(".next").removeAttr("disabled")
})