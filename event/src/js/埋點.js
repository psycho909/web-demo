// H5 BeanH5初始化
function BeanGoGetToken() {
	return axios({
		method: "post",
		url: "../../api/E20220412_H5/BeanGoGetToken",
	});
}

// 初始化
function SenderInit() {
	return new Promise((resolve, reject) => {
		try {
			const sender = beanfunWebTraceSDK.init({
				BUID: "GAMA-bf-01",
				property: "beanfun",
				sourceProperty: "gtw",
			});
			resolve(sender);
		} catch (err) {
			reject("Error:beanfunWebTraceSDK - init");
			throw new Error("Error:beanfunWebTraceSDK - init");
		}
	});
}

// Init
async function Init() {
	// H5Init($("#hfData").val());
	let [bgo, sender] = await Promise.allSettled([BeanGoGetToken(), SenderInit()]);
	return {
		bgo,
		sender,
	};
}
let senderTrack = null;

Init().then((res) => {
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
	
	let [bgo, sender] = res;
	let { Data, Message, Url } = bgo.data;

	if (bgo.data.Code == -2) {
		return [Message, Url];
	}
	let { ResultData } = Data;
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
});

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

$("body").on("click", ".gameHomePage", function (e) {
	e.preventDefault();
	var track = {
		eventId: "4101",
		event: "gtw_home_page_item_click",
		pagePage: "kr_202209_h5",
		pageName: "KR 世界巡懷之旅活動頁 - H5",
		type: "watermark",
		clickName: "home",
		tab: "【活動說明】按鈕點擊"
	};
	ClickEvent(store.state.sender, track)
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