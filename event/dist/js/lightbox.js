var ajax = false;

function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default lb-msg",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			if (url) window.location.href = url;
			else {
				$.gbox.close();
				if (callback) {
					callback();
				}
			}
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				target: false,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				}
			}
		]
	});
}

var itemsList = [
	{ label: "一", name: "凜風V1(永久)" },
	{ label: "二", name: "強化產包black" },
	{ label: "三", name: "復仇者V1(永久)" },
	{ label: "四", name: "睏寶娃娃抽獎資格" },
	{ label: "五", name: "跑跑實體袋子抽獎資格" },
	{ label: "六", name: "跑跑實體貼紙抽獎資格" },
	{ label: "七", name: "跑跑實體貼紙抽獎資格" },
	{ label: "八", name: "跑跑實體遊戲產包抽獎資格" },
	{ label: "九", name: "跑跑實體遊戲產包抽獎資格" },
	{ label: "十", name: "跑跑實體遊戲產包抽獎資格" },
	{ label: "十一", name: "跑跑實體車款紙模型抽獎資格" },
	{ label: "十二", name: "跑跑實體雨傘抽獎資格" }
];

// 選擇遊戲帳號
function JoinAccount(accounts) {
	var config = {
		addClass: "default lb-join",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "下一步",
				class: "btn-select-account",
				click: function () {
					if (ajax) {
						return;
					}
					ajax = true;
					loadingShow();
					var _data = {
						getGameAccount: false,
						GameAccount: $(".lb-join__radio:checked").val(),
						data: $("#hfData").val()
					};
					Init(_data).then((res) => {
						ajax = false;
						loadingHide();
						let { Data, Code, Message, Url } = res.data;
						if (Code == -2) {
							MessageLB(Message, Url);
							return;
						}
						let { Page } = Data;
						vm.CharacterName = Page.CharacterName;
						vm.link = "Logout.aspx";
						vm.login = true;
						store.commit("SET_INIT", Data);

						JoinAccountComplete();
					});
				}
			}
		]
	};
	let accountHTML = "";
	if (accounts.length > 0) {
		accounts.forEach(function (v, i) {
			accountHTML += `
			<div class="lb-join__account-box">
				<label for="${v.GameAccount}" class="lb-join__label">
					<input type="radio" id="${v.GameAccount}" class="lb-join__radio" name="account" value="${v.GameAccount}" />
					<span class="lb-join__style"></span>
					<span class="lb-join__account">${v.DisplayName}</span>
				</label>
			</div>
			`;
		});
	}
	var HTML = `
		<div class="lb-join__title lb-title__account"></div>
		<div class="lb-join__dashed lb-dashed1"></div>
		<div class="lb-join__account-list">${accountHTML}</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇遊戲帳號 - 參加完成
function JoinAccountComplete() {
	var config = {
		addClass: "default lb-join-complete",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				click: function () {
					var track = {
						eventId: 4100,
						event: "gtw_events_item_click",
						pagePage: "kr_202209_account_h5_dialog",
						type: "btn",
						clickName: "confirm",
						tab: "［選擇欲參加的遊戲帳號］彈窗 參加完成【確認】按鈕點擊"
					};
					ClickEvent(store.state.sender, track).then((res) => {
						vm.$nextTick(() => {
							Car(vm.current, store.state.Missions[0].start, store.state.Missions[0].complete, 0);
						});
						$.gbox.close();
					});
				}
			}
		]
	};

	var HTML = `
		<div class="lb-join-complete__title lb-title__join"></div>
	`;
	$.gbox.open(HTML, config);
}

// 無遊戲帳號
function JoinAccountNothing() {
	var config = {
		addClass: "default lb-join-nothing",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "前往遊戲館",
				class: "btn-create",
				click: function () {
					var track = {
						eventId: 4100,
						event: "gtw_events_item_click",
						pagePage: "kr_202209_accnull_h5_dialog",
						type: "btn",
						clickName: "confirm",
						url: "",
						tab: "［沒有遊戲帳號］彈窗【前往遊戲館】按鈕點擊"
					};
					ClickEvent(store.state.sender, track).then((res) => {
						location.href = "";
					});
				}
			}
		]
	};

	var HTML = `<div class="lb-join-nothing__title lb-title__no-account"></div>`;
	$.gbox.open(HTML, config);
}

// 活動說明
function EventDirections(items) {
	var config = {
		addClass: "default lb-directions",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".lb-directions__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				},
				advanced: { extraDraggableSelectors: ".lb-directions__content" }
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};
	var itemsHTML = "";
	items.forEach(function (v, i) {
		itemsHTML += `
		<div class="lb-directions__item-box">
			<span class="lb-directions__item-title">第${v.label}關</span>
			<span class="lb-directions__item-name">${v.name}</span>
		</div>
		`;
	});
	var HTML = `
		<div class="lb-title__directions"></div>
		<div class="lb-directions__dashed lb-dashed2"></div>
		<div class="lb-directions__content">
			<ol class="lb-directions__list">
				<li class="lb-directions__li">每個主題關卡僅能完成一次，每個主題關卡任務條件都為<span class="blue">該主題完成行駛10回合。</span></li>
				<li class="lb-directions__li">共有12個大關卡，每完成一個大關卡可獲的虛寶或實體獎勵抽獎資格。</li>
				<li class="lb-directions__li">每天中午12:00點更新遊戲任務進度，要有登出遊戲才會更新。</li>
				<li class="lb-directions__li">虛寶獎勵將於2小時後發放至遊戲內禮物盒。</li>
				<li class="lb-directions__li">活動時間：2022/9/16 12:00PM~2022/12/16 09:59 AM</li>
			</ol>
			<div class="lb-directions__title-bg">
				<div class="lb-title__directions-sub"></div>
			</div>
			<div class="lb-directions__rewards"></div>
			<div class="lb-directions__item-list">${itemsHTML}</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 跑跑里程碑
