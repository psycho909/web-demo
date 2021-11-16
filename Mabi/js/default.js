// $("#fullpage").fullpage({
// 	sectionsColor: ["#4A6FB1", "#939FAA", "#323539"],
// 	scrollOverflow: true,
// 	scrollOverflowReset: true,
// 	keyboardScrolling: false
// });

// disabled mouse scroll
// $.fn.fullpage.setMouseWheelScrolling(false);
// $.fn.fullpage.setAllowScrolling(false);

function m(t) {
	var e = $(".cont_0" + t + " .e");
	gsap.to(e, {
		delay: 0.3,
		scale: 1,
		opacity: 1,
		filter: "blur(0px) grayscale(0%)",
		duration: 0.5,
		ease: "power1.in"
	});
}

window.location.href = "#info";

$("#fullpage").fullpage({
	menu: "#menu",
	anchors: ["intro", "section1", "section2"],
	scrollingSpeed: 500,
	scrollOverflow: true,
	scrollOverflowReset: true,
	keyboardScrolling: false,
	afterLoad: function (origin, destination) {
		var ease = "power3.inOut";
		var duration = 0.8;
		$(".cont .e").attr("style", "");
		gsap.set($(".cont .e"), {
			scale: 1.1
		});
		console.log(destination);
		switch (destination) {
			case 1:
				if ($("body").hasClass("intro-end")) {
					gsap.to(".bg", {
						top: 0,
						duration: duration,
						ease: ease
					});
				}
				break;
			case 2:
				$.fn.fullpage.setAllowScrolling(false);
				gsap.to(".bg", {
					top: -345,
					duration: duration,
					ease: ease
				});
				gsap.set(".bgg1", {
					opacity: 0,
					onComplete: function () {
						$(".bgg1").show();
					}
				});
				gsap.to(".bgg1", {
					delay: 0.5,
					opacity: 1,
					duration: 0.5
				});
				m(2);
				break;
			case 3:
				gsap.to(".bg", {
					top: -690,
					duration: duration,
					ease: ease
				});
				gsap.set(".bgg2", {
					opacity: 0,
					onComplete: function () {
						$(".bgg2").show();
					}
				});
				gsap.to(".bgg2", {
					delay: 0.5,
					opacity: 1,
					duration: 0.5
				});
				m(3);
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
		}
		// destination < 2 ? u("#menu").fadeOut("fast") : u("#menu").fadeIn("fast")
	},
	onLeave: function () {
		gsap.to(".bgg", {
			opacity: 0,
			duration: 0.3,
			onComplete: function () {
				$(".bgg").hide();
			}
		});
	}
});
$.fn.fullpage.setAllowScrolling(false);
gsap.set(".bg", {
	y: -60,
	top: -2230,
	scale: 1.05,
	opacity: 0,
	filter: "blur(20px) grayscale(100%) brightness(0)"
});
gsap.set(".cont_01 h1, .cont_01 #px-render", {
	y: 10,
	scale: 0.98,
	opacity: 0
});
gsap.set(".cont_01 .btn_empty, .cont_01 .btn1, .cont_01 .footer", {
	opacity: 0
});
gsap.to(".bg", {
	y: 0,
	scale: 1,
	opacity: 1,
	filter: "blur(0px) grayscale(0%) brightness(100%)",
	delay: 0.5,
	duration: 2,
	ease: "expo.out",
	onComplete: function () {
		$(".bg").addClass("blink");
	}
});
gsap.to(".cont_01 h1, .cont_01 #px-render", {
	y: 0,
	scale: 1,
	opacity: 1,
	duration: 3,
	ease: "power4.in",
	onComplete: function () {
		gsap.to(".cont_01 .btn_empty, .cont_01 .btn1", {
			opacity: 1,
			duration: 0.5,
			onComplete: function () {
				$(".cont_01 .btn1").addClass("ok");
			}
		});
	}
});

