var smoking = false;
var smokingInit= false;
var mouseScroll=true;
var changePage=false;
var scrollPage=[];
// var scrollPage=["main","gashapon","glory","info","event"];
// var scrollPage=["main","gashapon","glory","info"];

function InitScrollPageArr(){
    $(".nav-li").each(function(v,i){
        if($(this).attr("data-page")){
            var obj={"page":"","status":true};
            if($(this).hasClass("coming")){
                obj.status=false;
            }
            obj.page=$(this).attr("data-page");
            scrollPage.push(obj);
        }
    })
    scrollPage=scrollPage.filter(function(v){
        return v.status;
    });
}

InitScrollPageArr();

var scrollPageIndex=0;
var weekList={
    "一":"12/16~12/23",
    "二":"12/23~12/30",
    "三":"12/30~01/06",
    "四":"01/06~01/13",
}

//動態部分
// 修改20201126
function InitAnimate(page) {  
    $("#smokeBg").show()
    $(window).resize(function () {
        var imgW = 600;
        var imgH = 344;
        var ww = window.innerWidth;
        var vh = window.innerHeight;
        var s;
        if (ww / vh > imgW / imgH) {
            s = ww / imgW;
        } else {
            s = vh / imgH;
        }
        TweenMax.set($('#smokeBg'), {
            scale: s,
            x: '-50%',
            y: '-50%'
        });
    }).resize();

    $(".smoke_inner").animateSprite({
        fps: 20,
        loop: false,
        complete: function () {
            // use complete only when you set animations with 'loop: false'
            if ($('.smoke_inner').css('background-position') !== '0px 0px') {
                $('#smokeBg').css('display', 'none');
                smoking = false;
                smokingInit = true;
                mouseScroll=true;
                changePage=true;
                var currPage=$("#app").attr("data-current");
                if(currPage != "main"){
                    if(!$(".nav-wrap").hasClass("show")){
                        $(".nav-wrap").fadeIn()
                        $(".nav-wrap").addClass("show")
                    }
                }
            }
        }
    });
    if(page){
        contentOpacity(page)
    }
}  


//----------煙霧特效
function smokeAniMotion(page) {
    $(".smoke_inner").css('background-position', '0 0');
    $('#smokeBg').css('display', 'block');
    smoking = true;
    $(".smoke_inner").animateSprite('restart');
    if(page){
        contentOpacity(page)
    }
}

function contentOpacity(page){
    TweenMax.to($("."+page+" .section-contents"),1.2,{
        autoAlpha:1,
        delay:1
    })
}

var drag;
// 拖曳效果
function dragPage(page){
    var $win = $(window);
    if(isMobile.any){
        var scrTop = -Math.round(($win.height() - 756) / 2);
        var scrLeft = -Math.round(($win.width() - 1344) / 2);
    }else{
        var scrTop = -Math.round(($win.height() - 1100) / 2);
        var scrLeft = -Math.round(($win.width() - 1920) / 2);
    }
    drag = Draggable.create(page+" .drag-wrap", {
        type: "scroll",
        edgeResistance: 1,
        throwProps: true
    })[0]
    
    TweenMax.set(drag.scrollProxy, {
        scrollLeft: (scrLeft < 0 ? 0 : scrLeft),
        scrollTop: 0
    })
}

function end(fn){
    var $win = $(window);
    if(isMobile.any){
        var scrTop = -Math.round(($win.height() - 756) / 2);
        var scrLeft = -Math.round(($win.width() - 1344) / 2);
    }else{
        var scrTop = -Math.round(($win.height() - 1100) / 2);
        var scrLeft = -Math.round(($win.width() - 1920) / 2);
    }

    TweenMax.to(drag.scrollProxy, 0.6, { 
        scrollLeft: (scrLeft<0? 0: scrLeft), 
        scrollTop:0, 
        ease: Quint.easeOut
    });
    videoRest($(".entry__video1"), 2, true).pause()
    setTimeout(function () {
        videoRest($(".entry__video1"), 0, false)
    }, 1000);
    videoRest($(".entry__video2"), 2, true).play(0)
    elementScale($(".entry__contents"))
    if(fn){
        fn();
    }
}


