const units = {
	Celcius: "°C",
	Fahrenheit: "°F"
};

const configUnit = {
	minTemp: -20,
	maxTemp: 50,
	unit: "Celcius"
};

// Change min and max temperature values

const tempValueInputs = document.querySelectorAll("input[type='text']");
tempValueInputs.forEach((input) => {
	input.addEventListener("change", (event) => {
		const newValue = event.target.value;
		if (isNaN(newValue)) {
			return (input.value = configUnit[input.id]);
		} else {
			configUnit[input.id] = input.value;
			range[input.id.slice(0, 3)] = configUnit[input.id]; // Update range
			return setTemperature(); // Update temperature
		}
	});
});

// Switch unit of temperature

const unitP = document.getElementById("unit");

unitP.addEventListener("click", () => {
	configUnit.unit = configUnit.unit === "Celcius" ? "Fahrenheit" : "Celcius";
	unitP.innerHTML = configUnit.unit + " " + units[configUnit.unit];
	return setTemperature();
});

// Change temperature

const range = document.querySelector("input[type='range']");
const temperature = document.getElementById("temperature");

function setTemperature() {
	temperature.style.height = ((range.value - configUnit.minTemp) / (configUnit.maxTemp - configUnit.minTemp)) * 100 + "%";
	temperature.dataset.value = range.value + units[configUnit.unit];
}

range.addEventListener("input", setTemperature);
setTimeout(setTemperature, 1000);

const hoverLabel = {
	id: "hoverLabel",
	afterDraw(chart, args, options) {
		const {
			ctx,
			chartArea: { left, right, top, bottom, width, height }
		} = chart;
		ctx.save();
		ctx.font = "32px Arial";
		ctx.fillStyle = "#6FCF97";
		ctx.textAlign = "center";
		ctx.fillText(chart.data.datasets[0].data[0] + "%", width / 2, height / 2 + top + 5);
	}
};
