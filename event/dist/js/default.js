// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}

gsap.registerPlugin(MotionPathPlugin);

// gsao.to('path', 6, {strokeDashoffset:0});

//  pc 1 0.76 0.39 0
//  mb 0 0.36 0.7 1
// pc strokeDashoffset 0 300 825 1302
// mb strokeDashoffset 0 -300 -500 -706
// mb-path

// pc 0 0.23 1
// mb 0 0.45 1
// pc strokeDashoffset 0 -300 -1070
// mb strokeDashoffset 0 -300 -657
// mb-path
function Car(current, mission) {
	var car = ".car" + current;
	var pathMask = ".path" + current;
	var path;
	var start, end, strokeDashoffset;
	var duration = 5;
	if (isMobile.any) {
		pathMask = ".mb-path" + current;
	}
	if (current < 8) {
		path = "#path1";
		if (mission == 1) {
			start = 1;
			end = 0.76;
			strokeDashoffset = 300;
			duration = duration * (start - end);
		}
		if (mission == 2) {
			start = 1;
			end = 0.39;
			strokeDashoffset = 825;
			duration = duration * (start - end);
		}
		if (mission == 3) {
			start = 1;
			end = 0;
			strokeDashoffset = 1302;
			duration = duration * (start - end);
		}
		if (isMobile.any) {
			path = "#path3";
			if (mission == 1) {
				start = 0;
				end = 0.36;
				strokeDashoffset = -300;
				duration = duration * (end - start);
			}
			if (mission == 2) {
				start = 0;
				end = 0.7;
				strokeDashoffset = -500;
				duration = duration * (end - start);
			}
			if (mission == 3) {
				start = 0;
				end = 1;
				strokeDashoffset = -706;
				duration = duration * (end - start);
			}
		}
	} else {
		path = "#path2";
		if (mission == 1) {
			start = 0;
			end = 0.23;
			strokeDashoffset = -300;
			duration = duration * (end - start);
		}
		if (mission == 2) {
			start = 0;
			end = 1;
			strokeDashoffset = -1070;
			duration = duration * (end - start);
		}
		if (isMobile.any) {
			path = "#path4";
			if (mission == 1) {
				start = 0;
				end = 0.45;
				strokeDashoffset = -300;
				duration = duration * (end - start);
			}
			if (mission == 2) {
				start = 0;
				end = 1;
				strokeDashoffset = -657;
				duration = duration * (end - start);
			}
		}
	}
	var onDiv = gsap.to(car, {
		duration: duration,
		ease: Linear.easeNone,
		motionPath: {
			path: path,
			align: path,
			autoRotate: true,
			alignOrigin: [0.5, 0.5],
			start: start,
			end: end,
			autoRotate: false
		}
	});
	gsap.to(pathMask, { duration: duration, ease: Linear.easeNone, strokeDashoffset: strokeDashoffset });
}
var vm = new Vue({
	el: "#app",
	store: store,
	mounted() {},
	computed: {
		GetterMissions() {
			var _Missions = this.Missions.map(function (m, i) {
				m.complete = 0;
				for (var status in m.MissionStatus) {
					if (m.MissionStatus[status] > 0) {
						m.complete += 1;
					}
				}
				return m;
			});
			return _Missions;
		}
	},
	data: {
		total: 12,
		current: 1,
		point: "",
		account: "",
		Missions: [
			{
				MissionInt: 1,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 1,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 2,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 3,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 4,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 5,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 6,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 7,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 8,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 9,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 10,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 11,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			},
			{
				MissionInt: 12,
				Unlock: 0,
				MissionStatus: {
					MissionStatus1: 0,
					MissionStatus2: 0,
					MissionStatus3: 0
				}
			}
		]
	},
	methods: {
		nextLevel() {
			this.current++;
			if (this.current > 12) {
				this.current = 12;
			}
		},
		prevLevel() {
			this.current--;
			if (this.current < 1) {
				this.current = 1;
			}
		},
		openEventDirections() {
			EventDirections(itemsList);
		},
		openHistoryGame() {
			HistoryGame(pointLists);
		},
		openItemReward() {
			ItemReward();
		},
		openItemRewardWeb() {
			ItemRewardWeb();
		},
		eventBooking() {},
		eventSelectAccount() {
			JoinAccount();
		},
		eventUnlock(e) {
			var status = e.target.getAttribute("data-unlock");
			if (status < 1) {
				return;
			}
			// PointEnough();
			// PointNotEnough();
			// Wait();
		}
	}
});