function videoEnded(video,callback){
    $(video)[0].onended = callback;
}

function elementScale(target){
    TweenMax.to(target, 1.2, {
        autoAlpha: 0,
        scale: 1.3,
        ease: Quint.easeIn
    });
}

function videoRest(video, zindex, isShow) {
    if(isShow){
        video.show()
    }else{
        video.hide()
    }
    video.css("zIndex", zindex);
    return video[0];
}
dragPage(".entry");
TweenMax.set($(".main__title"), {
    scale: 2,
    autoAlpha: 0,
});

TweenMax.set($(".main__btn-group"), {
    y: "100",
    autoAlpha: 0,
});

// 調整20201126
$(".entry__btn").on("click",function(){
    var change=$(this).attr("data-change");
    $("#app").attr("data-current",change);
    mouseScroll=false;
    end(function(){
        videoEnded(".entry__video2",function(){
            $(".entry").fadeOut()
            $(".main").show();
            dragPage(".main");
            videoRest($(".main__video1"), 2, true).play()
            videoEnded(".main__video1",function(){
                videoRest($(".main__video1"), 2, true).pause()
                TweenMax.to($(".main__title"), 2, {
                    autoAlpha: 1,
                    scale: 1
                });
                setTimeout(function () {
                    videoRest($(".main__video1"), 0, false)
                }, 1000);
                videoRest($(".main__video2"), 2, true).play(0)
                TweenMax.to($(".main__btn-group"),1, {
                    y: "0",
                    autoAlpha: 1,
                    onComplete:function(){
                        mouseScroll=true;
                        changePage=true;
                    }
                });
            })
        })
    })
})

$(".nav-li").on("click",function(){
    if($(this).hasClass("coming")){
        return;
    }
    var current=$("#app").attr("data-current");
    var page=$(this).attr("data-page");
    if(page && changePage){
        changePage=false;
        mouseScroll=false;
        $("#app").attr("data-current",page);
        scrollPage.forEach(function(v,i){
            if(v.page == page){
                scrollPageIndex=i;
            }
        })
        $(this).addClass("current").siblings().removeClass("current");
        if(current == "entry"){
            end(function(){
                videoEnded(".entry__video2",function(){
                    $(".entry").hide();
                    pageAnim(page);
                })
            })
        }else{
            pageAnim(page);
        }
    }
})

$(".main__btn").on("click",function(){
    if($(this).hasClass("coming")){
        return;
    }
    var current=$("#app").attr("data-current");
    var page=$(this).attr("data-page");
    if(page && changePage){
        changePage=false;
        mouseScroll=false;
        $("#app").attr("data-current",page);
        scrollPage.forEach(function(v,i){
            if(v.page == page){
                scrollPageIndex=i;
            }
        })
        $(".nav-li[data-page="+page+"]").addClass("current").siblings().removeClass("current");
        if(current == "entry"){
            end(function(){
                videoEnded(".entry__video2",function(){
                    $(".entry").hide();
                    pageAnim(page);
                })
            })
            
        }else{
            pageAnim(page);
        }
    }
})

function pageAnim(page){
    $(".section[data-page="+page+"]").show();
    $(".section").not($(".section[data-page="+page+"]")).hide();

    if($("."+page).find(".drag-wrap").length){
        $("#app").css("overflow","hiddden")
        $(".UNI-footer").addClass("fixed")
        if(isMobile.any){
            if(page == "main"){
                dragPage("."+page);
            }
        }else{
            dragPage("."+page);
        }
    }else{
        $("#app").css("overflow","auto")
        $(".UNI-footer").removeClass("fixed")
    }
    
    BGO.check_app_exist(function (res) {
        if (res.result == undefined) {
            checkLogin($('#AccountToken'));
        }
    });

    if(page == "glory"){
        HallofFameLoad()
    }
    if(page == "main"){
        videoRest($(".main__video1"), 2, true).play()
        videoEnded(".main__video1",function(){
            videoRest($(".main__video1"), 2, true).pause()
            TweenMax.to($(".main__title"), 2, {
                autoAlpha: 1,
                scale: 1
            });
            setTimeout(function () {
                videoRest($(".main__video1"), 0, false)
            }, 1000);
            videoRest($(".main__video2"), 2, true).play(0)
            TweenMax.to($(".main__btn-group"),1, {
                y: "0",
                autoAlpha: 1,
            });
        })
    }
    if(page == "gashapon"){
        Initialize()
    }
    if(smokingInit){
        smokeAniMotion(page)
    }else{
        InitAnimate(page)
    }
}

