// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}

function checkH5() {
	var useragent = navigator.userAgent;
	var reg = /BeanGo/gi;
	if (useragent.indexOf("BeanGo") > -1 || reg.test(useragent)) {
		return true;
	} else {
		return false;
	}
}
gsap.registerPlugin(MotionPathPlugin);

function Car(current, start, mission, index) {
	if (start == 1) {
		return;
	}
	var car = ".car" + current;
	var pathMask = ".path" + current;
	var path;
	var end, strokeDashoffset;
	var duration = 2.5;

	if (isMobile.any) {
		pathMask = ".mb-path" + current;
	}
	if (mission == 0) {
		end = 0;
		strokeDashoffset = 0;
	}
	if (current < 8) {
		path = "#path1-" + current;
		if (mission == 1) {
			end = 0.24;
			strokeDashoffset = -300;
		}
		if (mission == 2) {
			end = 0.61;
			strokeDashoffset = -825;
		}
		if (mission == 3) {
			end = 1;
			strokeDashoffset = -1302;
		}
		if (isMobile.any) {
			path = "#path3-" + current;
			if (mission == 1) {
				end = 0.36;
				strokeDashoffset = -300;
			}
			if (mission == 2) {
				end = 0.7;
				strokeDashoffset = -500;
			}
			if (mission == 3) {
				end = 1;
				strokeDashoffset = -706;
			}
		}
	} else {
		path = "#path2-" + current;
		if (mission == 1) {
			end = 0.23;
			strokeDashoffset = -300;
		}
		if (mission == 2 || mission == 3) {
			end = 1;
			strokeDashoffset = -1070;
		}
		if (isMobile.any) {
			path = "#path4-" + current;
			if (mission == 1) {
				end = 0.45;
				strokeDashoffset = -300;
			}
			if (mission == 2 || mission == 3) {
				end = 1;
				strokeDashoffset = -657;
			}
		}
	}
	duration = duration * (end - start);
	store.state.Missions[index].start = end;
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

// H5 BeanH5初始化
function BeanGoGetToken() {
	return axios({
		method: "post",
		url: "../../api/E20220916/BeanGoGetToken"
	});
}

// 初始化
function SenderInit() {
	return new Promise((resolve, reject) => {
		try {
			const sender = beanfunWebTraceSDK.init({
				BUID: "GAMA-bf-01",
				property: "beanfun",
				sourceProperty: "gtw"
			});
			resolve(sender);
		} catch (err) {
			reject("Error:beanfunWebTraceSDK - init");
			throw new Error("Error:beanfunWebTraceSDK - init");
		}
	});
}

// 頁面出現時
function PageViewEvent(sender, { eventId = "4100", event = "", page = "", tab = "" } = {}) {
	return new Promise((resolve, reject) => {
		try {
			const result = sender.passEvent(
				new beanfunWebTraceSDK.events.PageViewEvent({
					eventId,
					event,
					pageInfo: { page }
				})
			);
			resolve(result);
		} catch (e) {
			reject("Error:beanfunWebTraceSDK: " + tab);
			throw new Error("Error:beanfunWebTraceSDK: " + tab);
		}
	});
}

// 按鈕點擊
function ClickEvent(sender, { eventId = "4101", event = "", pagePage = "", pageName = "", type = "", clickName = "", status = "", url = "", tab = "" } = {}) {
	let pageInfo = {
		page: pagePage
	};
	let clickInfo = { type, name: clickName };
	pageName ? (pageInfo.name = pageName) : "";
	status ? (clickInfo.status = status) : "";
	url ? (clickInfo.url = url) : "";
	return new Promise((resolve, reject) => {
		try {
			const result = sender.passEvent(
				new beanfunWebTraceSDK.events.ClickEvent({
					eventId,
					event,
					pageInfo,
					clickInfo
				})
			);
			resolve(result);
		} catch (e) {
			resolve("Error:beanfunWebTraceSDK: " + tab);
			throw new Error("Error:beanfunWebTraceSDK: " + tab);
		}
	});
}
var vConsole = new window.VConsole();
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		return;
	}
});
$("body").on("click", ".gameHomePage", function (e) {
	e.preventDefault();
	ClickEvent({
		eventId: "4101",
		event: "gtw_home_page_item_click",
		pagePage: "kr_202209_h5",
		pageName: "KR 世界巡懷之旅活動頁 - H5",
		type: "watermark",
		clickName: "home",
		tab: "【活動說明】按鈕點擊"
	})
		.then((res) => {
			var home_url = [location.host, location.host + "/", location.host + "/Home/Index", location.host + "/Home/Index/", location.host + "/Home/Initialize"];
			var bfweb_location = ["alpha-bfweb.beanfun.com", "bfweb.beanfun.com"];
			var act_location_alpha = ["alpha-event.beanfun.com", "alpha-tw-event.beanfun.com"];
			var act_location = ["event.beanfun.com", "tw-event.beanfun.com"];
			var data;
			if (bfweb_location.indexOf(location.host) != -1) {
				if (home_url.indexOf(location_url) == -1) {
					data = location.host;
				}
			} else {
				if (act_location_alpha.indexOf(location.host) != -1) {
					data = "alpha-bfweb.beanfun.com";
				} else if (act_location.indexOf(location.host) != -1) {
					data = "bfweb.beanfun.com";
				} else {
					data = "bfweb.beanfun.com";
				}
			}
			setTimeout(() => {
				location.href = "https://" + data + "/?SkipFlag=1";
			}, 300);
		})
		.catch((err) => {
			console.log(err);
		});
});

