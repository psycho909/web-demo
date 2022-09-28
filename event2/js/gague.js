$(".run").on("click", function (e) {
	setGauge(100);
});
function setGauge(percent) {
	var percentage = percent / 100;
	var degrees = 180 * percentage;
	var pointerDegrees = degrees - 90;
	var spinner = $(".gauge-cont").find(".spinner");
	var pointer = $(".gauge-cont").find(".pointer");
	$(spinner).attr({
		style: "transform: rotate(" + degrees + "deg)"
	});
	$(pointer).attr({
		style: "transform: rotate(" + pointerDegrees + "deg)"
	});
}
