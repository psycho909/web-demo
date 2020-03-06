document.addEventListener("DOMContentLoaded",function(event){
    //判斷是否為行動裝置
    function isMobile () {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
    
    function Goto(url) {
        var strUrl;
        if (typeof (url) === "undefined") {
            strUrl = location.protocol +
                "//" +
                document.location.host +
                "/bflogin/Index?service=999999_T0&dt=20171102110846.184&url=" +
                escape(document.location.href);
        } else {
            //轉回PC版時URL會和Web主站相同
            if (url === "https://tw.beanfun.com/")
                document.cookie = "bfMobilePC=1;  domain=.beanfun.com;";
            strUrl = url;
        }
        window.setTimeout("top.location.href = \"" + strUrl + "\";", 200);
    }

    function fadeIn(el,display){
        el.style.opacity=0;
        el.style.display = display || "block";
        (function fade(){
            var val = parseFloat(el.style.opacity);
            if(!((val += .05) > 1)){
                el.style.opacity=val;
                requestAnimationFrame(fade)
            }
        })()
    }
    function fadeOut(el){
        el.style.opacity=1;
        (function fade(){
            if ((el.style.opacity -= .1) < 0) {
                el.style.display =  "none";
            }else{
                requestAnimationFrame(fade)
            }
        })()
    }
    function moveRight(el){
        (function move(){
            var val = parseFloat(window.getComputedStyle(el).right.replace("px",""));
            if(!((val += 500) >= 0)){
                el.style.right=val+"px";
                requestAnimationFrame(move)
            }else{
                el.style.right=0+"px";
            }
        })()
    }
    function moveLeft(el){
        (function move(){
            var val = parseFloat(window.getComputedStyle(el).right.replace("px",""));
            if(!((val -= 500) < -600)){
                el.style.right=val+"px";
                requestAnimationFrame(move)
            }else{
                el.style.right=-600+"px";
            }
        })()
    }
    var winW=window.innerWidth;
    if(winW <= 750 || isMobile ()){
        var metaTag=document.getElementsByTagName("meta");
        var metaTagLength=metaTag.length;
        for(var i=0;i<metaTagLength;i++){
            if(metaTag[i].getAttribute("name") == "viewport"){
                metaTag[i].content="width=750,user-scalable=0";
            }
        }
    
        var headerHTML='<div class="bfm-header">'
                    +'<div class="logo">'
                    +'<a href="/"></a>'
                    +'</div>'
                    +'<div class="burger"></div>'
                    +'</div>';
    
        document.body.className+=" bfm";
        document.body.insertAdjacentHTML('afterBegin', headerHTML);

        var burgetBtn=document.querySelector(".bfm-header .burger");
        var modalHTML=document.createElement("div");
        modalHTML.className="bfm-modal";
        modalHTML.style.display="block";

        var mainmenuContent=[
            {
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-account.png",
                name:"未登入",
                href:"#",
                class:"account"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-member-center.png",
                name:"會員中心",
                href:"#",
                class:"pc"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-pc.png",
                name:"線上遊戲",
                href:"/Games",
                class:"pc"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-mobile.png",
                name:"熱門手遊",
                href:"/Games/Mobile",
                class:"moblie"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-news.png",
                name:"最新消息",
                href:"/Events",
                class:"news"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-deposit.png",
                name:"儲值中心",
                href:"#",
                class:"deposit"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-home.png",
                name:"回到首頁",
                href:"/",
                class:"home"
            },{
                img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-switch.png",
                name:"切換到PC版",
                href:"javascript:;",
                class:"switch"
            }
        ];
        var mainmenuHTML=document.createElement("div");
        mainmenuHTML.className="bfm-mainmenu";
        var fragment=document.createDocumentFragment();
        for(var i=0;i<mainmenuContent.length;i++){
            var a=document.createElement("a");
            var img=document.createElement("img");
            var span=document.createElement("span");
            a.className=mainmenuContent[i].class;
            img.src=mainmenuContent[i].img;
            span.textContent=mainmenuContent[i].name;
            a.appendChild(img);
            a.appendChild(span);
            fragment.appendChild(a);
        }
        mainmenuHTML.appendChild(fragment)
        burgetBtn.addEventListener("click",function(){
            document.body.appendChild(modalHTML);
            document.body.appendChild(mainmenuHTML);
            document.documentElement.style.overflow="hidden";

            fadeIn(modalHTML)
            moveRight(mainmenuHTML);
        })
        modalHTML.addEventListener("click",function(){
            fadeOut(modalHTML)
            moveLeft(mainmenuHTML);
        })
    }

})