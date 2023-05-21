import { particlesBg } from "../tool.js";
const sec2 = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let swiper2 = Vue.ref(null);
		let cards = Vue.ref(null);
		let container = Vue.ref(null);
		let currentEvent = Vue.ref(1);
		let goSlide = (index) => {
			currentEvent.value = index;
			swiper2.value.slideTo(index);
		};
		Vue.nextTick(() => {
			particlesBg("sec2");
			if (props.mobile) {
				swiper2.value = new Swiper(".sec2-swiper-wrap", {
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev"
					}
				});
			} else {
				let trigger = ".sec2-container";
				cards.value = document.querySelectorAll("[data-sec2-card]");
				container.value = document.querySelector(trigger);
				function scrollCardsAnimation() {
					var t1 = gsap.timeline();
					var je = "power1.out";
					return t1
						.from(
							container.value,
							{
								x: "105%",
								duration: 6
							},
							"-=1"
						)
						.to(
							cards.value[0],
							{
								rotateY: -180,
								ease: je,
								duration: 3
							},
							"-=2.7"
						)
						.to(
							cards.value[1],
							{
								x: "0%",
								ease: je,
								duration: 4
							},
							"-=4.4"
						)
						.to(
							cards.value[1],
							{
								rotateY: -180,
								ease: je,
								duration: 3
							},
							"-=2.0"
						)
						.to(
							cards.value[2],
							{
								x: "0%",
								ease: je,
								duration: 3
							},
							"-=3.5"
						)
						.to(
							cards.value[2],
							{
								rotateY: -180,
								ease: je,
								duration: 3
							},
							"-=2.0"
						)
						.to(
							cards.value[3],
							{
								x: "0%",
								ease: je,
								duration: 3
							},
							"-=3.0"
						)
						.to(
							cards.value[3],
							{
								rotateY: -180,
								ease: je,
								duration: 3
							},
							"-=1.3"
						);
				}
				ScrollTrigger.create({
					trigger: trigger,
					animation: scrollCardsAnimation(),
					// scroller: ".scroll-container",
					start: "-=60px",
					end: "+=200px",
					scrub: true,
					pin: true,
					pinType: "transform",
					markers: true
				});

				gsap.registerPlugin(ScrollTrigger);
			}
		});
		return { goSlide, currentEvent };
	},
	template: `
    <div class="sec sec2" id="sec2">
        <div class="sec2-container">
		<div class="sec2-title"></div>
            <div class="sec2-tab">
                <div class="sec2-tab__title" :class="[currentEvent == 1?'active':'']" @click="goSlide(1)">活動名十字活動名十字</div>
                <div class="sec2-tab__title" :class="[currentEvent == 2?'active':'']" @click="goSlide(2)">活動名十字活動名十字</div>
                <div class="sec2-tab__title" :class="[currentEvent == 3?'active':'']" @click="goSlide(3)">活動名十字活動名十字</div>
                <div class="sec2-tab__title" :class="[currentEvent == 4?'active':'']" @click="goSlide(4)">活動名十字活動名十字</div>
            </div>
            <div class="sec2-wrap">
                <div class="sec2-swiper-wrap">
                    <div class="sec2-content swiper-wrapper" data-sec2-content>
                        <div class="sec2-card" :class="[mobile?'swiper-slide':'']" data-event="1" data-sec2-card>
                            <div class="sec2-card__title">活動名十字活動名十字</div>
                            <div class="sec2-card__item">
                                <div class="sec2-card__item-front">
                                    <div class="sec2-card__item-front--img1"></div>
                                    <div class="sec2-card__item-front--img2"></div>
                                </div>
                                <div class="sec2-card__item-back"></div>
                            </div>
                        </div>
                        <div class="sec2-card" :class="[mobile?'swiper-slide':'']" data-event="2" data-sec2-card>
                            <div class="sec2-card__title">活動名十字活動名十字</div>
                            <div class="sec2-card__item">
                                <div class="sec2-card__item-front">
                                    <div class="sec2-card__item-front--img1"></div>
                                    <div class="sec2-card__item-front--img2"></div>
                                </div>
                                <div class="sec2-card__item-back"></div>
                            </div>
                        </div>
                        <div class="sec2-card" :class="[mobile?'swiper-slide':'']" data-event="3" data-sec2-card>
                            <div class="sec2-card__title">活動名十字活動名十字</div>
                            <div class="sec2-card__item">
                                <div class="sec2-card__item-front">
                                    <div class="sec2-card__item-front--img1"></div>
                                    <div class="sec2-card__item-front--img2"></div>
                                </div>
                                <div class="sec2-card__item-back"></div>
                            </div>
                        </div>
                        <div class="sec2-card" :class="[mobile?'swiper-slide':'']" data-event="4" data-sec2-card>
                            <div class="sec2-card__title">活動名十字活動名十字</div>
                            <div class="sec2-card__item">
                                <div class="sec2-card__item-front">
                                    <div class="sec2-card__item-front--img1"></div>
                                    <div class="sec2-card__item-front--img2"></div>
                                </div>
                                <div class="sec2-card__item-back"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
    </div>`
};

export default sec2;
