export class Doughnut {
	constructor(target) {
		this.ctx = document.querySelector(target).getContext("2d");
		this.config = {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [0, 100],
						backgroundColor: [],
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				cutout: "80%",
				rotation: 180
			},
			plugins: []
		};
		this.chart = null;
		this.DoughnutInit();
	}
	TextLabel() {
		return {
			id: "textLabel",
			afterDraw(chart, args, options) {
				const {
					ctx,
					chartArea: { left, right, top, bottom, width, height }
				} = chart;
				ctx.save();
				ctx.font = "28px Arial";
				ctx.fillStyle = "#6FCF97";
				ctx.textAlign = "center";
				ctx.fillText(chart.data.datasets[0].data[0] + "%", width / 2, height / 2 + top + 5);
			}
		};
	}
	DoughnutColor(ctx, color1, color2) {
		var gradient = ctx.createLinearGradient(0, 0, 0, 450);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);
		return gradient;
	}
	DoughnutInit() {
		this.config.data.datasets[0].backgroundColor = [this.DoughnutColor(this.ctx, "rgba(197,248,167, 1)", "rgba(165,250,187, 1)"), "#474B64"];
		this.config.plugins = [this.TextLabel()];
		this.chart = new Chart(this.ctx, this.config);
	}
	DoughnutUpdate(data) {
		this.chart.config.data.datasets[0].data = data;
		this.chart.update();
	}
}

export class DoughnutTwo {
	constructor(target1, target2) {
		this.ctx1 = document.querySelector(target1).getContext("2d");
		this.ctx2 = document.querySelector(target2).getContext("2d");
		this.config1 = {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [0, 100],
						backgroundColor: ["rgba(0,0,0,0)", "#474B64"],
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				cutout: "70%"
			},
			plugins: []
		};
		this.config2 = {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [0, 100],
						backgroundColor: ["#EBD59D", "rgba(0,0,0,0)"],
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				cutout: "80%"
			},
			plugins: []
		};
		this.chart1 = null;
		this.chart2 = null;
		this.DoughnutInit();
	}
	TextLabel() {
		return {
			id: "textLabel",
			afterDraw(chart, args, options) {
				const {
					ctx,
					chartArea: { left, right, top, bottom, width, height }
				} = chart;
				ctx.save();
				ctx.font = "28px Arial";
				ctx.fillStyle = "#6FCF97";
				ctx.textAlign = "center";
				ctx.fillText(chart.data.datasets[0].data[0] + "%", width / 2, height / 2 + top + 5);
			}
		};
	}
	DoughnutInit() {
		// this.config.data.datasets[0].backgroundColor = [DoughnutColor(this.ctx, "rgba(197,248,167, 1)", "rgba(165,250,187, 1)"), "#474B64"];
		this.config1.plugins = [this.TextLabel()];
		this.chart1 = new Chart(this.ctx1, this.config1);
		this.chart2 = new Chart(this.ctx2, this.config2);
	}
	DoughnutUpdate(data) {
		this.chart1.config.data.datasets[0].data = data;
		this.chart1.update();
		this.chart2.config.data.datasets[0].data = data;
		this.chart2.update();
	}
}
