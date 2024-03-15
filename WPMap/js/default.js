import ImageMap2D from "./mapCanvas2.js";
import data from "./data.js";
import worldData from "./world.js";
import territoryData from "./territory.js";

let app = Vue.createApp({
	setup() {
		let p = Vue.ref(null);
		let worlds = Vue.reactive(territoryData.worlds);
		let worldSelect = Vue.ref(null);
		let territorySelect = Vue.ref(null);
		let territoryFilter = Vue.reactive([]);
		let worldSelectToggle = Vue.ref(false);
		let landTypeSelectToggle = Vue.ref(false);
		let territorySelectToggle = Vue.ref(false);
		let landType = Vue.reactive([
			{
				name: "駐紮地",
				value: "garrison"
			},
			{
				name: "要塞",
				value: "fortress"
			},
			{
				name: "城堡",
				value: "castle"
			}
		]);
		let landTypeSelect = Vue.ref(null);
		let world = worldData;
		let territory = territoryData.territorys;
		let r = Vue.reactive({
			hoverIndex: -1,
			activeIndex: -1,
			chainIndexs: [],
			isActive: false,
			isMiniumMap: false,
			isMovingMap: false
		});
		let detailActive = Vue.ref(false);
		let ss = null;
		let as = Vue.ref(false);
		let L = [0, 0];
		let isPress = Vue.ref(false);
		let isHoverPointer = Vue.ref(false);
		let dataFilter = world.map((v, i) => {
			if (territory[v.territory_id]) {
				v.isMatchUI = true;
			} else {
				v.isMatchUI = false;
			}
			v.ui = {
				...territory[v.territory_id],
				isOccupyElf: v.guild_id == null ? true : false,
				isShowTradeTax: v.guild_id != null && v.gradeType !== "garrison",
				chainIndexs: []
			};
			return v;
		});
		let dataLength = dataFilter.length;
		for (let i = 0; i < dataLength; ++i) {
			const S = dataFilter[i];
			if (S.isMatchUI) {
				let R = [];
				for (let D = 0; D < dataLength; ++D) S.guild_id && S.guild_id === dataFilter[D].guild_id && R.push(D);
				S.ui.chainIndexs = R;
				S.ui = {
					...S.ui,
					chainIndexs: R
				};
				territoryFilter.push(S);
			}
		}
		function detailBox(id, index) {
			if (r.isMovingMap) {
				r.isMovingMap = false;
				return;
			}
			(r.activeIndex = index), (r.isActive = true);
			const pd = territoryFilter[index],
				[m, a] = pd.ui.coords;
			(as.value = m > 65), p.value.setScale(p.value.default.limitCloseupScale * 0.6), p.value.setFocusMapPercent(m + L[0], a + L[1]);
			detailActive.value = true;
		}
		const landClick = (id, index) => {
			detailBox(id, index);
		};
		const detailBoxClose = () => {
			r.isActive = false;
			r.activeIndex = -1;
			detailActive.value = false;
		};
		const selectToggle = (type, event) => {
			if (type == "world") {
				worldSelectToggle.value = !worldSelectToggle.value;
				setTimeout(() => {
					let h = document.querySelector(".button--selector-world ul").clientHeight;
					if (h > 360) {
						h = 360;
					}
					document.querySelector(".button--selector-world .selector__transform").style.height = h + "px";
				}, 0);
			}
			if (type == "territory") {
				territorySelectToggle.value = !territorySelectToggle.value;
				setTimeout(() => {
					let h = document.querySelector(".button--selector-territory ul").clientHeight;
					if (h > 360) {
						h = 360;
					}
					document.querySelector(".button--selector-territory .selector__transform").style.height = h + "px";
				}, 0);
			}
			if (type == "landType") {
				landTypeSelectToggle.value = !landTypeSelectToggle.value;
			}
		};
		const selected = (type, W) => {
			if (type == "world") {
				worldSelect.value = W;
			}
			if (type == "territory") {
				territorySelect.value = W;
			}
			if (type == "landType") {
				landTypeSelect.value = W;
			}
		};

		const worldSelectComputed = Vue.computed(() => {
			let w = worlds.filter((v, i) => {
				return v.W === worldSelect.value;
			})[0];
			return w;
		});
		const territorySelectComputed = Vue.computed(() => {
			let w = worlds.filter((v, i) => {
				return v.W === worldSelect.value;
			})[0];
			if (w) {
				let t = w.realms.filter((v, i) => {
					return v.R === territorySelect.value;
				})[0];
				return t;
			}
			return [];
		});
		const imageElement = new Image();
		imageElement.src = "./images/bg_worldmap_1_new.jpg";

		Vue.onMounted(() => {
			// 獲取所有的 land 和 border 元素
			let lands = document.querySelectorAll("._land");
			let borders = document.querySelectorAll("._border");
			p.value = new ImageMap2D({
				image: imageElement,
				frame: document.querySelector(".territory-map"),
				canvas: document.querySelector(".map-canvas"),
				area: document.querySelector(".map-area-1"),
				areaScale: document.querySelector(".map-area-2"),
				initX: 50,
				initY: 50,
				limitCloseoutScale: 0.6,
				limitCloseupScale: 1.7,
				scale: 0.8,
				wheelScale: 0.03,
				power: 0.12
			});
			p.value.on("pressDownBefore", (m, a) => {
				for (let c = 0, u = a.length; c < u; ++c) if (a[c] === ss) return !1;
			});
			p.value.on("pressMove", (m, a) => {
				const { dx: c, dy: u } = a,
					h = Math.max(Math.abs(c), Math.abs(u)),
					w = h > 120,
					b = h > 10;
				(r.isMovingMap = b), w && (r.isActive = !1);
				if (!r.isActive) {
					document.querySelector(".map-detail").classList.remove("-active");
					lands.forEach((land, i) => {
						land.classList.remove("-select");
					});

					borders.forEach((border, i) => {
						border.classList.remove("-select");
					});
				}
			});
			p.value.on("pressUp", () => {
				setTimeout(() => {
					r.isMovingMap = !1;
				}, 0);
			});
			p.value.on("changeScale", () => {
				(r.isMiniumMap = p.value.focus.scale <= p.value.default.limitCloseoutScale), r.isMiniumMap && (r.isActive = !1);
			});
			p.value.create();

			// 放大
			document.querySelector("._scale-up").addEventListener("click", () => {
				if (!p.value) return;
				let l = p.value.focus.scale + 0.2;
				l > 1.5 && (l = 1.5), p.setScale(l);
			});

			// 缩小
			document.querySelector("._scale-down").addEventListener("click", () => {
				if (!p.value) return;
				let l = p.value.focus.scale - 0.2;
				l < p.value.default.limitCloseoutScale && (l = p.value.default.limitCloseoutScale), p.setScale(l);
			});
			function Ls(index) {
				r.hoverIndex = index;
				r.chainIndexs = data[index].ui.chainIndexs;
			}
			function Rs(index) {
				r.hoverIndex = -1;
				r.chainIndexs = [];
			}

			// 為每個 land 元素添加事件監聽器
			lands.forEach((land, index) => {
				// 當滑鼠移入時，添加 -hover 類別
				land.addEventListener("mouseenter", () => {
					land.classList.add("-hover");
					land.classList.add("-chain");
					borders[index].classList.add("-hover");
					borders[index].classList.add("-chain");
					Ls(index);
					// document.documentElement.classList.remove("use-custom-cursor");
					// document.querySelector(".cursor__visual").classList.remove("show");
				});

				// 當滑鼠移出時，移除 -hover 類別
				land.addEventListener("mouseleave", () => {
					land.classList.remove("-hover");
					land.classList.remove("-chain");
					borders[index].classList.remove("-hover");
					borders[index].classList.remove("-chain");
					Rs(index);
					// document.documentElement.classList.add("use-custom-cursor");
					// document.querySelector(".cursor__visual").classList.add("show");
				});
			});

			document.documentElement.classList.add("use-custom-cursor");
			// document.querySelector(".cursor__visual").classList.add("show");

			const c = gsap.quickTo(".cursor__pointer", "x", {
					duration: 0.22,
					ease: "power3.out"
				}),
				f = gsap.quickTo(".cursor__pointer", "y", {
					duration: 0.22,
					ease: "power3.out"
				});
			window.addEventListener("mousemove", (g) => {
				const y = g.composedPath();
				for (let E = 0, _ = g.composedPath().length; E < _; ++E) {
					if (y[E].tagName === "A" || y[E].tagName === "BUTTON") {
						isHoverPointer.value = !0;
						document.documentElement.classList.remove("use-custom-cursor");
						break;
					}
					isHoverPointer.value = !1;
					document.documentElement.classList.add("use-custom-cursor");
				}
				c(g.clientX);
				f(g.clientY);
			});
			window.addEventListener("mousedown", (e) => {
				isPress.value = true;
			});
			window.addEventListener("mouseup", (e) => {
				isPress.value = false;
			});

			worldSelect.value = worlds[0].W;
			territorySelect.value = worlds[0].realms[0].R;
			landTypeSelect.value = landType[0];
		});
		return {
			territoryFilter,
			worlds,
			landClick,
			detailActive,
			r,
			detailBoxClose,
			isPress,
			isHoverPointer,
			worldSelect,
			territorySelect,
			worldSelectToggle,
			territorySelectToggle,
			selectToggle,
			worldSelectComputed,
			selected,
			territorySelectComputed,
			landType,
			landTypeSelect,
			landTypeSelectToggle
		};
	}
});

app.mount("#app");
