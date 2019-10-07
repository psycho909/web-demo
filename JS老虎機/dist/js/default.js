var run3D = false
var trigger = null
var active = false
var disabled = false
var openResultList=false;
var resultList=[];
var result=[];

var isRunning=false;
var currentDeg=0;
var targetDeg=0;
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

var GiftsHTML=`
    <div class="gift-container">
        {{GiftInnerHTML}}
    </div>
`;
var GiftInnerHTML=`
<div class="gift gift-style" style="transform: rotateX({{rotate}}) translateZ({{translateZ}})">
    {{name}}
</div>
`;

function turn(){
    active=true;
    setTimeout(function(){
        active=false;
    },500)
    disabled=true;
    trigger=new Date();
}
function isFinished(val){
    var autoTurnList=$('.autoTurn');
    result.push(val);
    if(autoTurnList.length === 1){
        disabled=false;
        resultList.push(result);
        result=[];
    }
}

// computed
function displayType(){
    return configs.run3D? 'three-dimension' : 'flat';
}
function rotate(){
    return 360/configs.gifts.length;
}
function translateZ(){
    return (configs.height / 2) / Math.tan((rotate / 2 / 180) * Math.PI)
}