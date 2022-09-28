export default class WaterBall {
	constructor(canvas1) {
		this.canvas1 = canvas1;
		this.canvas2 = null;
		this.canvas3 = null;
		this.rateDom = 100;
		this.flatDom = 200;
		this.speedDom = 3;
		this.distanceDom = 87;
		this.waveDom = 24;
		this.rate1 = 0;
		this.wave1 = 0;
		this.distance = 100;
		this.wave = 30;
		this.speed = 7;
		this.flat = 300;
		this.x = 0;
		this.ctx1 = null;
		this.ctx2 = null;
		this.ctx3 = null;
		this.rate = 0;
		this.flat = 0;
		this.mw = 0;
	}
	drawCircle(ctx, mW, color) {
		ctx.beginPath();
		ctx.arc(mW / 2, mW / 2, mW / 2 - 1, 0, 2 * Math.PI);
		ctx.beginPath();
		ctx.arc(mW / 2, mW / 2, mW / 2 - 2, 0, 2 * Math.PI);
		ctx.clip();
	}
	drawSin(ctx, mW, color1, color2, wav, dY) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, mW);
		ctx.lineTo(0, dY);
		ctx.quadraticCurveTo(mW / 4, dY - wav, mW / 2, dY);
		ctx.lineTo(mW / 2, dY);
		ctx.quadraticCurveTo((mW * 3) / 4, dY + wav, mW, dY);
		ctx.lineTo(mW, mW);
		ctx.lineTo(0, mW);
		ctx.fillStyle = color1;
		ctx.fill();
		ctx.restore();
	}

	init() {
		this.mW = this.canvas1.clientWidth;
		this.canvas1.style.height = this.mW;
		this.canvas1.width = this.canvas1.height = this.mW;

		this.canvas2 = document.createElement("canvas");
		this.ctx2 = this.canvas2.getContext("2d");
		this.canvas2.width = this.mW;
		this.canvas2.height = this.mW;

		this.canvas3 = document.createElement("canvas");
		this.ctx3 = this.canvas3.getContext("2d");
		this.canvas3.width = this.mW;
		this.canvas3.height = this.mW;

		this.ctx1 = this.canvas1.getContext("2d");

		this.drawCircle(this.ctx1, this.mW, "#4874AF");
		this.drawSin(this.ctx2, this.mW, "#4ED1FF", "#4ED1FF", this.wave, this.mW - this.mW * this.rateDom);
		this.drawSin(this.ctx3, this.mW, "rgba(78, 209, 255, 0.6)", "rgba(78, 209, 255, 0.6)", this.wave, this.mW - this.mW * this.rateDom);

		this.rate1 = this.rateDom;
		this.wave1 = this.wave;

		this.animation();
	}
	animation() {
		this.rate = parseInt(this.rateDom) / 100;
		this.flat = parseInt(this.flatDom);

		if (this.rate !== this.rate1 || this.wave1 !== this.wave) {
			this.ctx2.clearRect(0, 0, this.mW, this.mW);
			this.ctx3.clearRect(0, 0, this.mW, this.mW);
			this.rate1 = this.rate;
			this.wave1 = this.wave;
			this.drawSin(this.ctx2, this.mW, "#4ED1FF", "#4ED1FF", this.wave, this.mW - this.mW * this.rate);
			this.drawSin(this.ctx3, this.mW, "rgba(78, 209, 255, 0.6)", "rgba(78, 209, 255, 0.6)", this.wave, this.mW - this.mW * this.rate);
		}

		this.speed = parseInt(this.speedDom);
		this.distance = parseInt(this.distanceDom);
		this.wave = parseInt(this.waveDom);

		this.ctx1.clearRect(0, 0, this.mW, this.mW);

		this.ctx1.drawImage(this.canvas2, this.x, 0, this.mW + this.flat, this.mW);
		this.ctx1.drawImage(this.canvas2, this.x - this.mW - this.flat, 0, this.mW + this.flat, this.mW);
		this.ctx1.drawImage(this.canvas3, this.x + this.distance, 0, this.mW + this.flat, this.mW);
		this.ctx1.drawImage(this.canvas3, this.x - this.mW + this.distance - this.flat, 0, this.mW + this.flat, this.mW);

		this.ctx1.font = "900 40px Arial";
		this.ctx1.fillStyle = "#fff";
		this.ctx1.textAlign = "center";
		this.ctx1.fillText(this.rate * 100 + "%", this.canvas1.width / 2, this.canvas1.height / 2);

		this.x >= this.mW - this.speed + this.flat ? (this.x = 0) : (this.x += this.speed);
		requestAnimationFrame(this.animation.bind(this));
	}
}
