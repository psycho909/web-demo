import Swiper from "./swiper-bundle.esm.browser.min.js";

var swiper = {
	template: `
    <div class="box swiper-box" :data-uid="content.uid">
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="s in slides">
                    <div class="swiper-slide__content">{{s}}</div>
                </div>
            </div>
        </div>
		<control :uid="content.uid"  />
    </div>`,
	props: ["content"],
	data() {
		return {
			swiper: null,
			slides: ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5", "slide 6"],
			perView: 3
		};
	},
	mounted() {
		console.log("mounted");
		this.swiper = new Swiper(".mySwiper", {
			slidesPerView: 3,
			centeredSlides: true,
			freeMode: false,
			loop: true,
			setWrapperSize: true
		});
	},
	destroyed() {
		this.swiper.destroy(true, true);
		console.log("destroyed ");
	},
	methods: {}
};
export default swiper;
