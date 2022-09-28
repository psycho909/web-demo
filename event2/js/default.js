import { Doughnut, DoughnutTwo } from "./doughnut.js";
import setGauge from "./gague.js";
import linebar from "./linebar.js";
import Speedometer from "./speedometer.js";
import Temperature from "./temperature.js";
import WaterBall from "./waterball.js";

var speedometer1 = new Speedometer(160);

speedometer1.updateDetails();

setGauge("#gauge1", 150);

var waterBall1 = new WaterBall(document.getElementById("ball"));
waterBall1.rateDom = 50;
waterBall1.init();

linebar("#line1", 30);

var t1 = new Temperature("#termometer1");
t1.range = 20;
t1.setTemperature();

var doughnut1 = new Doughnut("#doughnut1");
doughnut1.DoughnutUpdate([60, 40]);

var doughnut2 = new DoughnutTwo("#doughnut2", "#doughnut2-1");
doughnut2.DoughnutUpdate([60, 40]);
