// ³·ªá
window.onload = () => {
	const CANVAS = document.getElementsByTagName("canvas")[0];
	const CTX = CANVAS.getContext("2d");
	const CHARS = [];
	const MAX_CHARS = 250; //¼Æ¶q
	const SEPARATION = 1.5;

	let ww, wh, camera;

	class Vector {
		constructor(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		rotate(dir, ang) {
			const X = this.x;
			const Y = this.y;
			const Z = this.z;

			const SIN = Math.sin(ang);
			const COS = Math.cos(ang);

			if (dir === "x") {
				this.y = Y * COS - Z * SIN;
				this.z = Y * SIN + Z * COS;
			} else if (dir === "y") {
				this.x = X * COS - Z * SIN;
				this.z = X * SIN + Z * COS;
			}
		}

		project() {
			const ZP = this.z + camera.z;
			const DIV = ZP / 960; //½d³ò
			const XP = (this.x + camera.x) / DIV;
			const YP = (this.y + camera.y) / DIV;
			const CENTER = getCenter();
			return [XP + CENTER[0], YP + CENTER[1], ZP];
		}
	}

	class Char {
		constructor(letter, pos) {
			this.letter = letter;
			this.pos = pos;
		}

		rotate(dir, ang) {
			this.pos.rotate(dir, ang);
		}

		render() {
			const PIXEL = this.pos.project();
			const XP = PIXEL[0];
			const YP = PIXEL[1];
			const MAX_SIZE = 34;
			const SIZE = (1 / PIXEL[2] * MAX_SIZE) | 0;
			const BRIGHTNESS = SIZE / MAX_SIZE;
			const COL = `rgba(250, 255, ${180 * BRIGHTNESS | 0 + 180}, ${BRIGHTNESS})`;
			//const COL = `rgba(20, 100, ${50 * BRIGHTNESS | 0 + 180}, ${BRIGHTNESS})`;
			
			CTX.beginPath();
			CTX.fillStyle = COL;
			CTX.font = SIZE + "px monospace";
			CTX.fillText(this.letter, XP, YP);
			CTX.fill();
			CTX.closePath();
		}
	}

	function getCenter() {
		return [ww / 2, wh / 2];
	}

	function signedRandom() {
		return Math.random() - Math.random();
	}

	function render() {
		for (let i = 0; i < CHARS.length; i++) {
			CHARS[i].render();
		}
	}
	
	let time = 0;
	function update() {
		CTX.clearRect(0, 0, ww, wh);
		for (let i = 0; i < CHARS.length; i++) {
			const DX = 0.005 * Math.sin(time * 0.001);
			const DY = 0.005 * Math.cos(time * 0.001);
			CHARS[i].rotate("x", DX);
			CHARS[i].rotate("y", DY);
		}
		++time;
	}

	function loop() {
		window.requestAnimationFrame(loop);
		update();
		render();
	}
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function createChars() {
		for (let i = 0; i < MAX_CHARS; i++) {
			const CHARACTER = String.fromCharCode((Math.random() * 93 + 34) | 0);
			//const CHARACTER = String.fromCharCode(21338, 23458, 20358);
			const X = signedRandom() * SEPARATION;
			const Y = signedRandom() * SEPARATION;
			const Z = signedRandom() * SEPARATION;
			const POS = new Vector(X, Y, Z);
			const CHAR = new Char(CHARACTER, POS);
			CHARS.push(CHAR);
		}
	}

	function setDim() {
		ww = window.innerWidth;
		wh = window.innerHeight;
		CANVAS.width = ww;
		CANVAS.height = wh;
	}

	function initCamera() {
		camera = new Vector(0, 0, SEPARATION + 1);
	}

	window.onresize = setDim;

	(() => {
		setDim();
		initCamera();
		createChars();
		loop();
	})();
};






// ¤å¦r

	// Wrap every letter in a span
	$('.ml9 .letters').each(function(){
	  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});

	anime.timeline({loop: true})
	  .add({
		targets: '.ml9 .letter',
		scale: [0, 1],
		duration: 1500,
		elasticity: 500,
		delay: function(el, i) {
		  return 45 * (i+1)
		}
	  }).add({
		targets: '.ml9',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	  });






/* 逗號 */

$(function(){
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        if(top > 900){
        	top = 900;
        }
		$('.comma01').css({'margin-top' : 1 + top*2.1  });
		$('.comma02').css({'margin-top' : 1 + top*1.2  });
		$('.comma03').css({'margin-top' : 1 + top*2*-1  });
		$('.comma04').css({'margin-top' : 1 + top*1*-1  });
		$('.kv_dicoration2').css({'margin-top' : 1 + top*0.12  });
		$('.kv_dicoration1').css({'margin-top' : 1 + top*0.12*-1  });
    });
})

//.comma01{ position: absolute; right: 8%; top: 20%; z-index: 5; }
//.comma02{ position: absolute; left: 70%; top: 7%; z-index: 5; }
//.comma03{ position: absolute; left: 3%; top: 100%; z-index: 5; }
//.comma04{ position: absolute; right: 16%; top: -4%; z-index: 5; }