if($(".info__content-img").length){
    $(".info__content-img").mCustomScrollbar({
        theme:"light"
    });
}
if($(".event__content-img").length){
    $(".event__content-img").mCustomScrollbar({
        theme:"light"
    });
}


// 千萬轉蛋按鈕區
$(".gashapon__btn").on("click",function(){
    var btn=$(this).data().btn;
    switch(btn){
        case "info":
            $.gbox.open(gashaponNoticeHTML,gashaponNoticeObj);
            return;
        case "list":
            $.gbox.open(rewardListRender(ItemRewardInit),rewardListObj);
            return;
        case "search":
            FindRewardLog()
            return;
        case "person":
            GetMission("person")
            return;
        case "world":
            GetMission("world")
            return;
        case "glory":
            GetSupportLog()
            return;
    }
})

// 千萬轉蛋按鈕區
$(".gashapon__menu-btn2").on("click",function(){
    var btn=$(this).data().btn;
    switch(btn){
        case "info":
            $.gbox.open(gashaponNoticeHTML,gashaponNoticeObj);
            return;
        case "list":
            $.gbox.open(rewardListRender(ItemRewardInit),rewardListObj);
            return;
        case "search":
            FindRewardLog()
            return;
    }
})

$(".gashapon__menu-btn1").on("click",function(){
    var btn=$(this).data().btn;
    switch(btn){
        case "person":
            GetMission("person")
            return;
        case "world":
            GetMission("world")
            return;
        case "glory":
            GetSupportLog()
            return;
    }
})

// 名人堂按鈕區
$(".glory__btn").on("click",function(){
    var btn=$(this).data().btn;
    switch(btn){
        case "like":
            $.gbox.open(gloryLikeNoticeHTML,gloryNoticeObj);
            return;
        case "sup":
            $.gbox.open(gloryYYNoticeHTML,gloryNoticeObj);
            return;
        case "share":
            $.gbox.open(gloryShareNoticeHTML,gloryNoticeObj);
            return;
    }
})

$(".glory__menu-btn").on("click",function(){
    var btn=$(this).data().btn;
    switch(btn){
        case "like":
            $.gbox.open(gloryLikeNoticeHTML,gloryNoticeObj);
            return;
        case "sup":
            $.gbox.open(gloryYYNoticeHTML,gloryNoticeObj);
            return;
        case "share":
            $.gbox.open(gloryShareNoticeHTML,gloryNoticeObj);
            return;
        case "rank":
            $.gbox.open(gloryRankRender(HalloFameRankList),gloryRankObj);
            return;
    }
})


// 轉蛋轉下去
$(".gashapon__main-btn").on("click",function(){
    AddRewardLog()
})

$(".gashapon__menu-open").on("click",function(){
    $(".gashapon__menu").addClass("show")
    $(".gashapon__menu-wrap").addClass("show")
    $("body").css("overflow","hidden")
})
$(".gashapon__menu-close").on("click",function(){
    $(".gashapon__menu").removeClass("show")
    $(".gashapon__menu-wrap").removeClass("show")
    $("body").css("overflow","auto")
})

$(".glory__menu-open").on("click",function(){
    $(".glory__menu").addClass("show")
    $(".glory__menu-wrap").addClass("show")
    $("body").css("overflow","hidden")
})
$(".glory__menu-close").on("click",function(){
    $(".glory__menu").removeClass("show")
    $(".glory__menu-wrap").removeClass("show")
    $("body").css("overflow","auto")
})

// 點讚
// 調整20201126
$("body").on("click",".glory__slider-btn-like",function(){
    var seq=$(".swiper-slide-active").find(".glory__slider-role").attr("data-seq");
    Like(seq)
})

// 分享按鈕
$(".glory__share-btn").on("click",function(){
    Share()
})

// 支持
$(".glory__rank-sup").on("click",function(){
    GetHallofFame()
})

