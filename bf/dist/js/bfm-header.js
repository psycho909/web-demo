!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /Windows Phone/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); if ("undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() }(this);
document.addEventListener("DOMContentLoaded",function(event){
    function insertCSS(){
        var stylePath = "https://tw.hicdn.beanfun.com/beanfun/beanfun/bfm/css/";
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = "stylesheet";
        link.href = stylePath + 'bfm-header.css';
        document.head.appendChild(link);
    }
    insertCSS()
    // 淡入
    function fadeIn(el,display){
        el.style.display = display || "block";
        setTimeout(function(){
            el.style.opacity=1
        }, 0);
    }
    // 淡出
    function fadeOut(el){
        el.style.opacity=0;
        setTimeout(function(){
            el.style.display =  "none";
        }, 400);
    }
    // 移進去
    function moveIn(el){
        el.style.transform='translateX('+0+'%)';
    }
    // 移出去
    function moveOut(el){
        el.style.transform='translateX('+100+'%)';
    }
    // 選單內容
    var mainmenuContent=[{
            img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-pc.png",
            txt:"線上遊戲",
            href:"/Games",
            class:"pc"
        },{
            img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-mobile.png",
            txt:"熱門手遊",
            href:"/Games/Mobile",
            class:"moblie"
        },{
            img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-news.png",
            txt:"最新消息",
            href:"/Events",
            class:"news"
        },{
            img:"https://tw.hicdn.beanfun.com/beanfun/beanfunM/img/menu-home.png",
            txt:"回到首頁",
            href:"/",
            class:"home"
        }
    ];

    // 判斷是否手機版或寬度
    if(isMobile.any){
        // 獲取meta
        var metaTag=document.getElementsByTagName("meta");
        // 獲取meta長度
        var metaTagLength=metaTag.length;
        // 一開body加入手機板class
        document.body.className+=" bfm";
    
        // header判斷未登入
        function headerlogInStatus(){
            var headerHTML='<div class="bfm-header">'
                    +'<div class="logo"><a href="/"></a></div>'
                    +'<div class="burger"></div>'
                    +'</div>';
            return headerHTML;
        }

        // 選單內的標題
        function menuaTag(image,txt,href,clas){
            var Goto=goto || false;
            var a=document.createElement("a");
            var img=document.createElement("img");
            var span=document.createElement("span");
            a.className=clas;
            if(href){
                a.href=href;
            }
            img.src=image;
            span.textContent=txt;
            
            a.appendChild(img);
            a.appendChild(span);
            return a;
        }

        // 創建選單
        var mainmenuHTML=document.createElement("div");
        mainmenuHTML.className="bfm-mainmenu";
        var fragment=document.createDocumentFragment();
        for(var i=0;i<mainmenuContent.length;i++){
            var image=mainmenuContent[i].img;
            var txt=mainmenuContent[i].txt;
            var href=mainmenuContent[i].href;
            var clas=mainmenuContent[i].class
            var goto=mainmenuContent[i].goto;
            fragment.appendChild(menuaTag(image,txt,href,clas));
        }
        // 放入已設定好的選單
        mainmenuHTML.appendChild(fragment)

        // 創建 淡黑色背景
        var modalHTML=document.createElement("div");
        modalHTML.className="bfm-modal";
        modalHTML.style.display="none";

        // body插入 選單
        document.body.appendChild(mainmenuHTML);
        // body插入 淡黑色背景
        document.body.appendChild(modalHTML);
        // body最底部插入 header
        document.body.insertAdjacentHTML('afterBegin', headerlogInStatus());

        // 獲取漢堡
        var burgetBtn=document.querySelector(".bfm-header .burger");
        // 獲取淡黑色背景
        var modal=document.querySelector(".bfm-modal");
        // 獲取選單
        var mainmenu=document.querySelector(".bfm-mainmenu");

        // 點漢堡圖標時，選單滑入
        burgetBtn.addEventListener("click",function(){
            document.documentElement.style.overflow="hidden";
            // 淡黑色背景漸入
            fadeIn(modal)
            // 選單滑入
            moveIn(mainmenu);
        })

        // 點淡黑色背景時
        modal.addEventListener("click",function(){
            document.documentElement.style.overflow="auto";
            // 淡黑色背景漸出
            fadeOut(modal)
            // 選單滑出
            moveOut(mainmenu);
        })
    }

})