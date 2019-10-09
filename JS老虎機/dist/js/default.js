var run3D = false
var trigger = null
var active = false
var disabled = false
var openResultList=false;
var resultList=[];
var result=[];

var isRunning=false;
var currentDegArr=[];
var targetDegArr=[];
var giftsDeg=[];

var configs = [
    {
        style: 'gift-style',
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 4000,
        fontSize: 150,
        height: 200,
        width: 200
    },
    {
        style: 'gift-style',
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 5000,
        fontSize: 150,
        height: 200,
        width: 200
    },
    {
        style: 'gift-style',
        gifts: Array.from(new Array(10), (val, index) => {
            return {type: 'text', name: index}
        }),
        duration: 6000,
        fontSize: 150,
        height: 200,
        width: 200
    }
];

var GiftStr=`
    <div class="gift-container flat" style="--duration:{{duration}}ms;--fontSize:{{fontSize}}px;--width:{{width}}px;--height:{{height}}px;--currentDeg:0deg;">
        {{GiftInnerHTML}}
    </div>
`;
var GiftHTML='';
var GiftInnerStr=`
<div class="gift gift-style" style="transform: rotateX({{rotateX}}) translateZ(307px)">
    {{name}}
</div>
`;
var GiftInnerHTML='';

for(var i=0;i<configs.length;i++){
    for(var j=0;j<configs[i].gifts.length;j++){
        var rotateX=rotate(configs[i])*j;
        GiftInnerHTML+=GiftInnerStr.replace("{{rotateX}}",rotateX+'deg')
                            .replace("{{name}}",configs[i].gifts[j].name)
    }
    GiftHTML+=GiftStr.replace("{{duration}}",configs[i].duration)
                    .replace("{{fontSize}}",configs[i].fontSize)
                    .replace("{{width}}",configs[i].width)
                    .replace("{{height}}",configs[i].height)
                    .replace("{{GiftInnerHTML}}",GiftInnerHTML)
}

$('.container').prepend(GiftHTML);

function turn(){
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
function handlerClass(active,disabled){
    active?$('.handler').addClass("active"):$('.handler').removeClass("active")
    disabled?$('.handler').addClass("disabled"):$('.handler').removeClass("disabled")
}
function isFinished(val){
    var autoTurnList=$('.autoTurn');
    result.push(val);
    disabled=false;
    setTimeout(function(){
        targetDegArr=[];
        handlerClass(active,disabled);
    },6200)

    if(autoTurnList.length === 1){
        resultList.push(result);
        result=[];
    }
}

// computed
function displayType(config){
    return config.run3D? 'three-dimension' : 'flat';
}
function rotate(config){
    return 360/config.gifts.length;
}
function translateZ(config){
    return (config.height / 2) / Math.tan((rotate / 2 / 180) * Math.PI)
}

function autoTurn(i){
    let randomDeg=(Math.random() * 360) + (360 * 5);

    randomDeg -= randomDeg % rotate(configs[0]);
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

function handleisRunning(runing,i){
    if(runing){
        setTimeout(function(){
            autoTurnStop(i)
        },configs[i].duration+200)
    }
}

function autoTurnClass(runing){
    runing?$('.gift-container').addClass('autoTurn'):""
}

function autoTurnStop(i){
    var currentDeg=targetDegArr[i]%360;
    $('.gift-container').eq(i).css("--currentDeg","-"+currentDeg+"deg")
    $('.gift-container').eq(i).removeClass('autoTurn')
    var gitName=null;
    // rotate/2
    var endDeg=currentDeg+(rotate(configs[0])/2);
    // configs[i].
    isRunning=false;
    autoTurnClass(isRunning)
    isFinished()
}

// function logGiftsDeg(){
//     for(var i=0;configs.length;i++){
//         for(var j=0;configs[i].gifts.length;j++){
//             giftsDeg[j]={
//                 from:
//             }
//         }
//     }
// }

$('.ball').on('click',function(){
    if(!disabled){
        turn()
    }
})