function HistoryGame(data) {
	var pointLists = [
		{ title: "玩家等級", point: "0" },
		{ title: "多人遊玩場次", point: "0" },
		{ title: "車輛蒐集數", point: "0" },
		{ title: "角色蒐集數", point: "0" },
		{ title: "徽章總數", point: "0" },
		{ title: "累積在線時間", point: "0" },
		{ title: "成就分數", point: "0" },
		{ title: "圖鑑登入數", point: "0" },
		{ title: "累計KOIN花費", point: "0" },
		{ title: "累計LUCCI花費", point: "0" },
		{ title: "累計樂豆點花費", point: "0" }
	];
	console.log(data);
	var config = {
		addClass: "default lb-history",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			if (isMobile.any) {
				$(".lb-history__content").mCustomScrollbar({
					theme: "light",
					contentTouchScroll: true,
					mouseWheel: {
						preventDefault: true
					},
					advanced: { extraDraggableSelectors: ".lb-history__content" }
				});
			}
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};
	var pointListHTML = "";
	pointLists.forEach(function (v, i) {
		pointListHTML += `
	<div class="lb-history__game-box">
		<span class="lb-history__game-title">${v.title}</span>
		<span class="lb-history__game-num">${v.point}</span>
	</div>
		`;
	});
	var HTML = `
		<div class="lb-history__content">
			<div class="lb-history__title lb-title__history"></div>
			<div class="lb-history__point-group">
				<div class="lb-history__point-total">
					<span class="lb-history__point-title lb-title__history-sub"></span>
					<span class="lb-history__point-num">${data == null ? 0 : data.Fraction}</span>
				</div>
			</div>
			<div class="lb-history__game-list">${pointListHTML}</div>
			<div class="lb-history__notice">
				<div class="lb-history__notice-title">注意事項</div>
				<ul class="lb-history__notice-list">
					<li class="lb-history__notice-li">遊戲紀錄每日 12:00PM 更新</li>
					<li class="lb-history__notice-li">跑跑點數記錄方式</li>
					<li class="lb-history__notice-li">車款/角色蒐集數量皆為道具圖鑑數量</li>
				</ul>
			</div>
			<div class="lb-history__rule"></div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 點數足夠
function PointEnough(current) {
	var config = {
		addClass: "default lb-point",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				click: function () {
					var point = store.state.Point;
					if (point < 300) {
						PointNotEnough();
						return;
					}
					if (ajax) {
						return;
					}
					ajax = true;
					loadingShow();
					var data = { MissionInt: vm.current, data: store.state.data };
					Unlock(data).then((res) => {
						ajax = false;
						loadingHide();
						let { Data, Code, Message, Url } = res.data;
						if (Code == -1) {
							if (Message == 2) {
								PointNotEnough();
								return;
							}
							if (Message == 3) {
								Wait();
								return;
							}
							if (Message == 4) {
								MessageLB("小關卡尚未完成");
								return;
							}
							if (Message == 5) {
								MessageLB("上一關尚未解鎖完成");
								return;
							}
							return;
						}
						if (Code == -2) {
							MessageLB(Message, Url);
							return;
						}
						let { Missions, Point } = Data;
						store.commit("SET_MISSIONS", Missions);
						store.commit("SET_POINT", Point);
						if (current > 11) {
							$.gbox.close();
							vm.currentChange(12);
							return;
						}
						vm.$nextTick(function () {
							++vm.current;
						});
						$.gbox.close();
					});
				}
			}
		]
	};
	var item = store.state.Missions.filter(function (v, i) {
		return v.MissionInt == current;
	})[0].ItemName;
	var HTML = `
		<div class="lb-point__title lb-title__need1"></div>
		<div class="lb-point__item">${item}</div>
		<div class="lb-point__title2 lb-title__need2"></div>
	`;
	$.gbox.open(HTML, config);
}

// 點數足夠-點數不足
function PointNotEnough() {
	var config = {
		addClass: "default lb-point-not-enough",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-point-not-enough__title lb-title__not-enough"></div>`;
	$.gbox.open(HTML, config);
}
// 無法解鎖
function Wait() {
	var config = {
		addClass: "default lb-wait",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-wait__title lb-title__wait"></div>
	`;
	$.gbox.open(HTML, config);
}
// 置入獎勵
function ItemReward(items) {
	var config = {
		addClass: "default lb-reward",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {
			$(".lb-reward__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				},
				advanced: { extraDraggableSelectors: ".lb-reward__content" }
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "置入獎勵",
				class: "btn-to",
				click: function () {
					var Seq = $(".lb-reward__radio:checked").val();
					if (!Seq) {
						return;
					}
					if (ajax) {
						return;
					}
					ajax = true;
					loadingShow();
					var data = {
						Seq: Seq,
						data: store.state.data
					};

					Exchange(data).then((res) => {
						ajax = false;
						loadingHide();
						let { Data, Code, Message, Url } = res.data;
						if (Code == -2) {
							MessageLB(Message, Url);
							return;
						}
						ItemRewardComplete();
					});
				}
			},
			{
				text: "領獎記錄",
				class: "btn-history",
				click: function () {
					var data = {
						Type: 2,
						data: store.state.data
					};
					// if (store.state.GetItemLog != null) {
					// 	ItemRewardHistory(store.state.GetItemLog);
					// 	return;
					// }
					if (ajax) {
						return;
					}
					ajax = true;
					loadingShow();
					Award(data).then((res) => {
						ajax = false;
						loadingHide();
						let { Data, Code, Message, Url } = res.data;
						if (Code == -2) {
							MessageLB(Message, Url);
							return;
						}
						let { GetItemLog } = Data;
						store.commit("SET_GET_ITEM_LOG", GetItemLog);
						ItemRewardHistory(GetItemLog);
					});
				}
			}
		]
	};
	var itemHTML = "";
	if (items.length > 0) {
		items.forEach(function (v, i) {
			itemHTML += `
			<label for="${v.Seq}" class="lb-reward__label">
				<input type="radio" id="${v.Seq}" class="lb-reward__radio" name="award" value="${v.Seq}" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">${v.ItemName}</span>
			</label>
			`;
		});
	}
	var HTML = `
	<div class="lb-reward__title"></div>
	<div class="lb-reward__dashed1 lb-dashed1"></div>
	<div class="lb-reward__content">
		<div class="lb-reward__list">${itemHTML}</div>
	</div>
	<div class="lb-reward__dashed lb-dashed1"></div>
	<div class="lb-reward__notice">
		<p>道具將於2小時內置入完成，</p>
		<p>若道具置入失敗請重新選擇置入</p>
	</div>
	<div class="lb-reward__qrcode"></div>
	`;
	$.gbox.open(HTML, config);
}
// 置入完成
function ItemRewardComplete() {
	var config = {
		addClass: "default lb-reward-complete",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "我還要",
				class: "btn-more",
				click: function () {
					var track = {
						eventId: 4100,
						event: "gtw_events_item_click",
						pagePage: "kr_202209_reward_dialog",
						type: "btn",
						clickName: "exch_more",
						url: "",
						tab: "［獎勵已發放至遊戲中］彈窗 -【我還要】按鈕點擊"
					};
					ClickEvent(store.state.sender, track).then((res) => {
						location.href = "";
						$.gbox.close();
					});
				}
			}
		]
	};

	var HTML = `
	<div class="lb-reward__title lb-title__reward-complete"></div>
	<div class="lb-reward__notice">
		<p>道具將於2小時內置入完成，</p>
		<p>若道具置入失敗請重新選擇置入</p>
	</div>
	`;
	$.gbox.open(HTML, config);
}
// 領獎記錄
function ItemRewardHistory(items) {
	var config = {
		addClass: "default lb-reward-history",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".lb-reward-history__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				},
				advanced: { extraDraggableSelectors: ".lb-reward-history__content" }
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};
	var itemHTML = "";
	if (items.length > 0) {
		items.forEach(function (v, i) {
			itemHTML += `<div class="lb-reward-history__box">
			<span class="lb-reward-history__name">${v.ItemName}</span>
			<span class="lb-reward-history__date">${v.CreateTime}</span>
		</div>`;
		});
	}
	var HTML = `
		<div class="lb-reward-history__content">
			<div class="lb-reward-history__list">${itemHTML}</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

function ItemRewardWeb(items) {
	var config = {
		addClass: "default lb-reward lb-reward-web",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".lb-reward__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				},
				advanced: { extraDraggableSelectors: ".lb-reward__content" }
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};

	var itemHTML = "";
	if (items.length > 0) {
		items.forEach(function (v, i) {
			itemHTML += `<div class="lb-reward__label">
			<span class="lb-reward__style"></span>
			<span class="lb-reward__item">${v.ItemName}</span>
			<span class="lb-reward__date">${v.CreateTime}</span>
			<span class="lb-reward__status">已領取</span>
		</div>`;
		});
	}
	var HTML = `
	<div class="lb-reward__title"></div>
	<div class="lb-reward__dashed1 lb-dashed1"></div>
	<div class="lb-reward__content">
		<div class="lb-reward__list">${itemHTML}</div>
	</div>
	<div class="lb-reward__dashed lb-dashed1"></div>
	<div class="lb-reward__notice">
		<p>道具將於2小時內置入完成，</p>
		<p>若道具置入失敗請重新選擇置入</p>
	</div>
	<div class="lb-reward__qrcode"></div>
	`;
	$.gbox.open(HTML, config);
}
