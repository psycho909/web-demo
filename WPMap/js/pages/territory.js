import ImageMap2D from "../mapCanvas.js";
import worldData1 from "../worldData.js";
import worldData2 from "../worldData2.js";
import territoryData from "../territoryData.js";

const territory = {
	data() {
		return {
			map: null,
			r: {
				hoverIndex: -1,
				activeIndex: -1,
				chainIndexs: [],
				isActive: false,
				isMiniumMap: false,
				isMovingMap: false
			},
			worlds: territoryData.worlds,
			worldSelect: null,
			realmSelect: null,
			worldSelectToggle: false,
			landTypeSelectToggle: false,
			realmSelectToggle: false,
			landType: [
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
			],
			landTypeSelect: null,
			detailActive: false,
			ss: null,
			as: false,
			L: [0, 0],
			isPress: false,
			isHoverPointer: false,
			territory: territoryData.territorys,
			worldData: [...worldData1]
		};
	},
	computed: {
		territoryFilter() {
			const guildIndexMap = new Map();
			this.worldData.forEach((v, i) => {
				if (v.guild_id) {
					if (!guildIndexMap.has(v.guild_id)) {
						guildIndexMap.set(v.guild_id, []);
					}
					guildIndexMap.get(v.guild_id).push(i);
				}
			});
			return this.worldData
				.map((v) => {
					const isMatchUI = !!this.territory[v.territory_id];
					const chainIndices = v.guild_id ? guildIndexMap.get(v.guild_id) : [];
					return {
						...v,
						isMatchUI,
						landType: v.territory_grade.toLowerCase(),
						ui: {
							...(this.territory[v.territory_id] || {}),
							isOccupyElf: v.guild_id == null,
							isShowTradeTax: v.guild_id != null && v.gradeType !== "garrison",
							chainIndexs: chainIndices
						}
					};
				})
				.filter((v) => v.isMatchUI);
		},
		worldSelectComputed() {
			return this.worlds.find((w) => w.W === this.worldSelect);
		},
		realmSelectComputed() {
			const world = this.worlds.find((w) => w.W === this.worldSelect);
			if (world) {
				return world.realms.find((r) => r.R === this.realmSelect);
			}
			return [];
		},
		landTypeFilter() {
			const filtered = this.territoryFilter.filter((v) => v.territory_grade.toLocaleLowerCase() === this.landTypeSelect?.v);
			return filtered.length > 0 ? filtered : [];
		}
	},
	methods: {
		landClick(id, index) {
			this.detailBox(id, index);
		},
		detailBoxClose() {
			this.r.isActive = false;
			this.r.activeIndex = -1;
			this.detailActive = false;
		},
		detailBox(id, index) {
			if (this.r.isMovingMap) {
				this.r.isMovingMap = false;
				return;
			}
			this.r.activeIndex = index;
			this.r.isActive = true;
			const pd = this.territoryFilter[index];
			const [m, a] = pd.ui.coords;
			this.as = m > 65;
			this.map.setScale(this.map.default.limitCloseupScale * 0.6);
			this.map.setFocusMapPercent(m + this.L[0], a + this.L[1]);
			this.detailActive = true;
		},
		closeSelect(event) {
			const isAccordionButton = event.target.classList.contains("button--selector");
			const somethingButton = event.target.closest(".button--selector");
			const isInsideAccordion = event.target.closest(".selector__content");
			if (!isAccordionButton && !isInsideAccordion && !somethingButton) {
				document.querySelectorAll(".button--selector, .selector__content").forEach((content) => {
					this.worldSelectToggle = false;
					this.realmSelectToggle = false;
					this.landTypeSelectToggle = false;
				});
			}
		},
		selectToggle(type, event) {
			if (type == "world") {
				this.worldSelectToggle = !this.worldSelectToggle;
				this.realmSelectToggle = false;
				this.landTypeSelectToggle = false;
				setTimeout(() => {
					if (!this.worldSelectToggle) {
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
				this.realmSelectToggle = !this.realmSelectToggle;
				this.worldSelectToggle = false;
				this.landTypeSelectToggle = false;
				setTimeout(() => {
					if (!this.realmSelectToggle) {
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
				this.landTypeSelectToggle = !this.landTypeSelectToggle;
				this.realmSelectToggle = false;
				this.worldSelectToggle = false;
				if (!this.landTypeSelectToggle) {
					return;
				}
			}
		},
		selected(type, W) {
			if (type == "world") {
				this.worldSelect = W;
				this.worldData = [...worldData2];
			}
			if (type == "territory") {
				this.realmSelect = W;
				this.worldData = [...worldData1];
			}
			if (type == "landType") {
				this.landTypeSelect = W;
			}
		},
		imageMapSetup() {
			// 地圖創建
			const imageElement = new Image();
			// imageElement.src = "./assets/css/images/territory/bg_worldmap_1_new.jpg";
			imageElement.src = "./assets/css/images/territory/bg_worldmap_24_1.jpg";
			// 獲取所有的 land 和 border 元素
			let lands = document.querySelectorAll("._land");
			let borders = document.querySelectorAll("._border");

			// 地圖事件
			this.map = new ImageMap2D({
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
			this.map.on("pressDownBefore", (m, a) => {
				for (let c = 0, u = a.length; c < u; ++c) if (a[c] === this.ss) return !1;
			});
			this.map.on("pressMove", (m, a) => {
				const { dx: c, dy: u } = a,
					h = Math.max(Math.abs(c), Math.abs(u)),
					w = h > 120,
					b = h > 10;
				(this.r.isMovingMap = b), w && (this.r.isActive = !1);
				if (!this.r.isActive) {
					document.querySelector(".map-detail").classList.remove("-active");
					lands.forEach((land, i) => {
						land.classList.remove("-select");
					});

					borders.forEach((border, i) => {
						border.classList.remove("-select");
					});
				}
			});
			this.map.on("pressUp", () => {
				setTimeout(() => {
					this.r.isMovingMap = !1;
				}, 0);
			});
			this.map.on("changeScale", () => {
				(this.r.isMiniumMap = this.map.focus.scale <= this.map.default.limitCloseoutScale), this.r.isMiniumMap && (this.r.isActive = !1);
			});
			this.map.create();

			// 地圖放大
			document.querySelector("._scale-up").addEventListener("click", () => {
				if (!this.map) return;
				let l = this.map.focus.scale + 0.2;
				l > 1.5 && (l = 1.5), this.map.setScale(l);
			});

			// 地圖缩小
			document.querySelector("._scale-down").addEventListener("click", () => {
				if (!this.map) return;
				let l = this.map.focus.scale - 0.2;
				l < this.map.default.limitCloseoutScale && (l = this.map.default.limitCloseoutScale), this.map.setScale(l);
			});
			function Ls(index) {
				r.hoverIndex = index;
				r.chainIndexs = territoryFilter.value[index].ui.chainIndexs;
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
			// 滑鼠樣式
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
						this.isHoverPointer = !0;
						document.documentElement.classList.remove("use-custom-cursor");
						break;
					}
					this.isHoverPointer = !1;
					document.documentElement.classList.add("use-custom-cursor");
				}
				c(g.clientX);
				f(g.clientY);
			});
			window.addEventListener("mousedown", (e) => {
				this.isPress = true;
			});
			window.addEventListener("mouseup", (e) => {
				this.isPress = false;
			});

			// 初始化選單
			document.documentElement.classList.add("use-custom-cursor");
			// 導覽列高度
			let navTop = 0;
			if (document.querySelector(".navBar") !== null) {
				navTop = document.querySelector(".navBar").clientHeight;
			}
			// 最大高度
			let maxvh = window.innerHeight;
			// 最大高度減去導覽列高度
			let maxvhNavtop = maxvh - navTop;
			document.querySelector(":root").style.setProperty(`--maxvh`, maxvh + "px");
			document.querySelector(":root").style.setProperty(`--maxvh-without-navtop`, maxvhNavtop + "px");
			if (isMobile.any) {
				window.addEventListener("scroll", function () {
					var list = document.querySelector(".territory-table__list");
					var items = document.querySelectorAll("li.territory-table__item");

					// 获取视窗中心的Y坐标
					var viewportCenter = window.innerHeight / 2 || document.documentElement.clientHeight / 2;

					// 获取.row-gap值
					var style = window.getComputedStyle(list);
					var rowGap = parseInt(style.getPropertyValue("row-gap"), 10);

					items.forEach(function (item) {
						var rect = item.getBoundingClientRect();

						// 计算元素中心点的Y坐标，考虑到row-gap
						var itemCenter = rect.top + rect.height / 2 - rowGap * 2;

						// 检查元素中心是否在视窗中心的一定范围内，这里的范围可以根据需要调整
						if (Math.abs(viewportCenter - itemCenter) < 100) {
							// 例如，这里的范围设置为100像素
							item.classList.add("active");
						} else {
							item.classList.remove("active");
						}
					});
				});
			} else {
				window.addEventListener("resize", function () {
					let maxvh = window.innerHeight;
					let maxvhNavtop = maxvh - navTop;
					document.querySelector(":root").style.setProperty(`--maxvh`, maxvh + "px");
					document.querySelector(":root").style.setProperty(`--maxvh-without-navtop`, maxvhNavtop + "px");
				});
			}
		}
	},
	mounted() {
		this.worldSelect = this.worlds[0].W;
		this.realmSelect = this.worlds[0].realms[0].R;
		this.landTypeSelect = this.landType[0];
		this.imageMapSetup();
	},
	template: `
    <div id="map-territory" @click="closeSelect">
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
                            <div class="page__nav__depth1-item active">據點現況</div>
                        </div>
                        <div class="page__nav-item page__nav__depth2">
                            <button class="button--selector button--selector-world" @click="selectToggle('world',$event)">
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
                            </button>
                            <button class="button--selector button--selector-territory" @click="selectToggle('realm',$event)">
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
                            </button>
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
                                        <span class="_land-effect"><span></span><span></span><span></span></span><span class="_land-badge" :class="'land--'+territory.landType"></span>
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
                                <li class="territory-table__item" :class="[land.ui.isOccupyElf?'type--occpuy-elf type--'+land.landType:'type--'+land.landType]" v-for="(land,index) of landTypeFilter">
                                    <div class="land-box">
                                        <span class="land-info__badge"></span>
                                        <span class="land-info__name">{{land.ui.name}}</span>
                                        <span class="land-info__occupy-elf" v-if="land.guild_id == null">佔領精靈軍隊</span>
                                    </div>
                                    <div class="land-box" v-if="land.guild_id !== null">
                                        <span class="land-guild__mark"><i class="i--guildmark"></i></span>
                                        <span class="land-guild__name">{{land.guild_name}}</span>
                                        <span class="land-guild__member">{{land.guild_member_count}}/{{land.max_guild_member_count}}</span>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default territory;
