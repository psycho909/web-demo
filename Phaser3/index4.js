var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function () {
		Phaser.Scene.call(this, { key: "sceneA" });
		this.pic;
	},
	preload: function () {},
	create: function () {
		this.input.once(
			"pointerup",
			function () {
				this.scene.pause();
				this.scene.launch("sceneB");
			},
			this
		);

		this.events.on("pause", function () {
			console.log("Scene A paused");
		});

		this.events.on("resume", function () {
			console.log("Scene A resumed");
		});
	},
	update: function () {}
});

var SceneB = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function () {
		Phaser.Scene.call(this, { key: "sceneB" });
	},
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
		this.timedEvent = this.time.addEvent({
			delay: 3000,
			callback: () => {
				console.log("done");
				this.timedEvent.paused = true;
			},
			paused: false
		});
		this.add.image(400, 300, "sky");

		// 增加物理靜態Group
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

		// 玩家
		this.player = this.physics.add.sprite(100, 450, "dino");
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dino", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "dino", frame: 1 }],
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dino", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});
		// 創建鍵盤控制
		this.cursors = this.input.keyboard.createCursorKeys();

		var name = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l"];
		var icon = ["coin", "egg", "butterfly", "sun", "pizza"];
		this.stars = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		for (var i = 0; i < 12; i++) {
			this.stars.create(Phaser.Math.Between(0, this.game.config.width), -100, icon[Math.floor(Math.random() * icon.length)]);
		}

		this.time.addEvent({
			delay: 500,
			callback: () => {
				this.stars.children.iterate(function (child, index) {
					child.setVelocityY(Phaser.Math.Between(25, 100));
					switch (child.texture.key) {
						case "coin":
							child.setData({
								name: child.texture.key,
								source: 10
							});
							break;
						case "egg":
							child.setData({
								name: child.texture.key,
								source: 20
							});
							break;
						case "butterfly":
							child.setData({
								name: child.texture.key,
								source: 30
							});
							break;
						case "sun":
							child.setData({
								name: child.texture.key,
								source: 40
							});
							break;
						case "pizza":
							child.setData({
								name: child.texture.key,
								source: 50
							});
							break;
					}
				});
			}
		});

		this.bombs = this.physics.add.group();

		// 增加文字
		this.scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#000" });
		this.FPS = this.add.text(16, 48, "FPS: 0", { fontSize: "32px", fill: "#ff0000" });
		this.timeText = this.add.text(16, 80, "", { fill: "#000", font: "bold 72px system-ui" }).setShadow(2, 2, "#000", 8);
		// player 與 platforms 碰撞檢測
		this.physics.add.collider(this.player, this.platforms);

		// stars 與 platforms 碰撞檢測
		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.collider(this.bombs, this.platforms);

		// 檢查player 與 組中任何一顆星星的重疊，檢測到他會傳遞到 collectStar
		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

		this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
	},
	update: function () {
		this.timeText.setFill(this.timedEvent.paused ? "#f00" : "#000").setText(this.timedEvent.getRemainingSeconds().toFixed(1));

		this.FPS.setText("FPS: " + this.game.loop.actualFps);
		if (this.input.activePointer.isDown) {
			if (this.input.activePointer.x >= 400) {
				this.player.flipX = false;
				this.player.setVelocityX(160);
				this.player.x += 2;
				this.player.anims.play("right", true);
			}
			if (this.input.activePointer.x < 400) {
				this.player.flipX = true;
				this.player.setVelocityX(-160);
				this.player.x -= 2;
				this.player.anims.play("left", true);
			}
		}
		if (this.gameOver) {
			this.scene.resume("sceneA");
			return;
		}
		if (this.cursors.left.isDown) {
			this.player.flipX = true;
			this.player.setVelocityX(-160);

			this.player.anims.play("left", true);
		} else if (this.cursors.right.isDown) {
			this.player.flipX = false;
			this.player.setVelocityX(160);

			this.player.anims.play("right", true);
		} else {
			this.player.setVelocityX(0);

			this.player.anims.play("turn");
		}
		this.stars.children.iterate(function (child) {
			if (child.y > this.game.config.height) {
				child.y = 0;
				child.x = Phaser.Math.Between(0, this.game.config.width);
			}
		});
	},
	collectStar: function (player, star) {
		star.disableBody(true, true);
		this.score += star.getData("source");
		this.scoreText.setText("Score: " + this.score);
		var icon = ["coin", "egg", "butterfly", "sun", "pizza"];
		star.enableBody(true, Phaser.Math.Between(0, this.game.config.width), 0, true, true);
		star.setTexture("bomb");
		star.setSize(14, 14);
		star.setVelocityY(100);
	},
	hitBomb: function (player, bomb) {
		// this.physics.pause();

		player.setTint(0xff0000);

		player.anims.play("turn");

		gameOver = true;
	}
});

// var SceneA = new Phaser.Class({
// 	Extends: Phaser.Scene,

// 	init: function SceneA() {
// 		Phaser.Scene.call(this, { key: "sceneA" });

// 		this.pic;
// 	},

// 	preload: function () {
// 		this.load.image("arrow", "assets/egg.png");
// 	},

// 	create: function () {
// 		this.pic = this.add.image(400, 300, "arrow").setOrigin(0, 0.5);

// 		this.input.once(
// 			"pointerup",
// 			function () {
// 				this.scene.pause();
// 				this.scene.launch("sceneB");
// 			},
// 			this
// 		);

// 		this.events.on("pause", function () {
// 			console.log("Scene A paused");
// 		});

// 		this.events.on("resume", function () {
// 			console.log("Scene A resumed");
// 		});
// 	},

// 	update: function (time, delta) {
// 		this.pic.rotation += 0.01;
// 	}
// });

// var SceneB = new Phaser.Class({
// 	Extends: Phaser.Scene,

// 	initialize: function SceneB() {
// 		Phaser.Scene.call(this, { key: "sceneB" });
// 	},

// 	preload: function () {
// 		this.load.image("face", "assets/platform.png");
// 	},

// 	create: function () {
// 		this.add.image(400, 300, "face").setAlpha(0.5);

// 		this.input.once(
// 			"pointerdown",
// 			function () {
// 				this.scene.resume("sceneA");
// 			},
// 			this
// 		);
// 	}
// });

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
