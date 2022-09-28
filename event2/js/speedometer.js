var details = $(".details");
var progress = $(".progress");

var frameCount = 100;
var frameInterval = 0.3;
var digitValueMax = 400;
var statValueMax = 360;
var statValueCurrent = 0;
var statValueInterval = statValueMax / frameCount;

updateDetails();
function updateDetails() {
	if (statValueCurrent.toFixed(1) > statValueMax) {
		return;
	}

	setStatValue(Math.round(statValueCurrent));
	statValueCurrent += statValueInterval;
	setTimeout(updateDetails, frameInterval);
}

function setStatValue(value) {
	var angle = -136 + 272 * (value / digitValueMax);
	progress.css({
		transform: `rotate(${angle}deg)`
	});
	details.find(".speed").text(value);
}

function deg2rad(angle) {
	return angle * (Math.PI / 180);
}

function rad2deg(angle) {
	return angle * (180 / Math.PI);
}

// export const updateDetails = (statValueMax) => {
// 	console.log(statValueMax);
// 	var statValueCurrent = 0;
// 	var statValueInterval = statValueMax / frameCount;
// 	if (statValueCurrent.toFixed(1) > statValueMax) {
// 		return;
// 	}

// 	setStatValue(Math.round(statValueCurrent));
// 	statValueCurrent += statValueInterval;
// 	setTimeout(() => updateDetails(statValueMax), frameInterval);
// };