function TrackInit() {
	return Promise.all([BeanGoGetToken(), SenderInit()]);
}

var vm = new Vue({
	el: "#app",
	store: store,
	created() {
		BGO.check_app_exist((e) => {
			e.error == 404 ? (this.h5 = isMobile.any) : (this.h5 = isMobile.any);
		});
	},
	mounted() {
		var track = {
			eventId: 4100,
			event: "gtw_events_page_view",
			page: "kr_202209_Web",
			tab: "世界巡懷之旅活動頁面出現"
		};
		if (this.h5) {
			this.link = "Login_H5.aspx";
			track.page = "kr_202209_h5";
		} else {
			this.link = "Login.aspx";
			track.page = "kr_202209_Web";
		}
		TrackInit()
			.then((res) => {
				let [bgo, sender] = res;
				let { ResultData } = bgo.data.Data;
				let { BGO_Token, BGO_OfficialAccountID } = ResultData;
				try {
					BGO.init({
						token: BGO_Token,
						official_account_id: BGO_OfficialAccountID
					});
				} catch (err) {
					throw new Error("Error:" + err);
				}
				this.$store.commit("SET_SENDER", sender);
				PageViewEvent(sender, track);
			})
			.then((res) => {
				if (!$("#hfData").val()) {
					return;
				}
				var _data = {
					getGameAccount: false,
					GameAccount: "",
					data: $("#hfData").val()
				};
				if (this.h5) {
					_data.getGameAccount = true;
				}
				loadingShow();
				Init(_data).then((res) => {
					loadingHide();
					let { Data, Code, Message, Url } = res.data;
					if (Code == -2) {
						MessageLB(Message, Url);
						return;
					}
					if (this.h5) {
						let { GameAccounts } = Data;
						if (GameAccounts.length == 0) {
							JoinAccountNothing();
							return;
						}
						JoinAccount(GameAccounts);
						return;
					}
					let { Page } = Data;
					this.CharacterName = Page.CharacterName;
					this.link = "Logout.aspx";
					this.login = true;
					this.$store.commit("SET_INIT", Data);
					this.$nextTick(() => {
						Car(this.current, this.$store.state.Missions[0].start, this.$store.state.Missions[0].complete, 0);
					});
				});
			});
	},
	computed: {
		GetterMissions() {
			return this.$store.getters.GetterMissions;
		}
	},
	data: {
		h5: false,
		link: "",
		login: false,
		total: 12,
		current: 1,
		CharacterName: "",
		ajax: false
	},
	watch: {
		current: function (newVal) {
			this.currentChange(newVal);
		}
	},
	methods: {
		currentChange(cur) {
			var MissionIndex = this.$store.state.Missions.findIndex(function (v, i) {
				return v.MissionInt == cur;
			});
			Car(cur, this.$store.state.Missions[MissionIndex].start, this.$store.state.Missions[MissionIndex].complete, MissionIndex);
		},
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
		changeAccount() {
			var track = {
				eventId: 4100,
				event: "kr_202209_h5",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "switch_acc",
				tab: "【請選擇欲參加的遊戲帳號 / 切換帳號】按鈕點擊"
			};
			if (this.ajax) {
				return;
			}
			var _data = {
				getGameAccount: true,
				GameAccount: "",
				data: $("#hfData").val()
			};
			this.ajax = true;
			loadingShow();
			Init(_data).then((res) => {
				this.ajax = false;
				loadingHide();
				let { Data, Code, Message, Url } = res.data;
				if (Code == -2) {
					MessageLB(Message, Url);
					return;
				}
				if (this.h5) {
					let { GameAccounts } = Data;
					ClickEvent(this.$store.state.sender, track);
					JoinAccount(GameAccounts);
					return;
				}
			});
		},
		openEventDirections() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "goto_rule",
				tab: "【活動說明】按鈕點擊"
			};
			if (this.h5) {
				track.pagePage = "kr_202209_h5";
			} else {
				track.pagePage = "kr_202209_Web";
			}
			ClickEvent(this.$store.state.sender, track).then((res) => {
				EventDirections(itemsList);
			});
		},
		openHistoryGame() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "goto_record",
				tab: "【跑跑里程碑】按鈕點擊"
			};
			if (this.h5) {
				track.pagePage = "kr_202209_h5";
			} else {
				track.pagePage = "kr_202209_Web";
			}

			if (!this.login) {
				location.href = this.link;
				return;
			}
			if (this.$store.state.Milestone != null) {
				ClickEvent(this.$store.state.sender, track).then((res) => {
					HistoryGame(this.$store.state.Milestone);
				});
				return;
			}
			if (this.ajax) {
				return;
			}
			this.ajax = true;
			loadingShow();
			Milestone(this.$store.state.data).then((res) => {
				this.ajax = false;
				loadingHide();
				let { Data, Code, Message, Url } = res.data;
				if (Code == -2) {
					MessageLB(Message, Url);
					return;
				}
				let { Milestone } = Data;
				this.$store.commit("SET_MILESTONE", Milestone);
				ClickEvent(this.$store.state.sender, track);
				HistoryGame(Milestone);
			});
		},
		openItemReward() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "goto_reward",
				tab: "【獎勵專區】按鈕點擊"
			};
			if (this.h5) {
				track.pagePage = "kr_202209_h5";
			} else {
				track.pagePage = "kr_202209_Web";
			}
			if (!this.login) {
				location.href = this.link;
				return;
			}

			if (this.ajax) {
				return;
			}

			var data = {
				Type: 0,
				data: this.$store.state.data
			};
			this.ajax = true;
			loadingShow();
			Award(data).then((res) => {
				this.ajax = false;
				loadingHide();
				let { Data, Code, Message, Url } = res.data;
				if (Code == -2) {
					MessageLB(Message, Url);
					return;
				}
				let { GetItemLog } = Data;
				this.$store.commit("SET_GET_ITEM_LOG", GetItemLog);
				ClickEvent(this.$store.state.sender, track);
				ItemReward(GetItemLog);
			});
		},
		openItemRewardWeb() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "goto_reward",
				tab: "【獎勵專區】按鈕點擊"
			};
			if (!this.login) {
				location.href = this.link;
				return;
			}
			// if (this.$store.state.GetItemLog != null) {
			// 	ClickEvent(this.$store.state.sender, track).then((res) => {
			// 		ItemRewardWeb(this.$store.state.GetItemLog);
			// 	});
			// 	return;
			// }
			if (this.ajax) {
				return;
			}
			this.ajax = true;
			loadingShow();
			var data = {
				Type: 2,
				data: this.$store.state.data
			};
			Award(data).then((res) => {
				this.ajax = false;
				loadingHide();
				let { Data, Code, Message, Url } = res.data;
				if (Code == -2) {
					MessageLB(Message, Url);
					return;
				}
				let { GetItemLog } = Data;
				this.$store.commit("SET_GET_ITEM_LOG", GetItemLog);
				ClickEvent(this.$store.state.sender, track);
				ItemRewardWeb(GetItemLog);
			});
		},
		eventJoin() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "signup",
				tab: "【點選參加】按鈕點擊"
			};
			if (this.h5) {
				track.pagePage = "kr_202209_h5";
			} else {
				track.pagePage = "kr_202209_Web";
			}
			ClickEvent(this.$store.state.sender, track).then((res) => {
				location.href = this.link;
			});
		},
		eventBooking() {
			var track = {
				eventId: 4100,
				event: "gtw_events_item_click",
				pagePage: "kr_202209_Web",
				type: "btn",
				clickName: "intro_signbook",
				url: "javascript:;",
				tab: "【簽到簿】按鈕點擊"
			};
			ClickEvent(this.$store.state.sender, track).then((res) => {
				window.open(track.url, "_blank");
			});
		},
		eventUnlock(e) {
			var status = e.target.getAttribute("data-unlock");
			var pre;
			if (!this.login) {
				return;
			}
			if (status == 1) {
				return;
			}
			if (this.current > 1) {
				pre = this.current - 1;
				var mission = store.state.Missions.filter(function (v, i) {
					return v.MissionInt == pre;
				})[0];
				if (!mission.Unlock) {
					MessageLB("上一關尚未解鎖完成");
					return;
				}
			}
			PointEnough(this.current);
		}
	}
});
