// 遊戲畫面_暫停
var ingameObj={
    addClass:"ingame",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterClose:function(){
		$.gbox.close();
		timeStart();
    }
}

function gamePauseHTMLRender(){
	var gamePauseHTML=
	`<div class="gamepause-title btn--yellow">Menu</div>
	<div class="gamepause-btn-box">
		<a class="gamepause-btn__holdgame btn--blue" href="javascript:;">繼續遊戲</a>
		<a class="gamepause-btn__restart btn--blue" href="javascript:;">重新開始</a>
		<a class="gamepause-btn__backhome btn--blue" href="index.html">回到首頁</a>
	</div>
	`;
	return gamePauseHTML;
}

$("body").on("click",".gamepause-btn__holdgame",function(){
	$.gbox.close();
	timeStart();
})
$("body").on("click",".gamepause-btn__restart",function(){
	$.gbox.close();
	restart()
})
$("body").on("click",".gamepause-btn__backhome",function(){

})
// $.gbox.open(gamePauseHTMLRender(),ingameObj);

// =============================================================================

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var scale=(window.innerWidth/768)
var scalePadding=scale*38*2;
canvas.width=window.innerWidth-scalePadding;
canvas.height=window.innerHeight-$(".game-btn-box").outerHeight(true);

var krArr=[];
var canvasW=canvas.width;
var canvasH=canvas.height;
// 預設數量
var initCount=12;
var itemW=215*scale;
var itemH=149*scale;
var itemCol=3;
var colWidth=canvasW/itemCol;
var itemPadding=(colWidth-itemW)/2;
var itemOffsetLeft=colWidth;
var itemOffsetTop=itemH;
var timer=null;
// 預設時間
var gameTime=30;
var imgs=["images/pink.png","images/yellow.png","images/blue.png","images/green.png","images/red.png"];
var useImg=imgs[0];

// 出現隻數
var shoot=0;
// 分數統計
var score=0;
var scoreArr=[];

// 計算成功失敗的狀態
// touchStatus.success 獲取成功的次數
// touchStatus.faild 或失敗的次數
var touchStatus={
	success:0,
	faild:0
}

$(".game").height(window.innerHeight)

// n20按鈕事件
var oBtn=document.querySelectorAll(".game-btn__n20");
for(var i=0;i<oBtn.length;i++){
	oBtn[i].addEventListener("touchstart",function(){
		var index=this.dataset.index;
		updateKR(index)
	})
}

var myGameArea={
	start:function(){
		this.interval = setInterval(updateGameArea, 20);
	},
	stop:function(){
		clearInterval(this.interval)
	},
	clear:function(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
	}
}

// 聲音讀取
Howler.autoUnlock = true;
var bgMusic = new Howl({
	src: ['audio/music.mp3'],
	loop:true,
	volume:0.2,
	onplayerror: function() {
		bgMusic.once('unlock', function() {
			bgMusic.play();
		});
	},
	onload:function(){
		bgMusic.once('unlock', function() {
			bgMusic.play();
		});
	}
});
var attack = new Howl({
	src: ['audio/attack.mp3']
});

initKR();
startGame();

// 暫停按鈕事件
document.getElementById("gamepause").addEventListener("click",function(){
	timeStop()
	$.gbox.open(gamePauseHTMLRender(),ingameObj);
})

function timeStart(){
	timer=setInterval(function(){
		gameTime--;
		if(gameTime == 0){
			clearInterval(timer)
			document.getElementById("game-time").innerHTML=0;
			$("#app").prepend("<div class='game-stopbg'></div>")
			replacePage()
		}
		document.getElementById("game-time").innerHTML=gameTime
	},1000)
}

// 重要
// 主要修改這個function
// 在時間倒數完後會使用這個function
// 遊戲結束跳轉頁面
function replacePage(){
	// 放入程式
	// 獲取 scoreTotal() 分數
	// 記錄完資料後再切換到結果頁跳出總分
	// .............................
	// location.href="result.html";
	alert(scoreTotal())
}

// 計算總分 並回傳分數
function scoreTotal(){
	var test=[];
	for(var i=0;i<scoreArr.length;i++){
		test.push(scoreArr[i].filter(v=>v)[0])
	}

	return test.filter(function(v){
		return v;
	}).reduce(function(p,n){
		return p+n.point
	},0)
}


