export default class Temperature {
	constructor(target) {
		this.temperature = document.querySelector(`${target} .temperature-temperature`);
		this.temperatureNum = document.querySelector(`${target} .temperature-num`);
		this.minTemp = -10;
		this.maxTemp = 100;
		this.range = 0;
	}
	setTemperature() {
		this.temperature.style.height = ((this.range - this.minTemp) / (this.maxTemp - this.minTemp)) * 100 + "%";
		this.temperature.dataset.value = this.range;
		setTimeout(this.setTemperature.bind(this), 300);
		this.temperatureNum.innerHTML = this.range + "℃";
	}
}
