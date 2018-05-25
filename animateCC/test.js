(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"test_atlas_", frames: [[0,800,1920,900],[1922,800,1288,1288],[0,0,4000,798],[3212,800,650,595]]}
];


// symbols:



(lib.卡通乐园童话世界 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Baseball_clip_art01 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.cloudA01 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.旋转光 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.補間動畫3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.cloudA01();
	this.instance.parent = this;
	this.instance.setTransform(-2000,-399);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2000,-399,4000,798);


(lib.補間動畫2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.cloudA01();
	this.instance.parent = this;
	this.instance.setTransform(-2000,-399);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2000,-399,4000,798);


(lib.補間動畫1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.cloudA01();
	this.instance.parent = this;
	this.instance.setTransform(-2000,-399);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2000,-399,4000,798);


(lib.元件4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.旋转光();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.252,0.252);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,163.6,149.8);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.Baseball_clip_art01();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.048,0.048);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,62.3,62.3);


(lib.cloud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.補間動畫1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(2000,399);

	this.instance_1 = new lib.補間動畫2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(2588,399);
	this.instance_1._off = true;

	this.instance_2 = new lib.補間動畫3("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(1451.7,399);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:2588},23).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},23).to({_off:true,x:1451.7},24).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,4000,798);


(lib.元件5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.元件4("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(81.8,74.9,1,1,0,0,0,81.8,74.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:4320},23).to({rotation:10800},24).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,163.6,149.8);


(lib.元件2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_47 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(47).call(this.frame_47).wait(1));

	// 圖層_1
	this.instance = new lib.元件1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0,-1.6,1,1,0,0,0,31.2,31.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:1800,x:791,y:-21.9},24).to({regY:31.1,rotation:-315,x:464.3},23).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-32.8,62.3,62.3);


// stage content:
(lib.未命名2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_5
	this.instance = new lib.元件5();
	this.instance.parent = this;
	this.instance.setTransform(264.8,158.9,1,1,0,0,0,81.8,74.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// cloud
	this.instance_1 = new lib.cloud();
	this.instance_1.parent = this;
	this.instance_1.setTransform(272.4,336.1,0.192,0.192,0,0,0,1999.9,399);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// 圖層_2
	this.instance_2 = new lib.元件2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-157.8,261.2,1,1,0,0,0,31.2,31.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// bg
	this.instance_3 = new lib.卡通乐园童话世界();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-198,-24,0.485,0.485);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(54.8,176,953.1,436.7);
// library properties:
lib.properties = {
	id: 'BF7460555ADE8E4BA0CCF3554BAE0D4F',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/test_atlas_.png", id:"test_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BF7460555ADE8E4BA0CCF3554BAE0D4F'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;