var swiper = {
	template: `
    <div class="box swiper-box" :data-uid="uid">
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="s in slides">
                    <div class="swiper-carousel-animate-opacity">{{s}}</div>
                </div>
            </div>
        </div>
        <div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div>
    </div>`,
	props: ["uid"],
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
			effect: "carousel",
			slidesPerView: this.perView,
			spaceBetween: 30,
			freeMode: false,
			on: {
				beforeInit: function (e) {
					const s = {
						watchSlidesProgress: !0,
						centeredSlides: !0
					};
					console.log("beforeInit");
					console.log(e);
					Object.assign(e.params, s), Object.assign(e.originalParams, s);
				}
			}
		});

		this.swiper.on("progress", function (e, p) {
			const s = e.slides.length;
			for (let r = 0; r < s; r += 1) {
				const t = e.slides[r],
					o = e.slides[r].progress,
					i = Math.abs(o);
				let a = 1;
				i > 1 && (a = 0.3 * (i - 1) + 1);
				const n = t.querySelectorAll(".swiper-carousel-animate-opacity"),
					l = o * a * 50 + "%",
					c = 1 - 0.2 * i,
					u = s - Math.abs(Math.round(o));
				(t.style.transform = `translateX(${l}) scale(${c})`),
					(t.style.zIndex = u),
					(t.style.opacity = i > 3 ? 0 : 1),
					n.forEach((e) => {
						e.style.opacity = 1 - i / 3;
					});
			}
		});
	},
	destroyed() {
		this.swiper.destroy(true, true);
		console.log("destroyed ");
	},
	methods: {
		remove(e) {
			this.$emit("remove", this.uid);
		},
		up(e) {
			this.$emit("up", this.uid);
		},
		down(e) {
			this.$emit("down", this.uid);
		}
	}
};
export default swiper;
