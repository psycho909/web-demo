import { particlesBg } from "../tool.js";
const sec3 = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let swiper3 = Vue.ref(null);
		let currentTab = Vue.ref(1);
		let handleTab = () => {};
		Vue.nextTick(() => {
			swiper3.value = new Swiper(".sec3-flim-swiper", {
				effect: "fade",
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				}
			});
			particlesBg("sec3");
			setTimeout(() => {
				gsap.to("html", {
					scrollTop: 0
				});
			}, 0);
		});
		return {
			handleTab,
			currentTab
		};
	},
	template: `<div class="sec sec3" id="sec3">
    <div class="sec3-meteor sec3-meteor1"></div>
    <div class="sec3-meteor sec3-meteor2"></div>
    <div class="sec3-meteor sec3-meteor3"></div>
    <div class="sec3-title"></div>
    <div class="sec3-content">
        <div class="sec3-flim-left">
            <a href="javascript:;" class="sec3-flim-left__btn active" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
            <a href="javascript:;" class="sec3-flim-left__btn" @click="handleTab"><span>活動名十字活動名十字</span></a>
        </div>
        <div class="sec3-flim-box">
            <div class="sec3-flim-swiper">
                <div class="sec3-flim-wrapper swiper-wrapper">
                    <div class="sec3-flim-slide swiper-slide">
                        <div class="sec3-flim-slide__source" style="--color: blue"></div>
                        <div class="sec3-flim-slide__info">A介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案</div>
                        <a href="javascript:;" class="sec3-flim-slide__btn" target="_blank">瞭解更多</a>
                    </div>
                    <div class="sec3-flim-slide swiper-slide">
                        <div class="sec3-flim-slide__source" style="--color: red"></div>
                        <div class="sec3-flim-slide__info">B介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案</div>
                        <a href="javascript:;" class="sec3-flim-slide__btn" target="_blank">瞭解更多</a>
                    </div>
                    <div class="sec3-flim-slide swiper-slide">
                        <div class="sec3-flim-slide__source" style="--color: green"></div>
                        <div class="sec3-flim-slide__info">C介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案</div>
                        <a href="javascript:;" class="sec3-flim-slide__btn" target="_blank">瞭解更多</a>
                    </div>
                    <div class="sec3-flim-slide swiper-slide">
                        <div class="sec3-flim-slide__source" style="--color: yellow"></div>
                        <div class="sec3-flim-slide__info">D介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案</div>
                        <a href="javascript:;" class="sec3-flim-slide__btn" target="_blank">瞭解更多</a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
    </div>
</div>`
};

export default sec3;
