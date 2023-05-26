import { endEvent, removeCalenderTime } from "./tool.js";
import { EventInfo, SkillVideo } from "./lightbox.js";
import sec1 from "./components/sec1.js";
import sec2 from "./components/sec2.js";
import sec3 from "./components/sec3.js";
import loading from "./components/loading.js";

if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

let app = Vue.createApp({
	setup() {
		let mobile = Vue.ref(false);
		let mobileType = Vue.ref("google");
		let currentPage = Vue.ref("sec1");
		let menuStatus = Vue.ref(false);
		let showLoading = Vue.ref(false);
		let handleCalender = () => {};
		let now = new Date().getTime();
		let end = new Date(endEvent).getTime();
		let event = Vue.ref(true);
		let showCalender = Vue.ref(true);
		let loadRightBar = Vue.ref(true);
		let targetBrowserWidth = Vue.ref(document.documentElement.clientWidth);
		window.addEventListener("resize", function () {
			targetBrowserWidth.value = document.documentElement.clientWidth;
		});
		let goTop = () => {
			$("body,html").animate(
				{
					scrollTop: 0
				},
				800
			);
		};
		let goPage = (page) => {
			let add = 0;
			let browserWidth = 1920;
			if (page == "#sec2" && !mobile.value) {
				add = parseInt((400 / browserWidth) * targetBrowserWidth.value);
			}
			menuStatus.value = false;
			$("body,html").animate(
				{
					scrollTop: $(page).offset().top + add
				},
				800
			);
		};
		let handleMenu = (status) => {
			menuStatus.value = status;
		};
		let handleLoading = (data) => {
			showLoading.value = data;
		};
		function scrollTarget(t, target, offset = 0) {
			var offset = offset || 0;
			var data_name;
			target.each(function (i, v) {
				if ($(this).offset().top - offset <= t && $(this).offset().top + $(this).outerHeight() - offset > t) {
					data_name = $(this).attr("id");
					currentPage.value = data_name;
				} else {
					data_name = $(this).attr("id");
				}
			});
		}

		window.addEventListener("scroll", function (e) {
			let top = document.documentElement.scrollTop;
			scrollTarget(top, $(".sec"));
		});

		if (isMobile.any) {
			mobile.value = true;
			if (isMobile.android.device) {
				mobileType.value = "google";
			}
			if (isMobile.apple.device) {
				mobileType.value = "apple";
			}
		} else {
			mobile.value = false;
			mobileType.value = "google";
		}
		if (now >= end) {
			event.value = false;
		} else {
			event.value = true;
		}
		if (now >= new Date(removeCalenderTime).getTime()) {
			showCalender.value = false;
			loadRightBar.value = false;
		} else {
			showCalender.value = true;
			loadRightBar.value = false;
		}
		gsap.to("html", {
			scrollTop: 0,
			duration: 0
		});
		return {
			mobile,
			goPage,
			handleCalender,
			menuStatus,
			goTop,
			handleCalender,
			currentPage,
			handleMenu,
			showLoading,
			handleLoading,
			mobileType,
			event,
			showCalender,
			loadRightBar
		};
	},
	components: {
		sec1,
		sec2,
		sec3,
		loading
	}
});

app.mount("#app");
