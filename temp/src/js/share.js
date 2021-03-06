function getMeta(name){
    var meta=document.getElementsByTagName("meta");
    var desc;
    for(var i=0;i<meta.length;i++){
        if(meta[i].name == name){
            desc=meta[i].content
        }
    }
    return desc;
}
function fbShare(){
    var url = location.href;
    var t="";
    if(isMobile.any){
        var winRef = window.open(url, "_blank");
        var fbhtml_url = window.location.toString();
        winRef.location='http://www.facebook.com/sharer/sharer.php?u=' + fbhtml_url
    }else{
        window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(t),'sharer', 'toolbar=0,status=0,width=626,height=436');
    }
}

function lineShare(t) {
    var url = location.href;
    var t=getMeta("description");
    window.open('http://line.naver.jp/R/msg/text/?' + encodeURIComponent(t) +url);
}

function copyLink(target,copy) {
    var clipboard = new ClipboardJS(target, {
        text: function () {
            return copy;
        }
    });
    clipboard.on('success', function (e) {
        $.gbox.open('已複製連結',defaultObj);
        clipboard.destroy();
    });
}

// 手機板分享時使用
function mobileShare(){
	var url=location.href;
	var t=getMeta("description");
	var title=document.getElementsByTagName("title")[0].innerHTML;
    var shareData = {
        url: url, // 要分享的 URL
        title: title, // 要分享的標題
        text: t, // 要分享的文字內容
    };
    if(navigator.share){
        navigator.share(shareData);
    }else{
        $('.share-tip').toggleClass("show")
    }
}