$(".cont_01 .btn1").on("click", function (e) {
	if ($(this).hasClass("ok")) {
		$(".cont_01 .btn_empty").hide();
	}
	$(this).removeClass("ok").fadeOut("fast");
	$("#bgm").fadeIn("fast");
	gsap.to(".bg", {
		top: -2150,
		scale: 0.95,
		filter: "blur(2px) grayscale(90%)",
		duration: 0.5,
		ease: "power1.inOut",
		onComplete: function () {
			gsap.to(".bg", {
				top: 0,
				scale: 1,
				filter: "blur(0px) grayscale(0%)",
				duration: 1.5,
				ease: "expo.inOut",
				onComplete: function () {
					$("body").addClass("intro-end");
					$(".cont_01 .sub, .cont_01 .btn2, .cont_01 .corss, .cont_01 .scroll").fadeIn(500);
					$.fn.fullpage.setAllowScrolling(true);
				}
			});
		}
	});
	// $(".cont").on("mousewheel DOMMouseScroll", function () {
	// 	if (!$("body").hasClass("show_popup")) {
	// 		if ($(this).parent(".fp-scroller")[0]) {
	// 			var n = $(this)
	// 				.parent(".fp-scroller")
	// 				.css("transform")
	// 				.replace(/[^0-9\-.,]/g, "")
	// 				.split(",");
	// 			var o = n[n.length - 1];
	// 			if (o < 0) {
	// 				var s = $(this)[0].className.replace("cont cont_0", "");
	// 				var a = -1 * ($(".cont_0".concat(s)).outerHeight() - $(".cont_0".concat(s)).closest(".fp-scrollable").outerHeight());
	// 				console.log(o, a);
	// 				if (o <= a) {
	// 					setTimeout(function () {
	// 						$("body").addClass("mouseScrollEnd");
	// 					}, 610);
	// 				}
	// 				if ($("body").hasClass("mouseScrollEnd")) {
	// 					$.fn.fullpage.setAllowScrolling(true);
	// 					setTimeout(function () {
	// 						$("body").removeClass("mouseScrollEnd");
	// 					}, 610);
	// 				}
	// 			} else {
	// 				$("body").removeClass("mouseScrollEnd");
	// 				$.fn.fullpage.setAllowScrolling(true);
	// 			}
	// 		}
	// 	}
	// });
});

// $(".cont").on("mousewheel DOMMouseScroll", function () {
// 	if (!$("body").hasClass("show_popup")) {
// 		if ($(this).parent(".fp-scroller")[0]) {
// 			var n = $(this)
// 				.parent(".fp-scroller")
// 				.css("transform")
// 				.replace(/[^0-9\-.,]/g, "")
// 				.split(",");
// 			var o = n[n.length - 1];
// 			if (o < 0) {
// 				var s = $(this)[0].className.replace("cont cont_0", "");
// 				var a = -1 * ($(".cont_0".concat(s)).outerHeight() - $(".cont_0".concat(s)).closest(".fp-scrollable").outerHeight());
// 				console.log(o, a);
// 				if (o <= a) {
// 					setTimeout(function () {
// 						$("body").addClass("mouseScrollEnd");
// 					}, 610);
// 				}
// 				if ($("body").hasClass("mouseScrollEnd")) {
// 					$.fn.fullpage.setAllowScrolling(true);
// 					setTimeout(function () {
// 						$("body").removeClass("mouseScrollEnd");
// 					}, 610);
// 				}
// 			} else {
// 				$("body").removeClass("mouseScrollEnd");
// 				$.fn.fullpage.setAllowScrolling(true);
// 			}
// 		}
// 	}
// });

var canvas = {};
canvas.width = window.innerWidth;
window.onload = function () {
	const app = new PIXI.Application({ width: canvas.width, height: 900, transparent: true });
	document.getElementById("px-render").appendChild(app.view);

	app.stage.interactive = true;

	const container = new PIXI.Container();
	app.stage.addChild(container);

	const flag = PIXI.Sprite.from("../images/wing.png");
	container.addChild(flag);
	flag.x = 0;
	flag.y = -100;

	const displacementSprite = PIXI.Sprite.from("../images/filter.png");
	// Make sure the sprite is wrapping.
	displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

	displacementSprite.position = flag.position;

	app.stage.addChild(displacementSprite);

	flag.filters = [displacementFilter];

	displacementFilter.scale.x = 30;
	displacementFilter.scale.y = 60;

	app.ticker.add(function () {
		// Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
		displacementSprite.x++;
		// Reset x to 0 when it's over width to keep values from going to very huge numbers.
		if (displacementSprite.x > displacementSprite.width) {
			displacementSprite.x = 0;
		}
	});
};
