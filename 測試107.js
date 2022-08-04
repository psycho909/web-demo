var foo = {
	template: `<div class="box foo" :data-uid="uid"><div>Foo {{uid}}</div><div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div></div>`,
	props: ["uid"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
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
var heading = {
	template: `<div class="box heading" :data-uid="uid"><div>Head {{uid}}</div>
        <div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div>
    </div>`,
	props: ["uid"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
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
var card = {
	template: `<div class="box card" :data-uid="uid"><div>Card {{uid}}</div><div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div></div>`,
	props: ["uid"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
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
var fixed = {
	template: `<div class="box fixed" :style="position" :data-uid="uid">
        <div>Foo {{uid}} {{top}} {{left}}</div>
        
        <div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div>
        </div>`,
	props: ["uid", "top", "left"],
	mounted() {
		console.log("mounted", this.top);
	},
	destroyed() {
		console.log("destroyed ");
	},
	updated() {
		console.log("updated", this.top);
	},
	computed: {
		position() {
			var top = this.top ? `top:0px;` : `bottom:0px;`;
			var left = this.left ? `left:0px;` : `right:0px;`;
			return top + left;
		}
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
var components = {
	foo,
	heading,
	card,
	swiper,
	fixed
};

var vm = new Vue({
	el: "#app",
	components,
	mounted() {
		ClassicEditor.create(document.querySelector("#editor"), {
			toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
			heading: {
				options: [
					{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
					{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
					{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
					{ model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
					{ model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
					{ model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
					{ model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" }
				]
			}
		})
			.then((bewEditor) => {
				this.editor = bewEditor;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	data() {
		return {
			editor: "",
			fixed: {
				top: true,
				left: true
			},
			content: {
				body: []
			}
		};
	},
	methods: {
		getCKEdit() {
			const editorData = this.editor.getData();
			console.log(editorData);
		},
		tempChange() {
			this.content.body[0].top = false;
		},
		add(cpt) {
			var uid = Math.floor(Math.random() * 100);
			this.content.body.push({ component: cpt, uid });
		},
		addFixed() {
			var uid = Math.floor(Math.random() * 100);
			var left = this.fixed.left;
			var top = this.fixed.top;
			this.content.body.push({ component: "fixed", uid, left, top });
		},
		remove(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			this.content.body = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
		},
		up(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			if (_index - 1 < 0) {
				return;
			}
			var _temp = this.content.body[_index];
			var _content = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
			this.content.body = _content;
			this.content.body.splice(_index - 1, 0, _temp);
		},
		down(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			if (_index + 1 >= this.content.body.length) {
				return;
			}
			var _temp = this.content.body[_index];
			var _content = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
			this.content.body = _content;
			this.content.body.splice(_index + 1, 0, _temp);
		}
	}
});