$(".glory__slider-btn-sup").on("click",function(){
    GetHallofFame()
})


// 判斷登入登出
function checkLogin(v) {

    var Logout = 'Logout.aspx';
    var Login = 'Login.aspx';

    if($(v).val()){
        $(".nav-li:not([data-page])").find("a").text("登出").attr("href", Logout);
    }else{
        $(".nav-li:not([data-page])").find("a").text("登入").attr("href", Login);
    }
}

loadingProgress({
	loadedFN: function(){
        var footer=$(".UNI-footer").html();
        var footerHTML="<div class='UNI-footer dark'>"+footer+"</div>"
        $(".UNI-footer").remove()
        if(isMobile.any){
            $("#app").append(footerHTML)
        }else{
            $(".entry").append(footerHTML)
            $(".main").append(footerHTML)
            $(".gashapon .section-contents").append(footerHTML)
            $(".glory .section-contents").append(footerHTML)
            if($(".event").length){
                $(".event").append(footerHTML)
            }
        }
        
        $(".UNI-footer").addClass("fixed")
	},
	detectVideo: true
});

function checkScrollEnd(e){
    var pageObj=scrollPage[scrollPageIndex];
    var h=$(document.body).height();
    var footer=$(".UNI-footer").outerHeight(true);
    if(pageObj.page == "main"){
        return true;
    }
    if($("."+pageObj.page).find(".draggable").length){
        var pageHeight=$("."+pageObj.page).find(".draggable").outerHeight();
        var t=$("."+pageObj.page).find(".drag-wrap").scrollTop();
    }else{
        var pageHeight=$("."+pageObj.page).outerHeight();
        var t=$("#app").scrollTop();
    }
    var total=pageHeight-h+footer;
    if(h >= pageHeight){
        return true;
    }
    
    if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0){
        if(Math.floor(t/total)){
            return true;
        }
    }
    if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){
        if(t == 0){
            return true;
        }
    }
    
    return false;
}

function scrollPageRun(){
    var pageObj=scrollPage[scrollPageIndex];
    if(!pageObj.status){
        return false;
    }
    $(".nav-li[data-page="+pageObj.page+"]").addClass("current").siblings().removeClass("current");
    $("#app").attr("data-current",pageObj.page)
    $(this).addClass("current").siblings().removeClass("current");
    pageAnim(pageObj.page)
}

$(window).on('mousewheel DOMMouseScroll', function (e) {
    if(!isMobile.any){
        if(!mouseScroll) return;
        // 滑鼠往下滾
        if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
            var currentPage=$("#app").attr("data-current");
            if(currentPage == "entry"){
                mouseScroll=false;
                end(function(){
                    videoEnded(".entry__video2",function(){
                        $(".entry").fadeOut()
                        $(".main").show();
                        dragPage(".main");
                        videoRest($(".main__video1"), 2, true).play()
                        videoEnded(".main__video1",function(){
                            videoRest($(".main__video1"), 2, true).pause()
                            TweenMax.to($(".main__title"), 2, {
                                autoAlpha: 1,
                                scale: 1
                            });
                            setTimeout(function () {
                                videoRest($(".main__video1"), 0, false)
                            }, 1000);
                            videoRest($(".main__video2"), 2, true).play(0)
                            TweenMax.to($(".main__btn-group"),1, {
                                y: "0",
                                autoAlpha: 1,
                                onComplete:function(){
                                    mouseScroll=true;
                                    $("#app").attr("data-current","main")
                                }
                            });
                        })
                    })
                })
            }else{
                if(!checkScrollEnd(e)){
                    return false;
                }
                mouseScroll=false;
                scrollPageIndex++;
                if(scrollPageIndex == scrollPage.length){
                    scrollPageIndex=0;
                }
                scrollPageRun()
            }
        }
        // 滑鼠往上滾
        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){
            var currentPage=$("#app").attr("data-current");
            if(currentPage != "entry"){
                if(!checkScrollEnd(e)){
                    return false;
                }
                mouseScroll=false;
                scrollPageIndex--;
                if(scrollPageIndex < 0){
                    scrollPageIndex=scrollPage.length-1;
                }
                scrollPageRun()
            }
        }
    }
})
