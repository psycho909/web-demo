// this.bg_1=this.add.tileSprite(0,0,game.config.width,game.config.height,"bg_1")

var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function () {
		Phaser.Scene.call(this, { key: "sceneA" });
	},
	init() {
		this.scoreText;
		this.player;
		this.stars;
	},
	preload() {
		this.load.image("bg1", "assets/pc_bg.jpg");
		this.load.image("road", "assets/road.jpg");
		this.load.image("star", "assets/star.png");
		this.load.spritesheet("dino", "assets/dino.png", { frameWidth: 16, frameHeight: 26 });
		this.load.plugin("rexmovetoplugin", "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js", true);
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

		this.stars = this.physics.add.image(600, 300, "star");
		this.physics.add.collider(this.player, this.road);
		this.physics.add.overlap(this.player, this.stars, this.collectItem, null, this);
	},
	update() {
		this.player.anims.play("right", true);
		// this.bg.tilePositionX += 3;
		// this.road.tilePositionX += 5;
		if (this.stars.x > 0) {
			this.stars.x -= 2;
		} else {
			this.stars.x = this.game.config.width;
		}
	},
	collectItem(player, item) {
		item.disableBody(true, true);
		console.log("碰到");
	},
	hitItem() {}
});

var config = {
	type: Phaser.AUTO,
	width: 960,
	height: 470,
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		}
	},
	scene: [SceneA]
};

var game = new Phaser.Game(config);
