// 雙圈
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
var ctx2 = document.getElementById("canvas-two-1").getContext("2d");
var config2 = {
	type: "doughnut",
	data: {
		datasets: [
			{
				data: [60, 40],
				backgroundColor: ["rgba(0,0,0,0)", "#474B64"],
				borderWidth: 0
			}
		]
	},
	options: {
		responsive: true,
		cutout: "80%"
	},
	plugins: [hoverLabel]
};

var myDoughnut2 = new Chart(ctx2, config2);

var ctx3 = document.getElementById("canvas-two-2").getContext("2d");
var config3 = {
	type: "doughnut",
	data: {
		datasets: [
			{
				data: [60, 40],
				backgroundColor: ["#EBD59D", "rgba(0,0,0,0)"],
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

var myDoughnut3 = new Chart(ctx3, config3);
myDoughnut3.resize(200, 200);
// 單圈
var ctx = document.getElementById("canvas-one").getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, 0, 450);
gradient.addColorStop(0, "rgba(197,248,167, 1)");
gradient.addColorStop(1, "rgba(165,250,187, 1)");

var config = {
	type: "doughnut",
	data: {
		datasets: [
			{
				data: [60, 40],
				backgroundColor: [gradient, "#474B64"],
				borderWidth: 0
			}
		]
	},
	options: {
		responsive: true,
		cutout: "80%",
		cutoutPercentage: 70,
		rotation: 180
	},
	plugins: [hoverLabel]
};

var myDoughnut = new Chart(ctx, config);
