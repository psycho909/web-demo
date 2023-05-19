import { EventInfo } from "./lightbox.js";

EventInfo();
// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}
var swiper3 = new Swiper(".sec3-flim-swiper", {
	effect: "fade",
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

if (isMobile.any) {
	var swiper2 = new Swiper(".sec2-swiper-wrap", {
		slidesPerView: 1,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

function CanvasSprite(target, step, speed) {
	this.imgArr = [];
	this.index = 0;
	this.loop = false;
	this.target = target;
	this.el = null;
	this.step = step;
	this.width = 0;
	this.height = 0;
	this.speed = speed || step / 2;
	this.Init();
}
CanvasSprite.prototype.Init = function () {
	this.el = this.target[0].getContext("2d");
	$(this.el.canvas).addClass("loading");
};
CanvasSprite.prototype.PreLoad = function (path, name = "") {
	var count = 0;
	var _this = this;
	return new Promise((resolve, reject) => {
		for (var i = 0; i < this.step; i++) {
			let numPart = name.substring(name.lastIndexOf("_") + 1);
			let newName = name.replace(numPart, i.toString().padStart(numPart.length, "0"));
			this.imgArr[i] = new Image();
			this.imgArr[i].src = path + newName + ".png";
			this.imgArr[i].onload = function () {
				_this.width = this.width;
				_this.height = this.height;
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					_this.Draw(0);
					resolve(true);
				}
			};
			this.imgArr[i].onerror = function () {
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					reject(true);
				}
			};
		}
	});
};
CanvasSprite.prototype.Run = function (callback) {
	clearInterval(this.loop);
	var _this = this;
	this.loop = setInterval(function () {
		if (_this.index > _this.step - 1) {
			_this.index = 0;
			clearInterval(_this.loop);
			if (callback) {
				callback();
			}
		}
		_this.Draw(_this.index);

		_this.index++;
	}, this.speed);
};
CanvasSprite.prototype.Loop = function () {
	clearInterval(this.loop);
	this.loop = setInterval(() => {
		if (this.index > this.step - 1) {
			this.index = 0;
		}
		this.Draw(this.index);

		this.index++;
	}, this.speed);
};
CanvasSprite.prototype.Stop = function () {
	this.index = 0;
	clearInterval(this.loop);
	this.Draw(this.index);
};
CanvasSprite.prototype.Draw = function (index) {
	this.el.clearRect(0, 0, this.width, this.height);
	if (this.imgArr[index].complete) {
		this.el.drawImage(this.imgArr[index], 0, 0);
	}
};

particlesJS("sec1", {
	particles: {
		number: {
			value: 100,
			density: {
				enable: false,
				value_area: 0,
			},
		},
		color: {
			value: "#fff",
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false,
			},
		},
		size: {
			value: 5, //產生大小
			random: true, //隨機
			anim: {
				enable: false, //產生閃爍
				speed: 40,
				size_min: 1,
				sync: false,
			},
		},
		line_linked: {
			enable: false, //是否產生連線
		},
		move: {
			enable: true, //true
			speed: 3, //移動速度
			direction: "bottom-top", //移動方向
			random: true,
			straight: false, //是否隨著方向固定移動
			out_mode: "out", //移動出視窗
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: false,
			},
			onclick: {
				enable: false,
			},
			resize: true,
		},
		modes: {
			repulse: {
				distance: 200,
				duration: 0.4,
			},
			remove: {
				particles_nb: 10,
			},
		},
	},
	retina_detect: true,
});
particlesJS("sec2", {
	particles: {
		number: {
			value: 100,
			density: {
				enable: false,
				value_area: 0,
			},
		},
		color: {
			value: "#fff",
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false,
			},
		},
		size: {
			value: 5, //產生大小
			random: true, //隨機
			anim: {
				enable: false, //產生閃爍
				speed: 40,
				size_min: 1,
				sync: false,
			},
		},
		line_linked: {
			enable: false, //是否產生連線
		},
		move: {
			enable: true, //true
			speed: 3, //移動速度
			direction: "bottom-top", //移動方向
			random: true,
			straight: false, //是否隨著方向固定移動
			out_mode: "out", //移動出視窗
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: false,
			},
			onclick: {
				enable: false,
			},
			resize: true,
		},
		modes: {
			repulse: {
				distance: 200,
				duration: 0.4,
			},
			remove: {
				particles_nb: 10,
			},
		},
	},
	retina_detect: true,
});
particlesJS("sec3", {
	particles: {
		number: {
			value: 100,
			density: {
				enable: false,
				value_area: 0,
			},
		},
		color: {
			value: "#fff",
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false,
			},
		},
		size: {
			value: 5, //產生大小
			random: true, //隨機
			anim: {
				enable: false, //產生閃爍
				speed: 40,
				size_min: 1,
				sync: false,
			},
		},
		line_linked: {
			enable: false, //是否產生連線
		},
		move: {
			enable: true, //true
			speed: 3, //移動速度
			direction: "bottom-top", //移動方向
			random: true,
			straight: false, //是否隨著方向固定移動
			out_mode: "out", //移動出視窗
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: false,
			},
			onclick: {
				enable: false,
			},
			resize: true,
		},
		modes: {
			repulse: {
				distance: 200,
				duration: 0.4,
			},
			remove: {
				particles_nb: 10,
			},
		},
	},
	retina_detect: true,
});
// var step1C1 = new CanvasSprite($(".sec1-btn__step1-canvas1"), 90, 30);
// var step1C2 = new CanvasSprite($(".sec1-btn__step1-canvas2"), 90, 30);
// var step2C1 = new CanvasSprite($(".sec1-btn__step2-canvas1"), 90, 30);
// var step2C2 = new CanvasSprite($(".sec1-btn__step2-canvas2"), 90, 30);
// var character = new CanvasSprite($(".sec1-character__canvas"), 49, 45);

