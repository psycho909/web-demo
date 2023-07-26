import { SkillVideo, MessageLB, MessageLB2 } from "../lightbox.js";
import { CanvasSprite, particlesBg, surveyCake } from "../tool.js";
import { AddUserData } from "../api.js";
const sec1 = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		event: {
			type: Boolean,
			default: true
		},
		t: {
			type: Number,
			default: 0
		}
	},
	setup(props, { emit }) {
		let characterC1 = Vue.ref(null);
		let characterC2 = Vue.ref(null);
		let join = false;
		let joinDate = "";
		let enter = false;
		let timer = null;

		let skillPop = () => {
			SkillVideo();
		};

		let handleEnter = () => {
			enter = true;
			if (enter) {
				$(".sec1-left").addClass("show");
			}
		};
		let handleLeave = () => {
			enter = false;
			timer = setTimeout(() => {
				if (!enter) {
					$(".sec1-left").removeClass("show");
				}
			}, 500);
		};
		let handleLeftEnter = () => {
			enter = true;
			clearTimeout(timer);
		};
		let handleLeftLeave = () => {
			enter = false;
			timer = setTimeout(() => {
				if (!enter) {
					$(".sec1-left").removeClass("show");
				}
			}, 500);
		};
		let handleBtnEvent = (type) => {
			if ($("#Token").val() == "") {
				window.sessionStorage.setItem("type", type);
				window.location.href = "login.aspx";
				return;
			}
			if (join) {
				let msg = `
						<div class="lb-content">
							<div>${joinDate}</div>
							<div>已完成預先登錄</div>
							<br />
							<div>2023/07/05 23:59前</div>
							<div>發送獎勵</div>
						</div>
					`;
				if (type == 1) {
					MessageLB(msg);
					return;
				}
				if (type == 2) {
					window.location.href = surveyCake;
					return;
				}
			}
			emit("showLoading", true);
			AddUserData($("#Token").val())
				.then((res) => {
					let { Code, Data, Message, Url } = res.data;
					if (Code == -1) {
						join = false;
						MessageLB(Message, Url);
						return;
					}
					join = true;
					joinDate = Data;
					let msg = `
						<div class="lb-content">
							<div>${joinDate}</div>
							<div>已完成預先登錄</div>
							<br />
							<div>2023/07/05 23:59前</div>
							<div>發送獎勵</div>
						</div>
					`;
					if (type == 1) {
						if (Code == 1 || Code == 2) {
							MessageLB(msg);
							return;
						}
					}
					if (type == 2) {
						if (Code == 1) {
							MessageLB2(msg, surveyCake);
							return;
						}
						if (Code == 2) {
							window.location.href = surveyCake;
							return;
						}
					}
				})
				.finally(() => {
					emit("showLoading", false);
				});
		};
		Vue.nextTick(() => {
			particlesBg("sec1");
			let link1 = "./assets/css/images2/character-normal/";
			let link2 = "./assets/css/images2/character-hover/";
			if (!props.mobile) {
				let canvasArr = [];
				characterC1.value = new CanvasSprite($(".sec1-character__canvas1"), 45, 0);
				characterC2.value = new CanvasSprite($(".sec1-character__canvas2"), 45, 0);
				canvasArr = [characterC1.value.PreLoad(link1, "NORMAL_00000"), characterC2.value.PreLoad(link2, "HOVER_00000")];
				Promise.allSettled(canvasArr).then((res) => {
					characterC1.value.Loop();
					characterC2.value.Loop();
					characterC1.value.target.parent().removeClass("loading");
					$(".loadingProgress").removeClass("init");
					emit("showLoading", false);
					document.querySelector("html").classList.remove("ovh");
				});
			} else {
				let canvasArr = [];
				characterC1.value = new CanvasSprite($(".sec1-character__canvas1"), 45, 30);
				canvasArr = [characterC1.value.PreLoad(link1, "NORMAL_00000")];
				Promise.allSettled(canvasArr).then((res) => {
					characterC1.value.Loop();
					characterC1.value.target.parent().removeClass("loading");
					$(".loadingProgress").removeClass("init");
					emit("showLoading", false);
					document.querySelector("html").classList.remove("ovh");
				});
			}
		});

		Vue.watch(
			() => props.t,
			(newVal, oldVal) => {
				handleBtnEvent(props.t);
			}
		);
		// Vue.onMounted(() => {
		// 	if (window.sessionStorage.getItem("type")) {
		// 		handleBtnEvent(window.sessionStorage.getItem("type"));
		// 	}
		// });
		return {
			skillPop,
			handleEnter,
			handleLeave,
			handleLeftEnter,
			handleLeftLeave,
			handleBtnEvent
		};
	},
	template: `<div class="sec sec1" id="sec1">
    <div class="sec1-bg" v-if="!mobile">
        <video muted autoplay loop playsinline>
			<source src="./assets/video/bg2.mp4" type="video/mp4" />
		</video>
    </div>
    <div class="sec-wrap">
        <div class="sec1-title"></div>
        <div class="sec1-btn-group">
			<div class="sec1-btn__step3 loading" v-show="!event">
                <a href="https://maplestory.beanfun.com/main" class="sec1-btn__link" target="_blank"></a>
				<div class="sec1-btn--normal"></div>
                <div class="sec1-btn--hover"></div>
                <canvas class="canvas1 sec1-btn__step3-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step3-canvas2" width="400" height="400"></canvas>
            </div>
        </div>
        <a href="javascript:;" class="sec1-character loading" @click="skillPop">
			<div class="sec1-character--normal"></div>
            <canvas class="sec1-character__canvas1" width="928" height="928"></canvas>
            <canvas class="sec1-character__canvas2" width="928" height="928"></canvas>
        </a>
    </div>
</div>`
};

export default sec1;
