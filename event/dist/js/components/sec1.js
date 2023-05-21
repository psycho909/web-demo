import { CanvasSprite, particlesBg } from "../tool.js";
const sec1 = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let step1C1 = Vue.ref(null);
		let step1C2 = Vue.ref(null);
		let step2C1 = Vue.ref(null);
		let step2C2 = Vue.ref(null);
		let character = Vue.ref(null);
		Vue.nextTick(() => {
			particlesBg("sec1");
			if (!props.mobile) {
				step1C1.value = new CanvasSprite($(".sec1-btn__step1-canvas1"), 90, 30);
				step1C2.value = new CanvasSprite($(".sec1-btn__step1-canvas2"), 90, 30);
				step2C1.value = new CanvasSprite($(".sec1-btn__step2-canvas1"), 90, 30);
				step2C2.value = new CanvasSprite($(".sec1-btn__step2-canvas2"), 90, 30);
				character.value = new CanvasSprite($(".sec1-character__canvas"), 49, 45);
				Promise.allSettled([character.value.PreLoad("./assets/css/images/character/", "Comp1_00000"), step1C1.value.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step1C2.value.PreLoad("./assets/css/images/btn-hover/", "Hover_00000"), step2C1.value.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step2C2.value.PreLoad("./assets/css/images/btn-hover/", "Hover_00000")]).then((res) => {
					step1C1.value.Loop();
					step1C1.value.target.parent().removeClass("loading");
					step1C2.value.Loop();
					step2C1.value.Loop();
					step2C1.value.target.parent().removeClass("loading");
					step2C2.value.Loop();
					character.value.Loop();
					character.value.target.parent().removeClass("loading");
				});
			}
		});

		return {};
	},
	template: `<div class="sec sec1" id="sec1">
    <div class="sec1-bg">
        <video src="./assets/video/bg.mp4" poster="./assets/video/bg-preview.jpg" autoplay loop playsinline></video>
    </div>
    <div class="sec1-left">
        <a href="javascript:;" class="sec1-left__link sec1-left__link--icon1">棉花糖皮卡啾(30日)交換券</a>
        <a href="javascript:;" class="sec1-left__link sec1-left__link--icon2">極限成長密藥</a>
        <a href="javascript:;" class="sec1-left__link">Savior 名牌戒指交換券</a>
        <a href="javascript:;" class="sec1-left__link">Savior 聊天戒指交換券</a>
    </div>
    <div class="sec-wrap">
		<div class="sec1-cloud sec1-cloud1"></div>
		<div class="sec1-cloud sec1-cloud2"></div>
		<div class="sec1-cloud sec1-cloud3"></div>
		<div class="sec1-cloud sec1-cloud4"></div>
		<div class="sec1-cloud sec1-cloud5"></div>
        <div class="sec1-title"></div>
        <div class="sec1-btn-group">
            <div class="sec1-btn__step1 loading">
                <a href="javascript:;" class="sec1-btn__link"></a>
                <canvas class="canvas1 sec1-btn__step1-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step1-canvas2" width="400" height="400"></canvas>
            </div>
            <div class="sec1-btn__step2 loading">
                <a href="javascript:;" class="sec1-btn__link"></a>
                <canvas class="canvas1 sec1-btn__step2-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step2-canvas2" width="400" height="400"></canvas>
            </div>
        </div>
        <div class="sec1-character loading">
            <canvas class="sec1-character__canvas" width="829" height="829"></canvas>
        </div>
    </div>
</div>`
};

export default sec1;
