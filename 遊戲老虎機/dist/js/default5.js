function SlotGame(target){
    this.active = false
    this.disabled = false
    this.isRunning=false;
    this.rotate=0;
    this.callback;
    this.targetDegArr=[];
    this.bingoArr=[];
    this.error;
    this.success;
    this.configs = [
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
    ];
}
SlotGame.prototype.init=function(){
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
    return this;
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
    return this;
}
SlotGame.prototype.handlerClass=function(){
    this.active?$('.handler').addClass("active"):$('.handler').removeClass("active")
    this.disabled?$('.handler').addClass("disabled"):$('.handler').removeClass("disabled")
}
SlotGame.prototype.isFinished=function(){
    var _this=this;
    this.disabled=false;
    this.targetDegArr=[];
    this.handlerClass();
    var check=this.bingoArr.every(function(v,i){
        return _this.bingoArr[0] == v;
    })
    if(check){
        if(this.callback){
            this.callback()
            return this;
        }
        if(this.success){
            this.success()
            return this;
        }
    }else{
        if(this.error){
            this.error()
            return this;
        }
    }
} 

// computed
SlotGame.prototype.setError=function(fn){
    this.error=fn;
    return this;
}
SlotGame.prototype.setSuccess=function(fn){
    this.success=fn;
    return this;
}
SlotGame.prototype.setCallback=function(fn){
    this.callback=fn;
    return this;
}
SlotGame.prototype.setBingoArr=function(arr){
    this.bingoArr=arr;
    return this;
}
SlotGame.prototype.setRotate=function(){
    this.rotate=360/this.configs[0].gifts.length;
    return this;
}
SlotGame.prototype.translateZ=function(config){
    return (config.height / 2) / Math.tan((rotate / 2 / 180) * Math.PI)
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
var slotGame=new SlotGame();
slotGame.setRotate().init().setBingoArr([0,0,0])

$('.ball').on('click',function(){
    if(!slotGame.disabled){
        slotGame.turn().setCallback(function(){
            console.log("hello")
        })
    }
})

