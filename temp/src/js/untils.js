var form=document.getElementById("form");
var name=form["name"];
var phone=form["phone"];
var email=form["email"];
var user={
    name:name,
    phone:phone,
    email:email
}
function validName(user) {
    var spanElement=document.getElementById("invalid-"+user.name.name)
    if(user.name.value.trim().length > 0){
        if(spanElement){
            user.name.parentElement.removeChild(spanElement)
        }
        return true
    }else{
        if(spanElement){
            return false
        }
        var span=document.createElement("span");
        span.textContent="請輸入姓名";
        span.id="invalid-"+user.name.name;
        user.name.insertAdjacentElement("afterEnd",span)
        return false
    }
}

function validPhone(user) {
    var v = /^(09)\d{8}$/;
    var spanElement=document.getElementById("invalid-"+user.phone.name)
    if(v.test(user.phone.value)){
        if(spanElement){
            user.phone.parentElement.removeChild(spanElement)
        }
        return true
    }else{
        if(spanElement){
            return false
        }
        var span=document.createElement("span");
        span.textContent="請確認手機號碼";
        span.id="invalid-"+user.phone.name;
        user.phone.insertAdjacentElement("afterEnd",span)
        return false
    }
}

function validEmail(user) {
    var v = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var spanElement=document.getElementById("invalid-"+user.email.name)
    if(v.test(user.email.value)){
        if(spanElement){
            user.email.parentElement.removeChild(spanElement)
        }
        return true
    }else{
        if(spanElement){
            return false
        }
        var span=document.createElement("span");
        span.textContent="請確認E-mail";
        span.id="invalid-"+user.email.name;
        user.email.insertAdjacentElement("afterEnd",span)
        return false
    }
}

function validate(obj, fn) {
    for (var i = 0; i < fn.length; i++) {
        if (fn[i](obj) === false) {
            return false
        }
    }
    return true;
}
console.log(validate(user, [validName, validPhone, validEmail]))

// 防止連續點擊
function debounce(fn,interval){
    var timer=null;
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(function(){
            fn.apply(this,arguments)
            timer=null;
        },interval)
    }
}

// 可以連續點擊但會隔幾秒才送出
function throttle(fn,interval){
    var timer=null;
    return function(){
        if(timer){
            timer=null;
        }
        timer=setInterval(function(){
            fn.apply(this,arguments)
            timer=null;
        }, interval);
    }
}

// 判斷H5
function checkH5(){
    var useragent = navigator.userAgent; 
    var reg=/BeaGo/gi;
    if(useragent.indexOf("BeaGo") > -1 || reg.test(useragent)){
        return true;
    }
}

// 獲取網址 ?sec=part2
function getQuery(){
	var query=location.search.slice(1);
	var queryArr=query.split("&");
	var queryObj={};
	queryArr.forEach(function(v,i){
		queryObj[v.split("=")[0]]=v.split("=")[1]
	})
	return queryObj
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getTranslate3d (el) {
    var values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return [];
    }
    return values[1].split(/,\s?/g);
}

var loaddingTimer;
function loadding(load){
    var body=document.querySelector("body");
    if(!load){
        clearInterval(loaddingTimer)
        body.removeChild(document.querySelector(".loadding-module"))
        return false;
    }
    var loaddingHTML='<div class="loadding-module"><div class="loadding"></div></div>';
    body.insertAdjacentHTML("afterbegin",loaddingHTML);

    var i=0;
    loaddingTimer=setInterval(function(){
        i++;
        document.querySelector(".loadding").style.cssText="-ms-transform:rotate("+i+"deg);-webkit-transform:rotate("+i+"deg);transform:rotate("+i+"deg);";
    },5)
}

// 確認Array
function checkArray(arr){
    return ({}).toString.call(arr).slice(8,-1) == "Array";
}
function checkObject(obj){
    return ({}).toString.call(obj).slice(8,-1) == "Object";
}

function setCookieValue(name){
    document.cookie=name+"=true";
}

function getCookieValue(name){
    var nameString=name+"=";
    var value=document.cookie.split(";").filter(function(item){
        return item.indexOf(nameString) > -1
    })
    if(value.length){
        return value[0].trim().substring(nameString.length,value[0].length)
    }else{
        return "";
    }
}

function Ajax(){
    var url="";
    var data={

    };
    $.ajax({
        url:url,
        data:data,
        success:function(data){

        },
        error:function(){

        }
    })
}

// 錯誤訊息
function ErrorText(text,url){
    $.gbox.open("<div class='error-text'>"+text+"</div>",{
        addClass:"default",
        hasCloseBtn: true,
        hasActionBtn: false,
        afterOpen:function(){
            $(".gbox").prepend("<div class='layer-frame'></div>")
            setTimeout(function(){
                $(".gbox-close").addClass("error-close")
            }, 0);
        },
        afterClose:function(){
            if(url){
                var href=location.href;
                var path=location.pathname;
                var pathSplit=location.pathname.split("/");
                var len=pathSplit.length;
                pathSplit[len-1]=url;
                var newPath=pathSplit.join("/");
                location.href=href.replace(path,newPath)
            }
        }
    })
}