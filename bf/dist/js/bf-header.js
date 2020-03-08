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
            el.style.transform='translateX('+0+'%)';
        })()
    }
    function moveLeft(el){
        (function move(){
            el.style.transform='translateX('+100+'%)';
        })()
    }

    var winW=window.innerWidth;
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

    if(winW <= 750 || isMobile ()){
        var metaTag=document.getElementsByTagName("meta");
        var metaTagLength=metaTag.length;
        document.body.className+=" bfm";

        for(var i=0;i<metaTagLength;i++){
            if(metaTag[i].getAttribute("name") == "viewport"){
                metaTag[i].content="width=750,user-scalable=0";
            }
        }
    
        function headerlogInStatus(){
            var status=document.querySelector(".account > span").textContent;
            var statusHTML="";
            
            if(status == '未登入'){
                statusHTML='<div class="logInStatus" onclick="Goto();">登入</div>';
            }else if(status != '未登入'){
                statusHTML=`
                <div class="points">
                    <span id="RemainPoint">30</span>點
                </div>
                <div class="logInStatus" onclick="location.href='/bflogin/Logout';">登出</div>
                `
            }
            var headerHTML='<div class="bfm-header">'
                    +'<div class="logo"><a href="/"></a></div>'
                    +'<div class="burger"></div>'
                    +'<div class="dashboard">'+statusHTML+'</div>'
                    +'</div>';
            return headerHTML;
        }
        
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
        document.body.appendChild(mainmenuHTML);
        document.body.insertAdjacentHTML('afterBegin', headerlogInStatus());

        var burgetBtn=document.querySelector(".bfm-header .burger");
        var modalHTML=document.createElement("div");
        modalHTML.className="bfm-modal";
        modalHTML.style.display="block";

        burgetBtn.addEventListener("click",function(){
            document.body.appendChild(modalHTML);
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