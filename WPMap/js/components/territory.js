import ImageMap2D from "../mapCanvas.js";
import worldData from "../worldData.js";
import territoryData from "../territoryData.js";

const territory = {
	setup() {
		let p = Vue.ref(null);
		// 世界選取
		let worlds = Vue.reactive(territoryData.worlds);
		let worldSelect = Vue.ref(null);
		// 領域選取
		let realmSelect = Vue.ref(null);
		let territoryFilter = Vue.reactive([]);
		let worldSelectToggle = Vue.ref(false);
		let landTypeSelectToggle = Vue.ref(false);
		let realmSelectToggle = Vue.ref(false);
		// 類型選擇
		let landType = Vue.reactive([
			{
				name: "駐紮地",
				v: "garrison"
			},
			{
				name: "要塞",
				v: "fortress"
			},
			{
				name: "城堡",
				v: "castle"
			}
		]);
		let landTypeSelect = Vue.ref(null);
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
		// 獲取領地SVG資料
		let territory = territoryData.territorys;
		// 類API資料
		let world = worldData;
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

		// 領地點擊
		const landClick = (id, index) => {
			detailBox(id, index);
		};
		// 領地訊息關閉
		const detailBoxClose = () => {
			r.isActive = false;
			r.activeIndex = -1;
			detailActive.value = false;
		};
		// 領地訊息開啟置中
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
		// 選取切換
		const selectToggle = (type, event) => {
			if (type == "world") {
				worldSelectToggle.value = !worldSelectToggle.value;
				realmSelectToggle.value = false;
				landTypeSelectToggle.value = false;
				setTimeout(() => {
					if (!worldSelectToggle.value) {
						return;
					}
					let h = document.querySelector(".button--selector-world ul").clientHeight;
					if (h > 360) {
						h = 360;
					}
					document.querySelector(".button--selector-world .selector__transform").style.height = h + "px";
				}, 0);
			}
			if (type == "realm") {
				realmSelectToggle.value = !realmSelectToggle.value;
				worldSelectToggle.value = false;
				landTypeSelectToggle.value = false;
				setTimeout(() => {
					if (!realmSelectToggle.value) {
						return;
					}
					let h = document.querySelector(".button--selector-territory ul").clientHeight;
					if (h > 360) {
						h = 360;
					}
					document.querySelector(".button--selector-territory .selector__transform").style.height = h + "px";
				}, 0);
			}
			if (type == "landType") {
				landTypeSelectToggle.value = !landTypeSelectToggle.value;
				realmSelectToggle.value = false;
				worldSelectToggle.value = false;
				if (!landTypeSelectToggle.value) {
					return;
				}
			}
		};
		// 選取v-model
		const selected = (type, W) => {
			if (type == "world") {
				worldSelect.value = W;
			}
			if (type == "territory") {
				realmSelect.value = W;
			}
			if (type == "landType") {
				landTypeSelect.value = W;
			}
		};

		// 世界選取過濾
		const worldSelectComputed = Vue.computed(() => {
			let w = worlds.filter((v, i) => {
				return v.W === worldSelect.value;
			})[0];
			return w;
		});

		// 領域選取過濾
		const realmSelectComputed = Vue.computed(() => {
			let w = worlds.filter((v, i) => {
				return v.W === worldSelect.value;
			})[0];
			if (w) {
				let t = w.realms.filter((v, i) => {
					return v.R === realmSelect.value;
				})[0];
				return t;
			}
			return [];
		});
		// MB據點現況
		const landTypeFilter = Vue.computed(() => {
			let l = dataFilter.filter((v, i) => {
				if (v.ui.gradeType === landTypeSelect.value?.v) {
					return v;
				}
			});
			if (l.length > 0) {
				return l;
			}
			return [];
		});
		// 地圖創建
		const imageElement = new Image();
		imageElement.src = "./assets/css/images/bg_worldmap_1_new.jpg";

		// 初始化
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
				r.chainIndexs = dataFilter[index].ui.chainIndexs;
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
				});

				// 當滑鼠移出時，移除 -hover 類別
				land.addEventListener("mouseleave", () => {
					land.classList.remove("-hover");
					land.classList.remove("-chain");
					borders[index].classList.remove("-hover");
					borders[index].classList.remove("-chain");
					Rs(index);
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
			realmSelect.value = worlds[0].realms[0].R;
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
			realmSelect,
			worldSelectToggle,
			realmSelectToggle,
			selectToggle,
			worldSelectComputed,
			selected,
			realmSelectComputed,
			landType,
			landTypeSelect,
			landTypeSelectToggle,
			landTypeFilter
		};
	},
	template: `
    <div id="map-territory">
        <div id="plate--base">
            <div class="cursor -before-press" :class="[isPress?'-press':'',isHoverPointer?'-hover':'']">
                <span class="cursor__pointer" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px)">
                    <span class="cursor__visual type--drag-text-2" v-if="!isHoverPointer"><span></span><span></span><span></span></span>
                </span>
            </div>
        </div>
        <div id="plate--page">
            <div class="page--records-territory">
                <div class="layout__wrap">
                    <div class="page__nav">
                        <div class="page__nav__dimmed"></div>
                        <!-- 頁面切換按鈕 -->
                        <div class="page__nav-item page__nav__depth1">
                            <div class="page__nav__depth1-item">戰榜RANK</div>
                            <div class="page__nav__depth1-item">賽季戰況</div>
                            <div class="page__nav__depth1-item current">據點現況</div>
                        </div>
                        <div class="page__nav-item page__nav__depth2">
                            <div class="button--selector button--selector-world" @click="selectToggle('world',$event)">
                                <span class="_name">世界選擇</span>
                                <div class="mask-text _value"><div>{{worldSelectComputed?.name}}</div></div>
                                <div class="selector type--fly">
                                    <select v-model="worldSelect">
                                        <option v-for="world in worlds" :value="world.W">{{world.name}}</option>
                                    </select>
                                    <div class="selector__box type--fly" :class="[worldSelectToggle?'-open':'']">
                                        <span class="selector__dimmed"></span>
                                        <div class="selector__transform" v-if="worldSelectToggle">
                                            <span class="selector__close"><span></span></span>
                                            <div class="selector__content" style="max-height: 360px">
                                                <ul>
                                                    <li v-for="world in worlds" :class="[worldSelect === world.W?'-selected':'']" @click="selected('world',world.W)"><span>{{world.name}}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button--selector button--selector-territory" @click="selectToggle('realm',$event)">
                                <span class="_name">領域選擇</span>
                                <div class="mask-text _value"><div>{{realmSelectComputed?.name}}</div></div>
                                <div class="selector type--fly">
                                    <select v-model="worldSelect">
                                        <option v-for="territory in worldSelectComputed?.realms" :value="territory.R">{{territory.name}}</option>
                                    </select>
                                    <div class="selector__box type--fly" :class="[realmSelectToggle?'-open':'']">
                                        <span class="selector__dimmed"></span>
                                        <div class="selector__transform" v-if="realmSelectToggle">
                                            <span class="selector__close"><span></span></span>
                                            <div class="selector__content" style="max-height: 360px">
                                                <ul>
                                                    <li v-for="territory in worldSelectComputed?.realms" :class="[realmSelect === territory.R?'-selected':'']" @click="selected('territory',territory.R)"><span>{{territory.name}}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="page__nav-item page__nav__depth3">
                            <div class="button--selector button--selector-world" @click="selectToggle('landType',$event)">
                                <span class="_name"><i :class="'i--'+landTypeSelect?.v"></i>{{landTypeSelect?.name}}</span>
                                <div class="selector type--fly">
                                    <select v-model="landTypeSelect">
                                        <option v-for="l in landType" :value="l.v">{{l.name}}</option>
                                    </select>
                                    <div class="selector__box type--fly" :class="[landTypeSelectToggle?'-open':'']">
                                        <span class="selector__dimmed"></span>
                                        <div class="selector__transform" v-if="landTypeSelectToggle">
                                            <span class="selector__close"><span></span></span>
                                            <div class="selector__content" style="max-height: 360px">
                                                <ul>
                                                    <li v-for="l in landType" :class="[landTypeSelect?.v === l.v?'-selected':'']" @click="selected('landType',l)"><i :class="'i--'+l?.v"></i><span>{{l.name}}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="_interval-notice">※ 據點佔領現況每小時更新一次。</p>
                        <p class="_viewport-notice">※1920 解析為據點佔領現況最佳化解析度。</p>
                    </div>
                    <div class="page__content">
                        <div class="territory-map">
                            <svg class="territory-map__filter">
                                <defs>
                                    <linearGradient id="gradient-hover-border" gradientTransform="rotate(90)">
                                        <stop offset="0%" stop-color="rgba(255,255,255,0.3)"></stop>
                                        <stop offset="110%" stop-color="rgba(255,238,204,1)"></stop>
                                    </linearGradient>
                                </defs>
                                <defs>
                                    <linearGradient id="gradient-select-border" gradientTransform="rotate(90)">
                                        <stop offset="0%" stop-color="rgba(255,255,255,0.3)"></stop>
                                        <stop offset="110%" stop-color="rgba(255,178,64,1)"></stop>
                                    </linearGradient>
                                </defs>
                                <defs>
                                    <linearGradient id="gradient-occupy-elf-border" gradientTransform="rotate(90)">
                                        <stop offset="0%" stop-color="rgba(31,26,18,0)"></stop>
                                        <stop offset="110%" stop-color="rgba(31,26,18,0.89)"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="territory-map__canvas">
                                <div class="map-area-1">
                                    <button v-for="(territory,index) in territoryFilter" class="_land" :class="[territory.ui.isOccupyElf?'-occupy-elf':'',r.activeIndex == index?'-select':'']" :style="'left:'+territory.ui.coords[0]+'%;top:'+territory.ui.coords[1]+'%;'" @click="landClick(territory.territory_id,index)">
                                        <span class="_land-effect"><span></span><span></span><span></span></span><span class="_land-badge" :class="'type--'+territory.ui.gradeType"></span>
                                        <div class="_land-more">
                                            <p class="_land-name">{{territory.ui.name}}</p>
                                            <div class="_land-guild-name">
                                                <div v-if="territory.guild_id == null" class="spinner--progress-dots" style="--0dba516f: #fff"><span></span><span></span><span></span></div>
                                                <p>{{territory.guild_id === null ?'엘프 군단 점령중':territory.guild_name}}</p>
                                                <span class="_land-plus"><span></span><span></span><i class="i--plus"></i></span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div class="map-area-2">
                                    <div class="_border" :class="[territory.ui.isOccupyElf?'-occupy-elf':'',r.activeIndex == index?'-select':'']" v-for="(territory,index) in territoryFilter" :style="'left:'+territory.ui.coords[0]+'%;top:'+territory.ui.coords[1]+'%;'">
                                        <svg xmlns="http://www.w3.org/2000/svg" :width="territory.ui.size[0]" :height="territory.ui.size[1]" :viewBox="'0 0 '+territory.ui.size[0]+' '+territory.ui.size[1]" style="transform: scale(1)"><path fill-rule="evenodd" clip-rule="evenodd" :d="territory.ui.d"></path></svg>
                                    </div>
                                </div>
                                <canvas class="map-canvas" width="1912" height="238"></canvas>
                            </div>
                            <div class="map-detail" :class="[detailActive?'-active':'',territoryFilter[r.activeIndex]?.guild_id == null?'-occupy-elf':'']">
                                <button class="map-detail__close" @click="detailBoxClose">
                                    <i class="i--xmark-2"></i>
                                    <span></span>
                                </button>
                                <div class="map-detail__box" v-if="r.activeIndex !== -1">
                                    <div class="_guild-info" v-if="territoryFilter[r.activeIndex]?.guild_id !== null">
                                        <div class="_guild-title">
                                            <span class="_name">
                                                <i class="i--guildmark"></i>
                                                旅團名稱:
                                            </span>
                                            <span class="_guild-name">{{territoryFilter[r.activeIndex]?.guild_name}}</span>
                                        </div>
                                        <div class="_guild-master">
                                            <span class="_name"> <i class="i--crown"></i>會長名稱:</span><span class="_value">{{territoryFilter[r.activeIndex]?.guild_master_gc_name}}</span>
                                        </div>
                                        <div class="_guild-member">
                                            <span class="_name"><i class="i--member"></i>旅團成員:</span><span class="_value">{{territoryFilter[r.activeIndex]?.guild_member_count}}<strong>/{{territoryFilter[r.activeIndex]?.max_guild_member_count}}</strong></span>
                                        </div>
                                    </div>
                                    <div class="_guild-description" v-if="territoryFilter[r.activeIndex]?.guild_id !== null">{{territoryFilter[r.activeIndex]?.guild_description}}</div>
                                    <div class="spinner--progress-dots" style="--0dba516f: rgba(200, 200, 200, 1)" v-if="territoryFilter[r.activeIndex].guild_id === null">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <p class="_elf-title" v-if="territoryFilter[r.activeIndex].guild_id === null">佔領精靈軍隊</p>
                                    <ul class="_land-info">
                                        <li class="_land-total-tax">
                                            <span class="_title"><i class="i--money"></i>累計稅率</span><span class="dot-line"></span>
                                            <div class="_land-wealth type--diamond -guild">
                                                <span class="land-wealth__icon"></span>
                                                <div class="_value">{{territoryFilter[r.activeIndex]?.tax_dia}}</div>
                                            </div>
                                            <div class="_land-wealth type--rudy -guild">
                                                <span class="land-wealth__icon"></span>
                                                <div class="_value">{{territoryFilter[r.activeIndex]?.tax_ruby}}</div>
                                            </div>
                                        </li>
                                        <hr />
                                        <li class="_land-shop-tax">
                                            <span class="_title"><i class="i--money-percent"></i>一般商店稅率</span><span class="dot-line"></span>
                                            <div class="_value">{{territoryFilter[r.activeIndex]?.shop_tax_rate}}%</div>
                                        </li>
                                        <li class="_land-craft-tax">
                                            <span class="_title"><i class="i--money-percent"></i>鐵匠稅率</span><span class="dot-line"></span>
                                            <div class="_value">{{territoryFilter[r.activeIndex]?.craft_tax_rate}}%</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="territory-map__scale">
                                <button class="_scale-up"><i class="i--plus"></i><span>放大</span></button><button class="_scale-down"><i class="i--minus"></i><span>맵 축소</span></button>
                            </div>
                        </div>
                        <!-- MB據點現況 -->
                        <div class="sort--garrison territory-table">
                            <p class="territory-table__notice">※據點佔領現況每小時更新一次</p>
                            <ul class="territory-table__list">
                                <li class="territory-table__item" :class="[land.ui.isOccupyElf?'type--occpuy-elf type--'+land.ui.gradeType:'type--'+land.ui.gradeType]" v-for="(land,index) of landTypeFilter">
                                    <div class="land-box">
                                        <span class="land-info__badge"></span>
                                        <span class="land-info__name">{{land.ui.name}}</span>
                                        <span class="land-info__occupy-elf" v-if="land.guild_id == null">佔領精靈軍隊</span>
                                    </div>
                                    <div class="land-box" v-if="land.guild_id !== null">
                                        <span class="land-guild__mark"><i class="i--guildmark"></i></span>
                                        <span class="land-guild__name">{{land.guild_name}}</span>
                                        <span class="land-guild__member">44/99</span>
                                    </div>
                                    <div class="land-box" v-if="land.guild_id !== null">
                                        <div class="land-guild">
                                            <div class="land-guild__master">
                                                <span>會長名稱</span>
                                                <span>{{land.guild_master_gc_name}}</span>
                                            </div>
                                            <div class="land-guild__description">
                                                <span>招募資訊</span>
                                                <span>{{land.guild_description}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="land-box land-tax">
                                        <span class="land-tax-stack"> <i class="i--money"></i>累積稅金 </span>
                                        <div class="land-wealth type--diamond">
                                            <span class="land-wealth__icon"></span>
                                            <span class="land-wealth__value">{{land.tax_dia}}</span>
                                        </div>
                                        <div class="land-wealth type--ruby">
                                            <span class="land-wealth__icon"></span>
                                            <span class="land-wealth__value">{{land.tax_ruby}}</span>
                                        </div>
                                    </div>
                                    <div class="land-box land-tax">
                                        <span class="land-trade-tax"> <i class="i--money"></i>一般商店稅率 </span>
                                        <span class="land-trade-tax__value">{{land.shop_tax_rate}}%</span>
                                    </div>
                                    <div class="land-box land-tax">
                                        <span class="land-trade-tax"> <i class="i--money"></i>鐵匠稅率 </span>
                                        <span class="land-trade-tax__value">{{land.craft_tax_rate}}%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="territory-table__pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default territory;
