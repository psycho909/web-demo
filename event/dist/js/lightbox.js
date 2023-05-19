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

export const MessageLB = (msg, url, callback) => {
	$.gbox.open(msg, {
		addClass: "default lb-style2",
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
};

export const EventInfo = (msg, url, callback) => {
	let HTML = `
		<div class="lb-style2__source"></div>
		<div class="lb-style2__text">介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案</div>
	`;
	$.gbox.open(HTML, {
		addClass: "default lb-style2",
		titleBar: "<div class='lb-style2-title'>版本活動名稱</div>",
		hasCloseBtn: true,
		hasActionBtn: true,
		actionBtns: [
			{
				text: "確定",
				class: "btn-calender2",
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
				class: "btn-more",
				click: function () {
					$.gbox.close();
				},
			},
		],
	});
};

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

	var HTML = "";
	$.gbox.open(HTML, config);
}
