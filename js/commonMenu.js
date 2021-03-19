// 預設訊息
function WaitText(text) {
	$.gbox.open("<div class='error-text'>" + text + "</div>", {
		addClass: "default default-text",
		titleBar: " ",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
	});
}

var LogoLinkList = [
	{ href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=5850", text: "遊戲攻略" },
	{ href: "https://tw.beanfun.com/game_zone/default.aspx?service_code=611639&service_region=T0", text: "啟動遊戲" },
	{ href: "https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/remastered/download/index.html", text: "遊戲下載" },
	{ href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7082", text: "帳號申請" },
	{ href: "javascript:;", text: "改版主頁", box: "主頁即將上線，靜請期待。" },
];
var NavLinkList = [
	{ href: "https://event.beanfun.com/LineageNew/E20210311/index.aspx", text: "<span>勇士誕生祭壇</span><span>-開局小遊戲</span>" },
	{ href: "https://event.beanfun.com/Lineagenew/E20210318/Index.aspx", text: "英雄召集回歸活動" },
	{ href: "javascript:;", text: "新服抱團闖亞丁活動" },
	{ href: "https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E202103011/index.html", text: "預先創角" },
	{ href: "https://event.beanfun.com/LineageNew/E20210331/Index.aspx", text: "天堂寶物拍賣場" },
	// { href: "javascript:;", text: "改版主頁", box: "主頁即將上線，靜請期待。" },
	// { href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7082", text: "帳號申請" },
	{ href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=5850", text: "遊戲攻略" },
];
var mCustomScrollbarCSS = '<link rel="stylesheet" href="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />';
var mCustomScrollbarJS = '<script src="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>';

var LogoBarHTML = '<section class="commonLogo-bar"><a href="https://tw.beanfun.com/lineagenew/www/index.aspx" class="commonLogo">logo</a><ul class="commonLogo-ul">{{liHTML}}</ul></section>';
var NavHTML = '<nav class="commonMenu-wrap on"><a href="https://tw.beanfun.com/lineagenew/www/index.aspx" class="commonMenu-logo"></a><a href="javascript:;" class="commonMenu-btn"></a><ul class="commonMenu-ul">{{liHTML}}</ul></nav>';

var LogoLiGroup = "";
var NavLiGroup = "";

LogoLinkList.forEach(function (link, i) {
	var li = '<li class="commonLogo-li"><a href="' + link.href + '" class="commonLogo-li__link" ' + (link.box ? "onclick=WaitText('" + link.box + "')" : 'target="_blank"') + ">" + link.text + "</a></li>";
	LogoLiGroup += li;
});
NavLinkList.forEach(function (link, i) {
	var li = '<li class="commonMenu-li"><a href="' + link.href + '" class="commonMenu-li__link" ' + (link.box ? "onclick=WaitText('" + link.box + "')" : '"') + ">" + link.text + "</a></li>";
	NavLiGroup += li;
});

LogoBarHTML = LogoBarHTML.replace("{{liHTML}}", LogoLiGroup);
NavHTML = NavHTML.replace("{{liHTML}}", NavLiGroup);

// head.insertAdjacentHTML("beforeend", mCustomScrollbarCSS);
// head.insertAdjacentHTML("beforeend", mCustomScrollbarJS);

document.addEventListener("DOMContentLoaded", function () {
	var body = document.getElementsByTagName("body")[0];
	var head = document.getElementsByTagName("head")[0];
	body.insertAdjacentHTML("afterbegin", LogoBarHTML);
	body.insertAdjacentHTML("afterbegin", NavHTML);

	var menuBtn = document.querySelector(".commonMenu-btn");
	var menuWrap = document.querySelector(".commonMenu-wrap");
	var commonLogoWrap = document.querySelector(".commonLogo-bar");

	menuBtn.addEventListener("click", function () {
		if (menuWrap.className.split(" ").indexOf("on") > -1) {
			menuWrap.className = "commonMenu-wrap show";
		} else {
			menuWrap.className += " on";
		}
	});
	$(".commonMenu-ul").mCustomScrollbar({
		theme: "light",
	});
	setTimeout(function () {
		menuWrap.className += " show";
		commonLogoWrap.className += " show";
	}, 0);
});
