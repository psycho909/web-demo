var game = (function() {
    var active = false
    var disabled = false
    var rotate=0;
    var isRunning = false
    var targetDegArr = []
    var bingoArr=[];
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
    var fn;

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
        rotate = 360/configs[0].gifts.length;
    }

    var handlerClass=function (active,disabled){
        active?$('.handler').addClass("active"):$('.handler').removeClass("active")
        disabled?$('.handler').addClass("disabled"):$('.handler').removeClass("disabled")
    }

    var isFinished=function (){
        var autoTurn=$(".autoTurn");
        disabled=false;
        targetDegArr=[];
        handlerClass(active,disabled);
        var bingoCheck=bingoArr.some(function(v,i){
            return bingoArr[0] == v
        })
        if(!autoTurn.length){
            fn();
            if(bingoCheck){
                console.log("中獎")
            }else{
                console.log("沒有中獎")
            }
        }
    }

    var autoTurn=function (i){
        // let randomDeg=(Math.random() * 360) + (360 * 5);
        let randomDeg=bingoArr[i] + (360 * 5);
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
        console.log(targetDegArr)
        var currentDeg=targetDegArr[i]%360;
        $('.gift-container').eq(i).css("--currentDeg","-"+currentDeg+"deg")
        $('.gift-container').eq(i).removeClass('autoTurn')
        // var gitName=null;
        // var endDeg=currentDeg+(rotate/2);
        isRunning=false;
        autoTurnClass(isRunning)
        if(i == configs.length-1){
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
        handlerClass(active,disabled)
    
        for(var i=0;i<configs.length;i++){
            autoTurn(i)
        }
    }
    var init = function(bingo,callback) {
        // config=configs;
        fn=callback;
        bingoArr=bingo;
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

// 0 1 2 3 4 5 6 7 8 9
var x=[0,36,72,108,144,180,216,252,288,324];

game.init([36,72,108],function(){
    console.log(123)
})
