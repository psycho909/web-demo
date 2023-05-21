import { EventInfo, SkillVideo } from "./lightbox.js";
import sec1 from "./components/sec1.js";
import sec2 from "./components/sec2.js";
import sec3 from "./components/sec3.js";
// EventInfo();
// SkillVideo();
let app = Vue.createApp({
	setup() {
		let mobile = Vue.ref(false);
		let currentPage = Vue.ref("sec1");
		let menuStatus = Vue.ref(false);
		let handleCalender = () => {};
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
			if (page == "#sec2") {
				add = 120;
			}
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
		} else {
			mobile.value = false;
		}

		return {
			mobile,
			goPage,
			handleCalender,
			menuStatus,
			goTop,
			handleCalender,
			currentPage,
			handleMenu
		};
	},
	components: {
		sec1,
		sec2,
		sec3
	}
});

app.mount("#app");
