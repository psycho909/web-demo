export default class Speedometer {
	constructor(max) {
		this.details = $(".details");
		this.progress = $(".progress");
		this.frameCount = 100;
		this.frameInterval = 0.3;
		this.digitValueMax = 400;
		this.statValueMax = max;
		this.statValueCurrent = 0;
	}
	statValueInterval() {
		return this.statValueMax / this.frameCount;
	}
	updateDetails() {
		if (this.statValueCurrent > this.statValueMax) {
			return;
		}

		this.setStatValue(Math.round(this.statValueCurrent));
		this.statValueCurrent += this.statValueInterval();
		setTimeout(this.updateDetails.bind(this), this.frameInterval);
	}
	setStatValue(value) {
		var angle = -136 + 272 * (value / this.digitValueMax);
		this.progress.css({
			transform: `rotate(${angle}deg)`
		});
		this.details.find(".speed").text(value);
	}
}
