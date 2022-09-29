import { Doughnut, DoughnutTwo } from "./doughnut.js";
import setGauge from "./gague.js";
import linebar from "./linebar.js";
import Speedometer from "./speedometer.js";
import Temperature from "./temperature.js";
import WaterBall from "./waterball.js";

var speedometer1 = new Speedometer("#speedometer1", 160);
speedometer1.updateDetails();

var speedometer2 = new Speedometer("#speedometer2", 120);
speedometer2.updateDetails();

var speedometer3 = new Speedometer("#speedometer3", 360);
speedometer3.updateDetails();

setGauge("#gauge1", 150);

var waterBall1 = new WaterBall(document.getElementById("ball"));
waterBall1.rateDom = 50;
waterBall1.init();

linebar("#line1", 30);
linebar("#line2", 60);

var t1 = new Temperature("#termometer1");
t1.range = 20;
t1.setTemperature();

var t2 = new Temperature("#termometer2");
t2.range = 60;
t2.setTemperature();

var doughnut1 = new Doughnut("#doughnut1");
doughnut1.DoughnutUpdate([75, 25]);
var doughnut2 = new Doughnut("#doughnut2");
doughnut2.DoughnutUpdate([20, 80]);
var doughnut3 = new Doughnut("#doughnut3", "#FF0844", "#FFB199");
doughnut3.DoughnutUpdate([40, 60]);

var doughnut4 = new DoughnutTwo("#doughnut4", "#doughnut4-1", "#FEEBBA", "#896404");
doughnut4.DoughnutUpdate([30, 70]);
var doughnut5 = new DoughnutTwo("#doughnut5", "#doughnut5-1", "#FEEBBA", "#896404");
doughnut5.DoughnutUpdate([50, 50]);
var doughnut6 = new DoughnutTwo("#doughnut6", "#doughnut6-1", "#FEEBBA", "#896404");
doughnut6.DoughnutUpdate([80, 20]);
