// 遊戲畫面_暫停
var ingameObj={
    addClass:"ingame",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterClose:function(){
		$.gbox.close();
		timeStart();
		playMusicBg()
    }
}

function gamePauseHTMLRender(){
	var gamePauseHTML=
	`<div class="gamepause-title btn--yellow">Menu</div>
	<div class="gamepause-btn-box">
		<a class="gamepause-btn__holdgame btn--blue" href="javascript:;">繼續遊戲</a>
		<a class="gamepause-btn__restart btn--blue" href="javascript:;">重新開始</a>
		<a class="gamepause-btn__backhome btn--blue" href="index.aspx">回到首頁</a>
	</div>
	`;
	return gamePauseHTML;
}

// 繼續遊戲 事件
$("body").on("touchstart",".gamepause-btn__holdgame",function(){
	$.gbox.close();
	timeStart();
	playMusicBg()
})
// 重新開始 事件
$("body").on("touchstart",".gamepause-btn__restart",function(){
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
var initCount=1000;
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
var gameTime=10;
var speedY=0;
var jumpStatus=false;
var jumpControl=false;
var jumpCount=0;
var tempY=0;

// 出現隻數
var shoot=0;
// 分數統計
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


// 播放背景音樂
function playMusicBg(){
	bgMusic.play()
}

// 停止背景音樂
// 20201118 修改
function stopMusicBg(){
	bgMusic.stop()
}

// 暫停背景音樂
// 20201118 add
function pauseMusicBg(){
	bgMusic.pause()
}

// 時間開始跟結束
// 20201118 add
function timeStart(){
	timer=setInterval(function(){
		gameTime--;
		// 當時間結束時
		if(gameTime <= 0){
			clearInterval(timer)
			timeText.text=0;
			$("#app").prepend("<div class='game-stopbg'></div>")
			bgMusic.stop()
			replacePage()
		}
		timeText.text=gameTime;
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
	// resultPage()
}

// 沒破紀錄
function resultPage(){
	// 結束時結算頁面跳出 結束文字
	$(".end-text").addClass("show");
	// 一秒後跳出結算葉面
	setTimeout(function(){
		$(".result").addClass("show")
	},1200)
	// 結算分數
	$(".result-status__score").text(thu(scoreTotal()))
}

// 有破紀錄
function resultPageNew(){
	// 結束時結算頁面跳出 結束文字
	$(".end-text").addClass("show");
	// 一秒後跳出結算葉面
	setTimeout(function(){
		$(".result").addClass("show")
		$(".result-status-box").addClass("new")
	},1200)
	// 結算分數
	$(".result-status__score").text(thu(scoreTotal()))
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

function thu(point){
	var reg = /(?=(\B\d{3})+$)/g;
	var point=point+"";
	return point.replace(reg,",")
}

// 聲音讀取
Howler.autoUnlock = true;
var bgMusic = new Howl({
	src: ['audio/music.mp3'],
	loop:true,
	volume:0.1,
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
// 20201108 add
var jumb = new Howl({
	src: ['audio/jumb.mp3']
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
	transparent: true,
	antialias:true,
	resolution:1,
	roundPixels: true
});
app.renderer.view.style.position = "absolute";
app.renderer.view.width=window.innerWidth;
app.renderer.view.height=window.innerHeight;
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";
document.getElementById("app").appendChild(app.view);

loader
	.add([
		{name:"bg",url:"images/game-bg.jpg"},
		{name: "blue",url: "images/blue.png"},
		{name: "yellow",url: "images/yellow.png"},
		{name: "red",url: "images/red.png"},
		{name: "green",url: "images/green.png"},
		{name: "pink",url: "images/pink.png"},
		{name: "btnOff",url: "images/btn.png"},
		{name: "btnFire",url: "images/fire.png"},
		{name: "clock",url: "images/clock-bg.png"},
		{name: "pause",url: "images/pause.png"},
	])
	.load(setup);

let head,state,gameScene,gameHead=[],btnGroup=[],timeText;
var btnOff=PIXI.Texture.from('images/btn.png');
var btnFire=PIXI.Texture.from('images/fire.png');


// canvas初始化
// 20201118 修改
function setup() {
	initKR();
	var btnWidth=230;
	var btnHeight=244;

	gameScene=new PIXI.particles.ParticleContainer();
	app.stage.addChild(gameScene);

	let bg = new Sprite(
		resources.bg.texture
	);
	gameScene.addChild(bg);
	gameScene.width=768*scale;
	gameScene.height=1685*scale;

	gameHead=new Container;
	app.stage.addChild(gameHead);

	gameHead.width=canvas.itemWidth;
	gameHead.Height=1685*scale;
	gameHead.y=-(btnHeight*scale/2)-(10*scale);
	gameHead.x=50*scale;
	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				if(i < 50){
					head = new Sprite(resources.pink.texture);
				}
				if(i >= 50){
					head = new Sprite(resources.yellow.texture);
				}
				if(i >= 100){
					head = new Sprite(resources.blue.texture);
				}
				if(i >= 150){
					head = new Sprite(resources.green.texture);
				}
				if(i >= 200){
					head = new Sprite(resources.red.texture);
				}
				head.scale.set(scale,scale);
				head.x=krArr[i][j].x;
				head.y=krArr[i][j].y;
				gameHead.addChild(head);
			}
		}
	}

	var clock = new Sprite(
		resources.clock.texture
	);
	clock.x=scale*14;
	clock.y=scale*17;
	clock.scale.set(scale,scale);
	app.stage.addChild(clock);

	var textBg=new PIXI.Graphics();
	var textBgWidth=40*scale;
	textBg.beginFill("0xffffff");
	textBg.drawCircle(0,0,textBgWidth);
	textBg.x=textBgWidth+(28*scale);
	textBg.y=textBgWidth+(57*scale);
	textBg.endFill();
	
	timeText = new PIXI.Text(gameTime,{
		fontFamily: 'Arial',
		fontSize:45*scale,
		align:"center"
	});
	timeText.anchor.x=0.5
	timeText.anchor.y=0.5
	timeText.x = 0;
	timeText.y = 0;

	textBg.addChild(timeText)
	app.stage.addChild(textBg);
	
	var pause = new Sprite(
		resources.pause.texture
	);
	pause.buttonMode=true;
	pause.interactive=true;
	pause.x=654*scale;
	pause.y=46*scale;
	pause.scale.set(scale,scale);
	
	pause.on("tap",()=>{
		timeStop()
		$.gbox.open(gamePauseHTMLRender(),ingameObj);
	})
	app.stage.addChild(pause);

	for(var i=0;i<3;i++){
		var btn=new Sprite(btnOff); 
		btn.buttonMode=true;
		btn.interactive=true;
		// btn.x=(66*scale)+(211*scale*(i+1))-(btnWidth*scale/2)-(211*scale/2);
		btn.x=(36*scale)+btnWidth*scale*(i);
		btn.y=window.innerHeight-(btnHeight*scale)-(60*scale);
		// btn.scale.set(scale,scale);
		btn.width=btnWidth*scale;
		btn.height=btnHeight*scale;
		btnGroup.push(btn)
		app.stage.addChild(btnGroup[i]);
	}
	btnGroup[0].on("tap",()=>{
		updateKR(0)
	})
	btnGroup[1].on("tap",()=>{
		updateKR(1)
	})
	btnGroup[2].on("tap",()=>{
		updateKR(2)
	})
	countDown();
	btnCurr()
}


// 時間強制停止
// 20201118 修改
function timeStop(){
	clearInterval(timer)
	pauseMusicBg()
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
	scoreArr=[];
	cd=3;
	if(timeText){
		timeText.text=gameTime;
	}
	for (var i = 0; i < initCount; i++) {
		addKR(i)
	}
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

	if(z < 50){
		kr[r].shoot="pink";
		kr[r].point=500;
	}
	if(z >= 50){
		kr[r].shoot="yellow";
		kr[r].point=1000;
	}
	if(z >= 100){
		kr[r].shoot="blue";
		kr[r].point=2000;
	}
	if(z >= 150){
		kr[r].shoot="green";
		kr[r].point=4000;
	}
	if(z >= 200){
		kr[r].shoot="red";
		kr[r].point=8000;
	}
	if(action){
		kr[r].shoot="red";
		kr[r].point=8000;
		head = new Sprite(resources.red.texture);
		
		head.width=itemW;
		head.height=itemH;
		head.x=kr[r].x;
		head.y=kr[r].y;

		gameHead.addChild(head);
		
	}
	krArr.push(kr)
}

// 全部移動和增加新的
// 20201118 修改
function updateKR(t) {
	if (krArr[0][t]) {
		touchStatus.success++;
		delKR(krArr[0])
		gameHead.children.forEach(function(head){
			head.y+=itemH;
		})
		if (krArr.length < 12) {
			addKR(krArr.length,"add")
		}
		btnCurr()
	}else{
		// 失敗時
		touchStatus.faild++;
		if(!jumpControl){
			jumb.play()
			jumpControl=true;
			jumpCount=0;
			tempY=gameHead.children[shoot].y;
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
		gameHead.children[shoot].y=tempY
	}
	gameHead.children[shoot].y -= speedY;

	if(jumpCount != 1){
		requestAnimationFrame(gameLoop);
	}
}

// 刪除KR
function delKR(d){
	scoreArr.push(d);
	krArr = krArr.slice(1)
	gameHead.children[shoot].visible=false
	shoot++;
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
			btnGroup[i].texture=btnFire
		}else{
			btnGroup[i].texture=btnOff
		}
	}
}

// 重新開始
// 20201118 修改
function restart(){
	initKR();
	countDown();
	btnCurr();
	stopMusicBg()
	playMusicBg()
	for(var i=gameHead.children.length-1;i>=0;i--){
		gameHead.removeChild(gameHead.children[i]);
	}

	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				if(i <= 50){
					head = new Sprite(resources.pink.texture);
				}
				if(i > 50){
					head = new Sprite(resources.yellow.texture);
				}
				if(i > 100){
					head = new Sprite(resources.blue.texture);
				}
				if(i > 150){
					head = new Sprite(resources.green.texture);
				}
				if(i > 200){
					head = new Sprite(resources.red.texture);
				}
				head.width=itemW;
				head.height=itemH;
				head.x=krArr[i][j].x;
				head.y=krArr[i][j].y;
				gameHead.addChild(head);
			}
		}
	}
}


window.onresize=function(){
	var w=window.innerWidth;
	var h=window.innerHeight;
	
	app.renderer.resize(w,h)
}

