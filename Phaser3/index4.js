var SceneA = new Phaser.Class({
	init: function () {},
	preload: function () {},
	create: function () {},
	update: function () {}
});

var SceneB = new Phaser.Class({
	init: function () {
		this.player;
		this.platforms;
		this.cursors;
		this.stars;
		this.egg;
		this.score = 0;
		this.scoreText;
		this.FPS;
		this.bombs;
		this.gameOver = false;
		this.timedEvent;
		this.timeText;
	},
	preload: function () {
		this.load.image("sky", "assets/sky.png");
		this.load.image("ground", "assets/platform.png");
		this.load.image("star", "assets/star.png");
		this.load.image("coin", "assets/coin.png");
		this.load.image("egg", "assets/egg.png");
		this.load.image("butterfly", "assets/butterfly.png");
		this.load.image("sun", "assets/sun.png");
		this.load.image("pizza", "assets/pizza.png");
		this.load.image("bomb", "assets/bomb.png");
		this.load.spritesheet("dino", "assets/dino.png", { frameWidth: 16, frameHeight: 26 });
	},
	create: function () {
		var { width, height } = this.game.config;
		this.add.image(400, 300, "sky");
	},
	update: function () {}
});

// 創建基本config
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: true
		}
	},
	scene: [SceneA, SceneB]
};

var game = new Phaser.Game(config);
