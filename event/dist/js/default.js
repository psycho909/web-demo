// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}

gsap.registerPlugin(MotionPathPlugin);

function Car1(start, end) {
	var onDiv = gsap.to(".car1", {
		duration: 2.6,
		yoyo: false,
		// ease: "power1.inOut",
		motionPath: {
			path: "#path1",
			align: "#path1",
			autoRotate: true,
			alignOrigin: [0.5, 0.5],
			start: start,
			end: end,
			autoRotate: false
		}
	});
	if (end == 0.33) {
		stop = 18;
	}
	if (end == 0.66) {
		stop = 51;
	}
	if (end == 1) {
		stop = 100;
	}
	gsap.to(".level__footer1", {
		height: stop + "%",
		duration: 2,
		delay: 0.5
	});
}
function Car8(start, end) {
	var onDiv = gsap.to(".car8", {
		duration: 5,
		yoyo: false,
		// ease: "power1.inOut",
		motionPath: {
			path: "#path2",
			align: "#path2",
			autoRotate: true,
			alignOrigin: [0.5, 0.5],
			start: start,
			end: end,
			autoRotate: false
		}
	});
	if (end == 0.45) {
		stop = 18;
	}
	if (end == 1) {
		stop = 100;
	}
	gsap.to(".level__footer8", {
		height: stop + "%",
		duration: 2,
		delay: 0.5
	});
}

var vm = new Vue({
	el: "#app"
});
