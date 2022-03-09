// this.bg_1=this.add.tileSprite(0,0,game.config.width,game.config.height,"bg_1")

var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function () {
		Phaser.Scene.call(this, { key: "sceneA" });
	},
	init() {
		this.scoreText;
		this.player;
		this.items;
		this.name = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l"];
		this.icon = ["coin", "egg", "butterfly", "sun", "pizza"];
		this.y = [215, 300, 385];

		this.progressBarWidth = parseInt(this.game.config.width * 0.8);
		this.nowWidth = 0;
		this.loadingSpeed = 6;
		this.loadingWidth = 0;
		this.progressBar = this.add.graphics();
	},
	drawProgressBar() {
		var { width, height } = this.game.config;
		this.progressBar.clear();
		this.progressBar.fillStyle(0xffffff, 1);
		// this.progressBar.fillRect((width * 0.2) / 2, height / 2 - 5, this.loadingWidth, 10);
		this.progressBar.fillRect(50, 50, 400, 200);
		console.log(123);
	},
	preload() {
		this.load.image("bg1", "assets/pc_bg.jpg");
		this.load.image("road", "assets/road.jpg");
		this.load.image("star", "assets/star.png");
		this.load.image("coin", "assets/coin.png");
		this.load.image("egg", "assets/egg.png");
		this.load.image("butterfly", "assets/butterfly.png");
		this.load.image("sun", "assets/sun.png");
		this.load.image("pizza", "assets/pizza.png");
		this.load.image("bomb", "assets/bomb.png");
		this.load.spritesheet("dino", "assets/dino.png", { frameWidth: 16, frameHeight: 26 });
		this.load.plugin("rexmovetoplugin", "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js", true);

		this.load.on("progress", (value) => {
			this.nowWidth = this.progressBarWidth * value;
		});
	},
	create() {
		var { width, height } = this.game.config;
		this.bg = this.add
			.tileSprite(0, 0, width * 6, height * 2, "bg1")
			.setOrigin(0)
			.setScale(0.5, 0.5);
		this.road = this.add
			.tileSprite(0, 180, width * 6, 517, "road")
			.setOrigin(0)
			.setScale(0.5, 0.5);
		this.player = this.physics.add.sprite(100, 300, "dino").setScale(1.25, 1.25);

		this.player.moveTo = this.plugins
			.get("rexmovetoplugin")
			.add(this.player, {
				speed: 400
			})
			.on("complete", function () {
				console.log("Reach target");
			});

		this.input.keyboard.on("keyup", (e) => {
			if (e.keyCode == 38) {
				if (this.player.y - 85 >= 215) {
					this.player.moveTo.moveTo({
						x: this.player.x,
						y: this.player.y - 85
					});
				}
			}
			if (e.keyCode == 40) {
				if (this.player.y + 85 <= 385) {
					this.player.moveTo.moveTo({
						x: this.player.x,
						y: this.player.y + 85
					});
				}
			}
		});
		this.player.setCollideWorldBounds(true);
		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dino", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});

		this.scoreText = this.add.text(0, 0, "Score: 0", { fontSize: "32px", fill: "#fff" });

		this.items = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});
		for (var i = 0; i < 6; i++) {
			var y = this.y[Math.floor(Math.random() * this.y.length)];
			this.items.create(this.game.config.width + 100 + i * 60, y, this.icon[Math.floor(Math.random() * this.icon.length)]);
		}

		this.items.children.iterate((child, index) => {});
		this.physics.add.collider(this.player, this.road);
		this.physics.add.overlap(this.player, this.items, this.collectItem, null, this);
	},
	update() {
		if (this.loadingWidth < this.nowWidth) {
			this.loadingWidth += this.loadingSpeed;
			this.drawProgressBar();
			return;
		}
		this.loadingSpeed = 0;
		this.progressBar.destroy();
		this.scene.stop();
		this.scene.start("StartScene");

		this.player.anims.play("right", true);
		// this.bg.tilePositionX += 3;
		// this.road.tilePositionX += 5;

		this.items.children.iterate((child, index) => {
			if (child.x > 0) {
				child.x -= 4;
			} else {
				child.x = this.game.config.width + 100 + index * 60;
				child.y = this.y[Math.floor(Math.random() * this.y.length)];
			}
		});
	},
	collectItem(player, item) {
		item.disableBody(true, true);
		// item.enableBody(true, this.game.config.width + 100, this.y[Math.floor(Math.random() * this.icon.length)], true, true);
		// console.log(item);
	},
	hitItem() {}
});

var config = {
	type: Phaser.AUTO,
	scale: {
		width: 960,
		height: 470,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		}
	},
	scene: [SceneA]
};

var game = new Phaser.Game(config);
