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
			}
		},
		{
			text: "text2",
			class: "btn",
			click: function () {
				$.gbox.close();
			}
		}
	]
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
				}
			},
			{
				text: "取消",
				class: "btn-cancel",
				click: function () {
					$.gbox.close();
				}
			}
		]
	});
}

function LB(msg, url, callback) {
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
				}
			},
			{
				text: "text2",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = "";
	$.gbox.open(HTML, config);
}

function EventDirections() {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};

	var HTML = `
		<div class="lb-title__directions"></div>
		<div class="lb-dashed2"></div>
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
			<div class="lb-directions__item-box">
				<span class="lb-directions__item-title">第一關</span>
				<span class="lb-directions__item-name">凜風V1(永久)</span>
			</div>
			<div class="lb-directions__item-box">
				<span class="lb-directions__item-title">第二關</span>
				<span class="lb-directions__item-name">強化產包black</span>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// EventDirections();
