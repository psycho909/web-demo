var SlotGame=function (content,callback){
    this.active = false
    this.disabled = false
    this.rotate=0;
    this.isRunning=false;
    this.targetDegArr=[];
    this.bingoArr=[];
    this.configs = [
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
}
SlotGame.prototype.setRotate=function(){
    this.rotate = 360/this.configs[0].gifts.length;
}
SlotGame.prototype.init=function(){
    this.setRotate();
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

    for(var i=0;i<this.configs.length;i++){
        for(var j=0;j<this.configs[i].gifts.length;j++){
            var rotateX=this.rotate*j;
            GiftInnerHTML+=GiftInnerStr.replace("{{rotateX}}",rotateX+'deg')
                                .replace("{{name}}",this.configs[i].gifts[j].name)
        }
        GiftHTML+=GiftStr.replace("{{duration}}",this.configs[i].duration)
                        .replace("{{fontSize}}",this.configs[i].fontSize)
                        .replace("{{width}}",this.configs[i].width)
                        .replace("{{height}}",this.configs[i].height)
                        .replace("{{GiftInnerHTML}}",GiftInnerHTML)
    }

    $('.container').prepend(GiftHTML);
}
SlotGame.prototype.turn=function(){
    var _this=this;
    this.active=true;
    setTimeout(function(){
        _this.active=false;
        _this.handlerClass()
    },500)
    this.disabled=true;
    this.handlerClass()
    for(var i=0;i<this.configs.length;i++){
        this.autoTurn(i)
    }
}
SlotGame.prototype.handlerClass=function(){
    this.active?$('.handler').addClass("active"):$('.handler').removeClass("active")
    this.disabled?$('.handler').addClass("disabled"):$('.handler').removeClass("disabled")
}
SlotGame.prototype.isFinished=function(){
    var _this=this;
    var autoTurnList=$('.autoTurn');
    this.disabled=false;
    this.targetDegArr=[];
    this.handlerClass();
    var bingoCheck=this.bingoArr.every(function(v,i){
        return _this.bingoArr[0] == v
    })
    if(bingoCheck){
        console.log("中獎")
    }else{
        console.log("沒有中獎")
    }
}

SlotGame.prototype.autoTurn=function(i){
    // let randomDeg=(Math.random() * 360) + (360 * 5);
    let randomDeg=this.bingoArr[i] + (360 * 5);

    randomDeg -= randomDeg % this.rotate;
    var targetDeg=randomDeg;
    this.targetDegArr.push(targetDeg)
    $('.gift-container').eq(i).css("--targetDeg","-"+targetDeg+"deg")
    this.isRunning=true;
    this.autoTurnClass()
    this.handleisRunning(i)
}

SlotGame.prototype.handleisRunning=function(i){
    var _this=this;
    if(this.isRunning){
        setTimeout(function(){
            _this.autoTurnStop(i)
        },this.configs[i].duration+200)
    }
}

SlotGame.prototype.autoTurnClass=function(){
    this.isRunning?$('.gift-container').addClass('autoTurn'):""
}

SlotGame.prototype.autoTurnStop=function(i){
    var currentDeg=this.targetDegArr[i]%360;
    $('.gift-container').eq(i).css("--currentDeg","-"+currentDeg+"deg")
    $('.gift-container').eq(i).removeClass('autoTurn')
    this.isRunning=false;
    this.autoTurnClass()
    if(i == this.configs.length-1){
        this.isFinished()
    }
}
SlotGame.prototype.setBingoArr=function(arr){
    this.bingoArr=arr;
}

var slotGame=new SlotGame()
slotGame.init();

$('.ball').on('click',function(){
    if(!slotGame.disabled){
        slotGame.setBingoArr([36,72,108])
        slotGame.turn()
    }
})

