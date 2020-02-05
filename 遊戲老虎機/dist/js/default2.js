var configs = [
    {
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 4000,
        fontSize: 150,
        height: 200,
        width: 200
    },
    {
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 5000,
        fontSize: 150,
        height: 200,
        width: 200
    },
    {
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 6000,
        fontSize: 150,
        height: 200,
        width: 200
    }
]
var game = (function() {
    var active = false
    var disabled = false
    var rotate=0;
    var isRunning = false
    var targetDegArr = []
    var config;

    var initHTML = function() {
        var GiftStr = `
        <div class="gift-container flat" style="--duration:{{duration}}ms;--fontSize:{{fontSize}}px;--width:{{width}}px;--height:{{height}}px;--currentDeg:0deg;">
            {{GiftInnerHTML}}
        </div>
        `;
            var GiftHTML = '';
            var GiftInnerStr = `
        <div class="gift gift-style" style="transform: rotateX({{rotateX}}) translateZ(307px)">
            {{name}}
        </div>
        `;
        var GiftInnerHTML = '';
        for (var i = 0; i < configs.length; i++) {
            for (var j = 0; j < configs[i].gifts.length; j++) {
                var rotateX = rotate * j
                GiftInnerHTML += GiftInnerStr.replace(
                    '{{rotateX}}',
                    rotateX + 'deg'
                ).replace('{{name}}', configs[i].gifts[j].name)
            }
            GiftHTML += GiftStr.replace('{{duration}}', configs[i].duration)
                .replace('{{fontSize}}', configs[i].fontSize)
                .replace('{{width}}', configs[i].width)
                .replace('{{height}}', configs[i].height)
                .replace('{{GiftInnerHTML}}', GiftInnerHTML)
        };
        $('.container').prepend(GiftHTML);
    }

    var setRotate=function (){
        rotate = 360/config[0].gifts.length;
    }

    var handlerClass=function (active,disabled){
        active?$('.handler').addClass("active"):$('.handler').removeClass("active")
        disabled?$('.handler').addClass("disabled"):$('.handler').removeClass("disabled")
    }

    
    var isFinished=function (){
        disabled=false;
        targetDegArr=[];
        handlerClass(active,disabled);
    }

    var autoTurn=function (i){
        let randomDeg=(Math.random() * 360) + (360 * 5);
    
        randomDeg -= randomDeg % rotate;
        var targetDeg=randomDeg;
        targetDegArr.push(targetDeg)
        // 取得隨機回潭角度
        var randomRollBackDeg=1;
        $('.gift-container').eq(i).css("--targetDeg","-"+targetDeg+"deg")
                                .css("--rollBackDeg",randomRollBackDeg)
        isRunning=true;
        autoTurnClass(isRunning)
        handleisRunning(isRunning,i)
    }
    
    var handleisRunning=function (runing,i){
        if(runing){
            setTimeout(function(){
                autoTurnStop(i)
            },configs[i].duration+200)
        }
    }
    
    var autoTurnClass=function (runing){
        runing?$('.gift-container').addClass('autoTurn'):""
    }
    
    var autoTurnStop = function (i){
        var currentDeg=targetDegArr[i]%360;
        $('.gift-container').eq(i).css("--currentDeg","-"+currentDeg+"deg")
        $('.gift-container').eq(i).removeClass('autoTurn')
        var gitName=null;
        var endDeg=currentDeg+(rotate/2);
        isRunning=false;
        autoTurnClass(isRunning)
        if(i == config.length-1){
            isFinished()
        }
        
    }

    var turn=function (){
        active=true;
        setTimeout(function(){
            active=false;
            handlerClass(active,disabled)
        },500)
        disabled=true;
        trigger=new Date();
        handlerClass(active,disabled)
    
        for(var i=0;i<configs.length;i++){
            autoTurn(i)
        }
    }
    var init = function(configs) {
        config=configs;
        setRotate();
        initHTML();
        $('.ball').on('click',function(){
            if(!disabled){
                turn()
            }
        })
    }

    return {
        init
    }
})()

game.init(configs)