// Promise.allSettled([character.PreLoad("./assets/css/images/character/", "Comp1_00000"), step1C1.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step1C2.PreLoad("./assets/css/images/btn-hover/", "Hover_00000"), step2C1.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step2C2.PreLoad("./assets/css/images/btn-hover/", "Hover_00000")]).then((res) => {
// 	step1C1.Loop();
// 	step1C2.Loop();
// 	step2C1.Loop();
// 	step2C2.Loop();
// 	character.Loop();
// 	step1C1.target.parent().removeClass("loading");
// 	step2C1.target.parent().removeClass("loading");
// 	character.target.parent().removeClass("loading");
// });

// let cards = document.querySelectorAll("[data-guideline-card]");
// let container = document.querySelector("[data-guideline-card-container]");

// function scrollCardsAnimation() {
// 	var t1 = gsap.timeline();
// 	var je = "power1.out";
// 	return t1
// 		.from(
// 			container,
// 			{
// 				x: "105%",
// 				duration: 6,
// 			},
// 			"-=1"
// 		)
// 		.to(
// 			cards[0],
// 			{
// 				rotateY: -180,
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=2.7"
// 		)
// 		.to(
// 			cards[1],
// 			{
// 				x: "0%",
// 				ease: je,
// 				duration: 4,
// 			},
// 			"-=4.4"
// 		)
// 		.to(
// 			cards[1],
// 			{
// 				rotateY: -180,
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=2.0"
// 		)
// 		.to(
// 			cards[2],
// 			{
// 				x: "0%",
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=3.5"
// 		)
// 		.to(
// 			cards[2],
// 			{
// 				rotateY: -180,
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=2.0"
// 		)
// 		.to(
// 			cards[3],
// 			{
// 				x: "0%",
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=3.0"
// 		)
// 		.to(
// 			cards[3],
// 			{
// 				rotateY: -180,
// 				ease: je,
// 				duration: 3,
// 			},
// 			"-=1.3"
// 		);
// }
// ScrollTrigger.create({
// 	trigger: ".lGuideline-container",
// 	animation: scrollCardsAnimation(),
// 	// scroller: ".scroll-container",
// 	start: "top",
// 	end: "+=3600px",
// 	scrub: true,
// 	pin: true,
// 	pinType: "transform",
// });

// gsap.registerPlugin(ScrollTrigger);
