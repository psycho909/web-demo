const setGauge = (target, percent) => {
	var _target = $(target);
	var max = _target.attr("data-max");
	var percentage = percent / max;
	var degrees = 180 * percentage;
	var pointerDegrees = degrees - 90;
	var spinner = _target.find(".spinner");
	var pointer = _target.find(".pointer");
	$(spinner).attr({
		style: "transform: rotate(" + degrees + "deg)"
	});
	$(pointer).attr({
		style: "transform: rotate(" + pointerDegrees + "deg)"
	});
	_target.find(".gauge-num").text(percent);
};

export default setGauge;
