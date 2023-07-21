﻿var mainTarget = document.getElementById("cookie-bar");
//設置參數 如果需要
function setOption() {
	var currentProd = mainTarget.getAttribute("prod");
	var option = {
		product: currentProd
	};
	return option;
}

//組合元件
function componentPrivacy() {
	var cookieHtml =
		"<div class='cookie-bar'><div class='cookie-bar-child'><div class='cookie-bar-child-text'>本網站使用瀏覽器紀錄 (Cookie) 為您提供最好的使用體驗。繼續瀏覽本網站表示您閱讀並同意我們的隱私權保護政策。閱讀我們的<div class='cookie-bar-child-btn'>隱私權與Cookie政策</div>以了解更多詳情。</div><div class='cookie-bar-know '>我知道了</div></div></div><div style='display:none;' class='cookie-bar-popup'><div class='cookie-bar-wrap'><div class='cookie-bar-X'></div><div class='cookie-bar-content'><div class='cookie-bar-title'>隱私權保護政策</div><div class='cookie-bar-text'>歡迎您使用或瀏覽由遊戲橘子數位科技股份有限公司或遊戲橘子協力廠商(以下統稱「遊戲橘子」)提供之有關遊戲橘子之服務或網站（下稱「本服務」或「本網站」）。「裝置」為用以存取本服務的任何電腦，包括但不限於桌上型電腦、筆記型電腦、行動電話、平板電腦或其他消費性電子產品。為了保障您的權益，並打造更佳的服務，在您開始使用或瀏覽遊戲橘子之網站前，請先詳讀本隱私權政策（以下簡稱「本政策」），本政策載明遊戲橘子如何蒐集、儲存、處理、移轉及使用您的個人資料。遊戲橘子透過本服務對於您的個人資料的蒐集、處理及利用，均遵守中華民國「個人資料保護法」及本政策之規範。在您使用本服務或本網站傳送您的個人資料予遊戲橘子、存取或使用本服務或本網站、或以其他方式存取、使用或運用任何遊戲橘子提供之服務時，即表示您同意以本政策所述方式處理您的個人資料。</div><div class='cookie-bar-title'>本政策適用範圍</div><div class='cookie-bar-text'>本政策適用本活動網站及遊戲橘子提供之所有服務。</div><div class='cookie-bar-title'>本網站個人資料蒐集之目的</div><div class='cookie-bar-text'>基於消費者、客戶管理與服務、行銷與廣告業務、統計及研究分析或其他電子商務服務與調查及其他合於營業登記項目或章程所定業務需要之特定目的，使用以下方式收集您的個人資料。在您瀏覽網站時，遊戲橘子會收集您(1)瀏覽網站的使用情形，例如閱讀哪些內容、在哪些地方離開網頁、閱讀日期與時間、Cookie資料、您的 IP 位址、瀏覽器類型、連線至網站的裝置類型。 (2)從與遊戲橘子合作的第三方，包括廣告商與合作夥伴，收集到有關您的個人資料。</div><div class='cookie-bar-title'>蒐集之個人資料類別</div><div class='cookie-bar-text'>遊戲橘子於網站內蒐集的個人資料包括：<br />辨識個人者： 包括但不限於會員之姓名、電話、電子郵件、社群帳號等資訊。個人描述：包括但不限於年齡、性別、國籍等。</div><div class='cookie-bar-title'>利用期間、地區、對象及方式</div><div class='cookie-bar-text'>期間：您要求停止使用或遊戲橘子停止提供相關服務之日為止。<br />地區：您的個人資料將用於台灣地區及與遊戲橘子有業務往來之機構營業處所在地。</div><div class='cookie-bar-text'>利用對象及方式：提供個人化的服務，包括內容和廣告 - 遊戲橘子會用您所提供的個人資料，為您打造個人化的服務，包括個人化內容或建議活動。例如：若您過去曾參與某一系列活動，代表您對該活動有興趣，當該活動有最新消息，遊戲橘子會優先知會您。依據您的設定，遊戲橘子相關網站與第三方服務可能會根據您的興趣向您顯示個人化廣告。評估成效 -為了了解本服務的使用情形，遊戲橘子會收集並分析資料。遊戲橘子會運用 Google Analytics（分析）等多種工具分析，而這些分析結果將用來改善服務，為您提供更佳的內容。</div><div class='cookie-bar-text'>與您互動交流：遊戲橘子會使用向您收集到的電子郵件、手機、社交媒體帳號與您互動。例如：您若參與遊戲橘子舉辦的活動並獲得獎項，遊戲橘子會使用以上個人資料與您聯絡後續領獎事宜。遊戲橘子也可能在推出新服務時，寄送通知給您。</div><div class='cookie-bar-title'>分享您的個人資料</div><div class='cookie-bar-text'>您的以下個人資料，將會公開顯示：<br />社群互動交流：當您在第三方社群服務註冊帳戶時（例如Facebook），第三方服務會要求您建立特定的使用者名稱，依據您分享給第三方服務資料不同，所有使用遊戲橘子網站的人都看得到這個名稱以及您所張貼的任何評論。</div><div class='cookie-bar-text'>您同意遊戲橘子將您提供的個人資料提供予下列對象使用：<br />服務供應商：遊戲橘子會與提供技術基礎架構的服務供應商合作，尤其是代管、儲存、管理及維護遊戲橘子網站程式、內容以及遊戲橘子所處理的資料的供應商，以便遊戲橘子所有服務順利運作。</div><div class='cookie-bar-text'>合作夥伴：協助遊戲橘子進行行銷活動的行銷合作夥伴或合作之協力廠商。遊戲橘子集團：遊戲橘子會向遊戲橘子集團的其他關係企業分享您的個人資料，以便進行遊戲橘子的日常營運作業。<br />執法機關與資料保護主管機關：為了遵守適用法律下的法律義務，或對搜查令、法院命令或傳票等有效的法律程序或主管機關要求作出回應。<br />與外站連結：「遊戲橘子」相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於「遊戲橘子」之網站或網頁，本隱私權政策不適用於該網站或網頁，該網站或網頁將會適用其隱私權政策或相關法令規範。</div><div class='cookie-bar-title'>您的權利</div><div class='cookie-bar-text'>遊戲橘子所蒐集個人資料之當事人，依個人資料保護法得對遊戲橘子行使以下權利：<br />查詢或請求閱覽。<br />請求製給複製本。<br />請求補充或更正。<br />請求停止蒐集、處理或利用。<br />請求刪除。<br />會員如欲行使上述權利，可與遊戲橘子客服連絡進行申請。</div><div class='cookie-bar-text'>請您注意，如拒絕提供加入會員所需必要之資料，將可能導致無法享受完整服務或完全無法使用該項服務。</div><div class='cookie-bar-title'>資料安全：</div><div class='cookie-bar-text'>本公司採用適當之安全措施，防止您的個人資料被竊取、竄改、洩露或毀損， 建議您應隨時更新您的防毒軟體及使用病毒/間諜掃描程式。</div><div class='cookie-bar-title'>隱私權政策的異動</div><div class='cookie-bar-text'>這份隱私權之內容自發布時起立即生效，但因應社會環境及法令規定的變遷，若「遊戲橘子」網站為保護您的隱私，認為需要修改這份聲明，有權於任何時間在遊戲橘子網站上公布經修改、變更之隱私權政策內容，當遊戲橘子公布上開修改、變更後，該更新內容即刻生效並視為已取得您的同意，建議您隨時注意該等修改、變更。如果您對「遊戲橘子」網站的隱私權政策或與個人資料有任何疑問，歡迎您與「遊戲橘子」客戶服務中心連絡。</div><div class='cookie-bar-title'>Cookie</div><div class='cookie-bar-text'>為了提供您最佳的服務，遊戲橘子會在您的電腦中放置並取用遊戲橘子的Cookie 或其他類似技術，若您不願接受 Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行。</div><div class='cookie-bar-closebtn'>關閉</div></div></div><div class='cookie-bar-moudle'></div></div>";

	//建立標籤
	var creatContainer = document.createElement("div");
	creatContainer.setAttribute("id", "cookieBarWrap");
	creatContainer.innerHTML = cookieHtml;
	//帶入body
	document.body.appendChild(creatContainer);

	//點擊事件
	var cookieBar = document.getElementsByClassName("cookie-bar")[0];
	var cookiesBtn = document.getElementsByClassName("cookie-bar-child-btn")[0];
	var xBtn = document.getElementsByClassName("cookie-bar-X")[0];
	var closeBtn = document.getElementsByClassName("cookie-bar-closebtn")[0];
	var cookieBarKnow = document.getElementsByClassName("cookie-bar-know")[0];
	var cookieBarMoudle = document.getElementsByClassName("cookie-bar-moudle")[0];
	var cookieBarPopup = document.getElementsByClassName("cookie-bar-popup")[0];
	var cookieBarWrap = document.getElementById("cookieBarWrap");

	//add/removeclass for ie9
	function hasClass(el, className) {
		if (el.classList) return el.classList.contains(className);
		else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
	}

	function addClass(el, className) {
		if (el.classList) el.classList.add(className);
		else if (!hasClass(el, className)) el.className += " " + className;
	}

	function removeClass(el, className) {
		if (el.classList) el.classList.remove(className);
		else if (hasClass(el, className)) {
			var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
			el.className = el.className.replace(reg, " ");
		}
	}

	//點擊隱私權政策
	cookiesBtn.addEventListener("click", function () {
		cookieBarPopup.style.display = "block";
		addClass(document.body, "cookieBar-noscroll");
		addClass(cookieBarWrap, "cookieBar-noscroll");
		addClass(cookieBar, "off");
		document.getElementById("cookieBarWrap").scrollTop = 0;
	});
	//點擊X
	xBtn.addEventListener("click", function () {
		cookieBarPopup.style.display = "none";
		removeClass(document.body, "cookieBar-noscroll");
		removeClass(cookieBarWrap, "cookieBar-noscroll");
		removeClass(cookieBar, "off");
	});
	//點擊"關閉"
	closeBtn.addEventListener("click", function () {
		cookieBarPopup.style.display = "none";
		removeClass(document.body, "cookieBar-noscroll");
		removeClass(cookieBarWrap, "cookieBar-noscroll");
		removeClass(cookieBar, "off");
	});
	//點擊"moudle"
	cookieBarMoudle.addEventListener("click", function () {
		cookieBarPopup.style.display = "none";
		removeClass(document.body, "cookieBar-noscroll");
		removeClass(cookieBarWrap, "cookieBar-noscroll");
		removeClass(cookieBar, "off");
	});
	//點擊我知道了
	cookieBarKnow.addEventListener("click", function () {
		var pathName = location.href.substring(0, location.href.lastIndexOf("/")) + "/";
		//產生cookies 並設定cookie存在時間
		var d = new Date();
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 365);
		var expires = "expires=" + d.toGMTString();
		document.cookie = "path_name=" + pathName + ";" + expires;
		document.getElementById("cookieBarWrap").style.display = "none";
	});
	//取得 cookie
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	//判斷cookies 同一路徑則不再顯示

	var cookiesName = location.href.substring(0, location.href.lastIndexOf("/")) + "/";
	if (getCookie("path_name") == cookiesName) {
		document.getElementById("cookieBarWrap").style.display = "none";
	}
}

(function () {
	//外部檔案路徑
	var stylepath = "https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/cookie-bar/";

	// 動態引入CSS;
	var newCssObj = document.createElement("link");
	newCssObj.type = "text/css";
	newCssObj.rel = "stylesheet";
	newCssObj.href = stylepath + "cookie-bar.css";
	document.head.appendChild(newCssObj);
	// element;

	// document.addEventListener("DOMContentLoaded", function () {
	// 	var option = setOption();
	// 	componentPrivacy(option);
	// });
	window.onload = function () {
		var option = setOption();
		componentPrivacy(option);
	};
})();
