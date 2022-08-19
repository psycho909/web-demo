var config = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "text1",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
		{
			text: "text2",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
	],
};

function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
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
				},
			},
			{
				text: "取消",
				class: "btn-cancel",
				click: function () {
					$.gbox.close();
				},
			},
		],
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
	{ label: "十二", name: "跑跑實體雨傘抽獎資格" },
];

// 選擇遊戲帳號
function JoinAccount() {
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
					$.gbox.close();
				},
			},
		],
	};

	var HTML = `
		<div class="lb-join__title lb-title__account"></div>
		<div class="lb-join__dashed lb-dashed1"></div>
		<div class="lb-join__account-list">
			<div class="lb-join__account-box">
				<label for="a" class="lb-join__label">
					<input type="radio" id="a" class="lb-join__radio" />
					<span class="lb-join__style"></span>
					<span class="lb-join__account">一二三四五六七八九十一二三四五六七八九十</span>
				</label>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// JoinAccount();
// 選擇遊戲帳號 - 參加完成
function JoinAccountComplete() {
	var config = {
		addClass: "default lb-join-complete",
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
				},
			},
		],
	};

	var HTML = `
		<div class="lb-join-complete__title lb-title__join"></div>
	`;
	$.gbox.open(HTML, config);
}
// JoinAccountComplete();

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
					$.gbox.close();
				},
			},
		],
	};

	var HTML = `<div class="lb-join-nothing__title lb-title__no-account"></div>`;
	$.gbox.open(HTML, config);
}
// JoinAccountNothing();

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
					preventDefault: true,
				},
				advanced: { extraDraggableSelectors: ".account-list" },
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [],
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
// EventDirections(itemsList);

var pointLists = [
	{ title: "玩家等級", point: "一二三四五六七八" },
	{ title: "多人遊玩場次", point: "一二三四五六七八" },
	{ title: "車輛蒐集數", point: "一二三四五六七八" },
	{ title: "角色蒐集數", point: "一二三四五六七八" },
	{ title: "徽章總數", point: "一二三四五六七八" },
	{ title: "累積在線時間", point: "一二三四五六七八" },
	{ title: "成就分數", point: "一二三四五六七八" },
	{ title: "圖鑑登入數", point: "一二三四五六七八" },
	{ title: "累計KOIN花費", point: "一二三四五六七八" },
	{ title: "累計LUCCI花費", point: "一二三四五六七八" },
	{ title: "累計樂豆點花費", point: "一二三四五六七八" },
];
// 跑跑里程碑
function HistoryGame(lists) {
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
						preventDefault: true,
					},
					advanced: { extraDraggableSelectors: ".account-list" },
				});
			}
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [],
	};
	var pointListHTML = "";
	lists.forEach(function (v, i) {
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
					<span class="lb-history__point-num">一二三四五六七</span>
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
			<div class="lb-history__rule">
				<div class="lb-history__rule-title">※跑跑點數計算※</div>
				<table class="lb-history__rule-table">
					<thead class="lb-history__rule-thead">
						<tr class="lb-history__rule-tr">
							<th>項目</th>
							<th>累積數</th>
							<th>跑跑點數</th>
						</tr>
					</thead>
					<tbody class="lb-history__rule-tbody">
						<tr class="lb-history__rule-tr">
							<td>多人遊玩場次</td>
							<td>10</td>
							<td>1</td>
						</tr>
						<tr class="lb-history__rule-tr">
							<td>累積在線時間(小時)</td>
							<td>10</td>
							<td>1</td>
						</tr>
						<tr class="lb-history__rule-tr">
							<td>徽章總數</td>
							<td>1</td>
							<td>1</td>
						</tr>
						<tr class="lb-history__rule-tr">
							<td>成就分數</td>
							<td>1</td>
							<td>1</td>
						</tr>
						<tr class="lb-history__rule-tr">
							<td>圖鑑登入數</td>
							<td>1</td>
							<td>1</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// HistoryGame(pointLists);

// 點數足夠
function PointEnough(item) {
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
					$.gbox.close();
				},
			},
		],
	};

	var HTML = `
		<div class="lb-point__title lb-title__need1"></div>
		<div class="lb-point__item">${item}</div>
		<div class="lb-point__title2 lb-title__need2"></div>
	`;
	$.gbox.open(HTML, config);
}
// PointEnough();

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
				},
			},
		],
	};

	var HTML = `<div class="lb-point-not-enough__title lb-title__not-enough"></div>`;
	$.gbox.open(HTML, config);
}
// PointNotEnough();
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
				},
			},
		],
	};

	var HTML = `
		<div class="lb-wait__title lb-title__wait"></div>
	`;
	$.gbox.open(HTML, config);
}
// Wait();
// 置入獎勵
function ItemReward() {
	var config = {
		addClass: "default lb-reward",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {
			$(".lb-reward__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true,
				},
				advanced: { extraDraggableSelectors: ".account-list" },
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
					$.gbox.close();
				},
			},
			{
				text: "領獎記錄",
				class: "btn-history",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};

	var HTML = `
	<div class="lb-reward__title"></div>
	<div class="lb-reward__dashed1 lb-dashed1"></div>
	<div class="lb-reward__content">
		<div class="lb-reward__list">
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
			<label for="a" class="lb-reward__label">
				<input type="radio" id="a" class="lb-reward__radio" />
				<span class="lb-reward__style"></span>
				<span class="lb-reward__item">一二三四五六七八九十一二三四五六七八九十</span>
			</label>
		</div>
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
ItemReward();
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
				},
			},
			{
				text: "確定",
				class: "btn-more",
				click: function () {
					$.gbox.close();
				},
			},
		],
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
// ItemRewardComplete();
// 領獎記錄
function ItemRewardHistory() {
	var config = {
		addClass: "default lb-reward-history",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".lb-reward-history__content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true,
				},
				advanced: { extraDraggableSelectors: ".account-list" },
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [],
	};

	var HTML = `
		<div class="lb-reward-history__content">
			<div class="lb-reward-history__list">
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
				<div class="lb-reward-history__box">
					<span class="lb-reward-history__name">一二三四五六七八九十</span>
					<span class="lb-reward-history__date">6/10 21:00</span>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// ItemRewardHistory();