function component(width, height, img, x, y) {
	this.image = new Image();
	this.image.src = img;
	this.width = width;
	this.height = height;
	this.speedY = 0;
	this.jumpStatus=false;
	this.jumpCount=0;
	this.jumpControl=false;
	this.x = x;
	this.y = y;
	this.tempY=0;
	this.update = function() {
		ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
	};
	this.jumpMove=function(){
		this.jumpControl=true;
		this.tempY=this.y;
	}
	this.newPos = function() {
		if(this.jumpControl){
			if(this.speedY > 25 || this.jumpStatus){
				this.speedY-=3;
				if(this.speedY < 0){
					this.jumpStatus=false;
					this.jumpCount=1;
					this.speedY=0;
					this.jumpControl=false;
				}
			}else{
				this.speedY+=3;
				if(this.speedY > 25){
					this.jumpStatus=true
				}
			}
			this.y=this.tempY
		}
		this.y = this.y-this.speedY;        
	}
}

// 時間強制停止
function timeStop(){
	clearInterval(timer)
	stopMusicBg()
}

// 初始化
function initKR(){
	// 紀錄成功失敗狀態
	touchStatus={
		success:0,
		faild:0
	}

	krArr=[];
	gameTime=30;
	shoot=0;
	score=0;
	scoreArr=[];
	cd=3;
	$("#game-time").html(gameTime)
	for(var i=0;i<initCount;i++){
		addKR(i)
	}
	countDown();
	btnCurr()
	bgMusic.play()
}
function addKR(z,action){
	var kr=Array.from(Array(3),x=>false);
	var r=Math.floor(Math.random()*3);
	var itemX=(r*itemOffsetLeft)+itemPadding;
	var itemY=canvasH-(itemOffsetTop*z)-itemH;
	kr[r]={
		x:itemX,
		y:itemY,
	};
	kr[r].shoot="pink";
	kr[r].point=500;
	shoot++;
	if(action){
		if(shoot <= 50){
			kr[r].shoot="pink";
			kr[r].point=500;
			useImg=imgs[0]
		}
		if(shoot > 50){
			kr[r].shoot="yellow";
			kr[r].point=1000;
			useImg=imgs[1]
		}
		if(shoot > 100){
			kr[r].shoot="blue";
			kr[r].point=2000;
			useImg=imgs[2]
		}
		if(shoot > 150){
			kr[r].shoot="green";
			kr[r].point=4000;
			useImg=imgs[3]
		}
		if(shoot > 200){
			kr[r].shoot="red";
			kr[r].point=8000;
			useImg=imgs[4]
		}
		
	}
	kr[r].head=new component(itemW, itemH, useImg, itemX, itemY)
	krArr.push(kr)
}

function updateGameArea(){
	myGameArea.clear();
	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				krArr[i][j].head.newPos();
				krArr[i][j].head.update();
			}
		}
	}
}

function startGame(){
	myGameArea.start();
}


function updateKR(t){
	// if(krArr[0][t]){
	// 	// 成功時
	// 	touchStatus.success++;
	// 	delKR()
	// 	if(krArr.length < (initCount)){
	// 		addKR(krArr.length+1,"add")
	// 	}
	// 	for(var i=0;i<krArr.length;i++){
	// 		for(var j=0;j<krArr[i].length;j++){
	// 			if(krArr[i][j]){
	// 				krArr[i][j].head.y+=itemH
	// 			}
	// 		}
	// 	}
	// 	btnCurr()
	// }else{
	// 	// 失敗時
	// 	touchStatus.faild++;
	// 	for(var i=0;i<krArr[0].length;i++){
	// 		if(krArr[0][i] && !krArr[0][i].head.jumpControl){
	// 			krArr[0][i].head.jumpMove()
	// 		}
	// 	}
		
	// }
	touchStatus.success++;
	delKR(krArr[0])
	if(krArr.length < (initCount)){
		addKR(krArr.length+1,"add")
	}
	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				krArr[i][j].head.y+=itemH
			}
		}
	}
	btnCurr()
}

// 刪除KR
function delKR(d){
	scoreArr.push(d);
	score++;
	krArr=krArr.slice(1)
	attack.play()
}

// 倒數計時
function countDown(){
	if(!$(".game-cd").length){
		$("#app").prepend("<div class='game-cd game-cd3'></div>")
	}
	if(cd <= 0){
		$(".game-cd").remove()
		timeStart()
		return;
	}
	setTimeout(function(){
		cd--;
		$(".game-cd").attr("class","game-cd game-cd"+cd)
		countDown()
	}, 1000);
}

// 按鈕判斷噴火樣式
function btnCurr(){
	for(var i=0;i<krArr[0].length;i++){
		if(krArr[0][i]){
			$(".game-btn__n20").eq(i).addClass("curr")
		}else{
			$(".game-btn__n20").eq(i).removeClass("curr")
		}
	}
}

// 重新開始
function restart(){
	initKR();
	startGame();
}