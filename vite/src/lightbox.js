import { GetServerList, GetUserData, InsertUserData } from "./api";
import { levelFilter, levels } from "./dollType";
import { loadingHide, loadingShow } from "./loading";
import { mainStore } from "./store/index";
let ajax = false;
export function MessageLB(msg, url, callback) {
	$.gbox.open(`<div class="lb-message__text">${msg}</div>`, {
		addClass: "default lb-message",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose() {
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
				text: "關閉",
				class: "lb-btn__close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	});
}

// 選擇娃娃
export function SelectDoll(data) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "lb-btn__confirm",
				click: function () {
					if (ajax) {
						return;
					}
					var serverId = $("#server option:checked").val();
					var charName = $("#character option:checked").val();
					const store = mainStore();
					store.setCarName(charName);
					loadingShow();
					ajax = true;
					InsertUserData(store.getData)
						.then((res) => {
							const { Code, Message, url, ListData } = res.data;
							if (Code == -1) {
								MessageLB(Message, url);
								return;
							}
							if (Code == -2) {
								MessageLB(Message);
								return;
							}
							return GetUserData(store.getData);
						})
						.then((res) => {
							const { Code, Message, url, ListData } = res.data;
							if (Code == -1) {
								MessageLB(Message, url);
								return;
							}
							if (Code == -2) {
								MessageLB(Message);
								return;
							}
							if (Code == 1) {
								const { Data } = res.data;
								store.init(Data);
								store.changePage("doll");
								return;
							}
						})
						.finally(() => {
							loadingHide();
							$.gbox.close();
							ajax = false;
						});
				}
			},
			{
				text: "取消",
				class: "lb-btn__cancel",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var serverHTML = '<option value="-1">選擇伺服器</option>';
	var characterHTML = '<option value="-1">選擇遊戲角色</option>';
	if (data) {
		data.forEach(function (v, i) {
			serverHTML += `<option value="${v.id}">${v.name}</option>`;
		});
	}
	var HTML = `<div class="lb-title">選擇娃娃</div>
		<div class="lb-select__box">
			<div class="lb-select__title">魔法娃娃綁定伺服器</div>
			<div class="lb-select__group">
				<select name="server" id="server">
				${serverHTML}
				</select>
			</div>
		</div>
		<div class="lb-select__box">
			<div class="lb-select__title">遊戲角色</div>
			<div class="lb-select__group">
				<select name="server" id="character">
					<option value="-1">選擇遊戲角色</option>
				</select>
			</div>
		</div>
		<div class="lb-select__notice">(※選擇娃娃階段於本活動僅有此綁定機會)</div>
	`;
	$.gbox.open(HTML, config);
}

// 夥友名單
export function Partners(partnerdata, invitelog) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn__close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var partnersHTML = "";
	var invitelogHTML = "";
	var invitelogPower = 0;
	if (partnerdata && partnerdata.length > 0) {
		partnerdata.forEach(function (v, i) {
			partnersHTML += `
			<div class="lb-partner__box">
			<div class="lb-partner__head">
				<span class="lb-partner__server">${v.ServerName}</span>
				<span class="lb-partner__name">${v.CharacterName}</span>
				<span class="lb-partner__level">${levelFilter(levels, v.SecretTechniquePoint).level}</span>
			</div>
			<div class="lb-partner__body">累積成長點數：${v.TotalPoint}</div>
		</div>
			`;
		});
	}
	if (invitelog && invitelog.length > 0) {
		invitelog.forEach(function (v, i) {
			var levelData = levelFilter(levels, v.SecretTechniquePoint);
			invitelogPower += levelData.type;
			invitelogHTML += `
			<div class="lb-partner__box">
				<div class="lb-partner__head">
					<span class="lb-partner__server">${v.CodeServerName}</span>
					<span class="lb-partner__name">${v.CodeCharacterName}</span>
					<span class="lb-partner__level">${levelData.level}</span>
				</div>
			</div>`;
		});
	}
	var HTML = `<div class="lb-partner lb-title">夥友名單</div>
	<div class="lb-partner__title">養娃秘笈回填者</div>
	<div class="lb-partner__content">${partnersHTML}</div>
	<div class="lb-partner__title">
		<div>養娃秘笈回填者</div>
		<div>累積成長點數加成<span class="lb-partner__red">+${invitelogPower}%</span></div>
	</div>
	<div class="lb-partner__content">${invitelogHTML}</div>
	`;
	$.gbox.open(HTML, config);
}

// 基本文字
export function DollText(text, type) {
	var color = "";
	if (type == 1) {
		color = "normal";
	}
	if (type == 3) {
		color = "hight";
	}
	if (type == 5) {
		color = "hero";
	}
	if (type == 7) {
		color = "legend";
	}
	var config = {
		addClass: "default lb-message",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn__close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var HTML = `<div class="lb-message__text ${color}">${text}</div>`;
	$.gbox.open(HTML, config);
}

// 啟動遊戲
export function SelectType() {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};
	var HTML = `
		<div class="lb-title">選擇遊戲服務</div>
		<div class="lb-type-box">
			<a href="https://tw.beanfun.com/game_zone/default.aspx?service_code=600035&service_region=T7" target="_blank" class="lb-btn__free">月費服</a>
			<a href="https://tw.beanfun.com/game_zone/default.aspx?service_code=600041&service_region=BE" target="_blank" class="lb-btn__month">免費服</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 任務內容5
export function Task() {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};
	const taskList = [
		{ type: 1, done: false, name: "角色達 65級", point: 10 },
		{ type: 2, done: false, name: "角色達 75級", point: 15 },
		{ type: 3, done: false, name: "角色達 80級", point: 25 },
		{ type: 4, done: false, name: "角色達 85級", point: 40 },
		{ type: 5, done: false, name: "AC數值達 100", point: 10 },
		{ type: 6, done: false, name: "AC數值達 110", point: 15 },
		{ type: 7, done: false, name: "AC數值達 120", point: 25 },
		{ type: 8, done: false, name: "AC數值達 125", point: 35 },
		{ type: 9, done: false, name: "AC數值達 130", point: 50 }
	];
	var listHTML = "";
	taskList.forEach(function (v, i) {
		listHTML += `
		<div class="lb-task__box">
			<div class="lb-task__goal">${v.name}</div>
			<div class="lb-task__point">${v.point}分</div>
		</div>
		`;
	});
	var HTML = `<div class="lb-title">任務內容</div>
	<div class="lb-task__content">
		${listHTML}
		<div class="lb-task__box">
			<div class="lb-task__goal">血盟成員達10/20/30/40/50人</div>
			<div class="lb-task__normal">10/24維護時結算<br />10/15/20/25/30分</div>
		</div>
		<div class="lb-task__box">
			<div class="lb-task__goal">每日完成點名</div>
			<div class="lb-task__normal">成長點數= 1材料*5分</div>
		</div>
		<div class="lb-task__box">
			<div class="lb-task__goal">攻略特定BOSS依照身上累積BOSS掉落素材獲得活動分數</div>
			<div class="lb-task__normal">成長點數= 1材料*20分</div>
		</div>
		<div class="lb-task__box">
			<div class="lb-task__goal">參加指定活動<br />獲得素材增加活動分數</div>
			<div class="lb-task__normal">成長點數= 1材料*10分</div>
		</div>
		<div class="lb-task__box">
			<div class="lb-task__goal">於beanfun! APP簽到簿進行簽到</div>
			<div class="lb-task__normal">成長點數=簽到次數*10分</div>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 成長日記
export function Diary(data) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn__close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var listHTML = "";
	if (data) {
		data.forEach(function (v, i) {
			listHTML += `<li class="lb-diary__li"><span class="lb-diary__text">早上OOO孤零零地看著窗外</span><span class="lb-diary__date">08/15 08:30</span></li>`;
		});
	}
	var HTML = `<div class="lb-title">成長日記</div>
	<ul class="lb-diary__list">${listHTML}</ul>`;
	$.gbox.open(HTML, config);
}

// 活動資訊
export function Info() {
	var config = {
		addClass: "default lb-info",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "參加活動",
				class: "lb-btn__join",
				click: function () {
					if (ajax) {
						return;
					}
					loadingShow();
					const store = mainStore();
					ajax = true;
					GetUserData(store.getData)
						.then((res) => {
							const { Code, Message, url } = res.data;

							if (Code == -1) {
								MessageLB(Message, url);
								return;
							}
							if (Code == -2) {
								MessageLB(Message);
								return;
							}
							if (Code == 0) {
								return GetServerList(store.getData);
							}
							if (Code == 1) {
								const { Data } = res.data;
								store.init(Data);
								store.changePage("doll");
								$.gbox.close();
								return;
							}
						})
						.then((res) => {
							if (res) {
								const { Code, Message, url, ListData } = res.data;
								if (Code == -1) {
									MessageLB(Message, url);
									return;
								}
								if (Code == -2) {
									MessageLB(Message);
									return;
								}
								SelectDoll(ListData);
							}
						})
						.catch((res) => {
							MessageLB(res);
						})
						.finally(() => {
							loadingHide();
							ajax = false;
						});
				}
			}
		]
	};
	var HTML = `
	<div>
		<div class="lb-info__box">
			<div class="lb-title">活動時間</div>
			<div class="lb-info__text">2022/09/28 16:30~2022/10/31 10:30</div>
		</div>
		<div class="lb-info__box">
			<div class="lb-title">活動方式</div>
			<div class="lb-info__text">帳號內擁有角色等級超過55級(含)以上即可報名。</div>
			<div class="lb-info__text lb-info__text--red">(注意事項：新創帳號或角色須待次日16:00系統更新資料後才可報名參加。)</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title">獨家的養娃秘笈</div>
			<div class="lb-info__img0"></div>
			<div class="lb-info__text">每個遊戲帳號參加活動時會取得一組個人的養娃秘笈序號(邀請碼)，每組邀請碼可供兩位朋友兌換，並取得一個可育成的火焰之子，透過累積成長點數進行養成。</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title">與其他人分享</div>
			<div class="lb-info__img1"></div>
			<div class="lb-info__text">養娃秘笈兌換序號可提供給其他玩家使用，每位玩家最多可兌換他人的養娃秘笈五組，每組序號可供兌換２次。</div>
			<div class="lb-info__text">玩家本身與使用邀請碼的兩位朋友，三者加總的成長點數，視為團隊積分，10/24結算團隊積分時，可獲得額外獎勵。</div>
			<div class="lb-info__text">每個遊戲帳號可兌換養娃秘笈5次，不同等級的養娃秘笈可獲得不同的成長速度加成，依照玩家兌換的邀請碼加總的加成數，進行成長點數的加成。</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title">每日獲得好禮</div>
			<div class="lb-info__img2"></div>
			<div class="lb-info__text lb-info__text--img2">魔法娃娃從啟動養成後，每日會取得一個成長禮物箱，依照娃娃的養成階段與帳號前一天是否有登入，可獲得不同的成長禮物，領取獎勵均會發放置綁定遊戲角色的倉庫中。</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title--big">完成任務獲得成長點數讓你的魔法娃娃成長茁壯</div>
			<div class="lb-info__img3"></div>
			<div class="lb-info__text">魔法娃娃的成長速度受指定任務達成狀況/養娃秘笈/遊戲登入影響。</div>
			<div class="lb-info__text">10/24進行魔法娃娃育成結算，可獲得不同階段的獎勵；另可依照團隊積分獲得額外獎勵。</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title">獲得育成的魔法娃娃</div>
			<div class="lb-info__img4"></div>
			<div class="lb-info__text">當成長點數累積到4,501值時，即可獲得爆擊火焰衝擊的魔導師帕歐或爆擊火焰衝擊的魔騎士帕克魔法娃娃。</div>
		</div>
		<div class="lb-info__box lb-info__box--left">
			<div class="lb-title">終極團隊大獎</div>
			<div class="lb-info__img5"></div>
			<div class="lb-info__text">每個遊戲帳號與使用養娃秘笈的兩位玩家加總的成長點數視為團隊積分。</div>
			<div class="lb-info__text">10/24活動結算後，發放至所選擇遊戲角色的倉庫。</div>
		</div>
	</div>
	<div class="lb-info__grid">
		<div class="lb-info__row">
			<div class="lb-info__column">團隊積分</div>
			<div class="lb-info__column">對應獎勵</div>
		</div>
		<div class="lb-info__row">
			<div class="lb-info__column">10,001~40,000</div>
			<div class="lb-info__column">
				<span>最佳放置獎</span>
				<span>(六芒星護身符)</span>
			</div>
		</div>
		<div class="lb-info__row">
			<div class="lb-info__column">40,001~75,000</div>
			<div class="lb-info__column">
				<span>成團遺珠獎</span>
				<span>(遠古六芒星)</span>
			</div>
		</div>
		<div class="lb-info__row">
			<div class="lb-info__column">75,001以上</div>
			<div class="lb-info__column">
				<span>團結一心獎</span>
				<span>(傲龍魔法符、萬能藥補給箱子、殷海薩加護:15日)</span>
			</div>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}
