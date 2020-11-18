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

// 繼續遊戲 事件
$("body").on("click",".gamepause-btn__holdgame",function(){
	$.gbox.close();
	timeStart();
	playMusicBg()
})
// 重新開始 事件
$("body").on("click",".gamepause-btn__restart",function(){
	$.gbox.close();
	restart()
})

// $.gbox.open(gamePauseHTMLRender(),ingameObj);

// =============================================================================

var canvas={};
var scale = (window.innerWidth / 768)
var scalePadding = scale * 38 * 2;
var scalePadding2 = scale * 38;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.itemWidth = 669*scale;

var krArr=[];
var canvasW = canvas.itemWidth;
var canvasH = canvas.height;
// 預設數量
var initCount=12;
var itemW=215*scale;
var itemH=149*scale;
var itemCol=3;
var colWidth=canvasW/itemCol;
var itemPadding=(colWidth-itemW)/2;
var itemOffsetLeft=colWidth;
var itemOffsetTop=itemH;
var headDiv="";
var timer=null;
// 預設時間
var gameTime=30;
var speedY=0;
var jumpStatus=false;
var jumpControl=false;
var jumpCount=0;
var tempY=0;

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
// 初始化高度
$(".game").height(window.innerHeight)

// n20按鈕事件
var oBtn=document.querySelectorAll(".game-btn__n20");
for(var i=0;i<oBtn.length;i++){
	oBtn[i].addEventListener("click",function(){
		var index=this.dataset.index;
		updateKR(index)
	})
}

// 暫停按鈕事件
document.getElementById("gamepause").addEventListener("click",function(){
	timeStop()
	$.gbox.open(gamePauseHTMLRender(),ingameObj);
})

// 播放背景音樂
function playMusicBg(){
	bgMusic.play()
}

// 停止背景音樂
function stopMusicBg(){
	bgMusic.pause()
}

// 時間開始跟結束
function timeStart(){
	timer=setInterval(function(){
		gameTime--;
		// 當時間結束時
		if(gameTime <= 0){
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
}

// 計算總分 並回傳分數
function scoreTotal(){
	return scoreArr.reduce(function(p,n){
		return p+n.point
	},0)
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

// 圖片Canvas
let Application = PIXI.Application;
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
let Container = PIXI.Container;

let app = new Application({
	width: canvas.width,
	height: canvas.height,
	transparent: true
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";
document.body.appendChild(app.view);

loader
	.add([
		{name:"bg",url:"images/game-bg.jpg"},
		{name: "blue",url: "images/blue.png"},
		{name: "yellow",url: "images/yellow.png"},
		{name: "red",url: "images/red.png"},
		{name: "green",url: "images/green.png"},
		{name: "pink",url: "images/pink.png"}
	])
	.load(setup);

let head,state,gameScene,gameHead,heads=[];

// canvas初始化
function setup() {
	initKR();
	gameScene=new Container();
	app.stage.addChild(gameScene);

	let bg = new Sprite(
		resources.bg.texture
	);
	gameScene.addChild(bg);
	gameScene.width=canvas.width;
	gameScene.height=canvas.height;

	gameHead=new Container();
	app.stage.addChild(gameHead);

	gameHead.width=canvas.itemWidth;
	gameHead.y=-$(".game-btn__n20").height()/2;
	gameHead.x=50*scale;
	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				head = new Sprite(resources.pink.texture);
				head.width=itemW;
				head.height=itemH;
				head.x=krArr[i][j].x;
				head.y=krArr[i][j].y;

				heads.push(head);

				gameHead.addChild(head);
			}
		}
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
	$("#canvas").html("")
	for (var i = 0; i < initCount; i++) {
		addKR(i)
	}
	countDown();
	btnCurr()
}

// 增加KR
function addKR(z,action) {
	var kr = Array.from(Array(3), x => false);
	var r = Math.floor(Math.random() * 3);
	var itemX = (r * itemOffsetLeft) + itemPadding;
	var itemY = canvasH - (itemOffsetTop * z) - itemH - 60;
	kr[r] = {
		x: itemX,
		y: itemY
	};
	kr[r].shoot="pink";
	kr[r].point=500;
	shoot++;
	if(action){
		if(shoot <= 50){
			kr[r].shoot="pink";
			kr[r].point=500;
			head = new Sprite(resources.pink.texture);
		}
		if(shoot > 50){
			kr[r].shoot="yellow";
			kr[r].point=1000;
			head = new Sprite(resources.yellow.texture);
		}
		if(shoot > 100){
			kr[r].shoot="blue";
			kr[r].point=2000;
			head = new Sprite(resources.blue.texture);
		}
		if(shoot > 150){
			kr[r].shoot="green";
			kr[r].point=4000;
			head = new Sprite(resources.green.texture);
		}
		if(shoot > 200){
			kr[r].shoot="red";
			kr[r].point=8000;
			head = new Sprite(resources.red.texture);
		}
		
		head.width=itemW;
		head.height=itemH;
		head.x=kr[r].x;
		head.y=kr[r].y;

		heads.push(head);

		gameHead.addChild(head);
		
	}
	krArr.push(kr)
}

// 全部移動和增加新的
function updateKR(t) {
	if (krArr[0][t]) {
		// 成功時
		touchStatus.success++;
		delKR(krArr[0][t])
		heads.forEach(function(head){
			head.y+=itemH;
		})
		if (krArr.length < (initCount)) {
			addKR(krArr.length,"add")
		}
		btnCurr()
	} else {
		// 失敗時
		touchStatus.faild++;
		if(!jumpControl){
			jumpControl=true;
			jumpCount=0;
			tempY=heads[0].y;
			gameLoop();
		}
	}
}

// 按錯按鈕跳一下
function gameLoop() {
	if(jumpControl){
		if(speedY > 25 || jumpStatus){
			speedY-=3;
			if(speedY < 0){
				jumpStatus=false;
				jumpCount=1;
				speedY=0;
				jumpControl=false;
			}
		}else{
			speedY+=3;
			if(speedY > 25){
				jumpStatus=true
			}
		}
		heads[0].y=tempY
	}
	heads[0].y -= speedY;

	if(jumpCount != 1){
		requestAnimationFrame(gameLoop);
	}
}

// 刪除KR
function delKR(d){
	scoreArr.push(d);
	krArr = krArr.slice(1)
	gameHead.removeChild(heads[0]);
	heads=heads.slice(1)
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
	if(heads){
		heads.forEach(function(v){
			gameHead.removeChild(v);
		})
		heads=[];
		for(var i=0;i<krArr.length;i++){
			for(var j=0;j<krArr[i].length;j++){
				if(krArr[i][j]){
					head = new Sprite(resources.pink.texture);
					head.width=itemW;
					head.height=itemH;
					head.x=krArr[i][j].x;
					head.y=krArr[i][j].y;
	
					heads.push(head);
	
					gameHead.addChild(head);
				}
			}
		}
	}
}


window.onresize=function(){
	var w=window.innerWidth;
	var h=window.innerHeight;
	
	app.renderer.resize(w,h)
}