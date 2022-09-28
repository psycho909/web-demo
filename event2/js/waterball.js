var rateDom = 100,
	flatDom = 200,
	speedDom = 3,
	distanceDom = 87,
	waveDom = 24;
function drawCircle(ctx, mW, color) {
	ctx.beginPath();
	ctx.arc(mW / 2, mW / 2, mW / 2 - 1, 0, 2 * Math.PI);
	ctx.beginPath();
	ctx.arc(mW / 2, mW / 2, mW / 2 - 2, 0, 2 * Math.PI);
	ctx.clip();
}
// 曲线函数
function drawSin(ctx, mW, color1, color2, wav, dY) {
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

function init() {
	var canvas1 = document.getElementById("ball");

	var mW = canvas1.clientWidth;
	canvas1.style.height = mW;
	canvas1.width = canvas1.height = mW;

	var canvas2 = document.createElement("canvas"),
		ctx2 = canvas2.getContext("2d");
	canvas2.width = mW;
	canvas2.height = mW;

	var canvas3 = document.createElement("canvas"),
		ctx3 = canvas3.getContext("2d");
	canvas3.width = mW;
	canvas3.height = mW;

	var x = 0;
	var flat = 300;
	var speed = 7;
	// 	rate = 0.6,
	var distance = 180;
	var wave = 30;

	// rateDom = document.getElementById('rate')
	// rateDom = rate * 100;
	// flatDom = flat;
	// speedDom = speed;
	// distanceDom = distance;
	// waveDom = wave;

	var ctx1 = canvas1.getContext("2d");

	drawCircle(ctx1, mW, "#4874AF");
	drawSin(ctx2, mW, "#4ED1FF", "#4ED1FF", wave, mW - mW * rate);
	drawSin(ctx3, mW, "rgba(78, 209, 255, 0.6)", "rgba(78, 209, 255, 0.6)", wave, mW - mW * rate);

	var rate1 = rate,
		wave1 = wave;
	function animation() {
		rate = parseInt(rateDom) / 100;
		flat = parseInt(flatDom);

		if (rate !== rate1 || wave1 !== wave) {
			ctx2.clearRect(0, 0, mW, mW);
			ctx3.clearRect(0, 0, mW, mW);
			rate1 = rate;
			wave1 = wave;
			drawSin(ctx2, mW, "#4ED1FF", "#4ED1FF", wave, mW - mW * rate);
			drawSin(ctx3, mW, "rgba(78, 209, 255, 0.6)", "rgba(78, 209, 255, 0.6)", wave, mW - mW * rate);
		}

		speed = parseInt(speedDom);
		distance = parseInt(distanceDom);
		wave = parseInt(waveDom);

		ctx1.clearRect(0, 0, mW, mW);

		ctx1.drawImage(canvas2, x, 0, mW + flat, mW);
		ctx1.drawImage(canvas2, x - mW - flat, 0, mW + flat, mW);
		ctx1.drawImage(canvas3, x + distance, 0, mW + flat, mW);
		ctx1.drawImage(canvas3, x - mW + distance - flat, 0, mW + flat, mW);

		ctx1.font = "900 40px Arial";
		ctx1.fillStyle = "#fff";
		ctx1.textAlign = "center";
		ctx1.fillText(rate * 100 + "%", canvas1.width / 2, canvas1.height / 2);

		x >= mW - speed + flat ? (x = 0) : (x += speed);
		requestAnimationFrame(animation);
	}
	animation();
}
init();
