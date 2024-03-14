import ImageMap2D from "./mapCanvas2.js";
import data from "./data.js";
import worldData from "./world.js";
import territoryData from "./territory.js";

let app = Vue.createApp({
	setup() {
		let p = Vue.ref(null);
		let worlds = Vue.reactive(territoryData.worlds);
		let territoryFilter = Vue.reactive([]);
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
					document.documentElement.classList.remove("use-custom-cursor");
					document.querySelector(".cursor__visual").classList.remove("show");
				});

				// 當滑鼠移出時，移除 -hover 類別
				land.addEventListener("mouseleave", () => {
					land.classList.remove("-hover");
					land.classList.remove("-chain");
					borders[index].classList.remove("-hover");
					borders[index].classList.remove("-chain");
					Rs(index);
					document.documentElement.classList.add("use-custom-cursor");
					document.querySelector(".cursor__visual").classList.add("show");
				});
			});
			function Gs(e, n) {
				if (r.isMovingMap) {
					r.isMovingMap = !1;
					return;
				}
				(r.activeIndex = n), (r.isActive = !0);
				const pd = data[n],
					[m, a] = pd.ui.coords;
				(as = m > 65), p.value.setScale(p.value.default.limitCloseupScale * 0.6), p.value.setFocusMapPercent(m + L[0], a + L[1]);
				document.querySelector(".map-detail").classList.add("-active");
				lands.forEach((land, i) => {
					if (i !== r.activeIndex) {
						land.classList.remove("-select");
					} else {
						land.classList.add("-select");
					}
				});

				borders.forEach((border, i) => {
					if (i !== r.activeIndex) {
						border.classList.remove("-select");
					} else {
						border.classList.add("-select");
					}
				});
			}
			// 領土點擊
			// document.querySelectorAll("._land").forEach((e, n) => {
			// 	e.addEventListener("click", () => Gs(e, n));
			// });
			// 信息關閉
			// document.querySelector(".map-detail__close").addEventListener("click", () => {
			// 	r.isActive = !1;
			// 	document.querySelector(".map-detail").classList.remove("-active");
			// 	lands.forEach((land, i) => {
			// 		land.classList.remove("-select");
			// 	});

			// 	borders.forEach((border, i) => {
			// 		border.classList.remove("-select");
			// 	});
			// });

			const c = gsap.quickTo(".cursor__pointer", "x", {
					duration: 0.22,
					ease: "power3.out"
				}),
				f = gsap.quickTo(".cursor__pointer", "y", {
					duration: 0.22,
					ease: "power3.out"
				});
			window.addEventListener("mousemove", (e) => {
				c(e.clientX);
				f(e.clientY);
			});

			document.documentElement.classList.add("use-custom-cursor");
			document.querySelector(".cursor__visual").classList.add("show");
		});
		return {
			territoryFilter,
			worlds,
			landClick,
			detailActive,
			r,
			detailBoxClose
		};
	}
});

app.mount("#app");
