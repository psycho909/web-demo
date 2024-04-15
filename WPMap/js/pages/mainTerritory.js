import territoryData from "../territoryData.js";
import worldData1 from "../worldData.js";
import worldData2 from "../worldData2.js";
import { GetWorldList, GetServerList, PostLiveapiTerritoryByWorldId } from "../api.js";

const mainTerritory = {
	data() {
		return {
			worlds: [],
			worldSelect: null,
			realmSelect: null,
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
			worldSelectToggle: false,
			realmSelectToggle: false,
			landTypeSelectToggle: false,
			swiper: null,
			territory: {},
			worldData: [],
			isOpen: false
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
		territorySelectComputed() {
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
		selectToggle(type, event) {
			if (type === "world") {
				this.worldSelectToggle = !this.worldSelectToggle;
				this.realmSelectToggle = false;
				this.landTypeSelectToggle = false;
				this.updateSelectorHeight(".button--selector-world");
			}
			if (type === "realm") {
				this.realmSelectToggle = !this.realmSelectToggle;
				this.worldSelectToggle = false;
				this.landTypeSelectToggle = false;
				this.updateSelectorHeight(".button--selector-territory");
			}
			if (type === "landType") {
				this.landTypeSelectToggle = !this.landTypeSelectToggle;
				this.realmSelectToggle = false;
				this.worldSelectToggle = false;
			}
		},
		selected(type, W) {
			if (type === "world") {
				this.worldSelect = W;
				this.worldData = [...worldData2];
			}
			if (type === "territory") {
				this.realmSelect = W;
				this.worldData = [...worldData1];
			}
			if (type === "landType") {
				if (this.landTypeSelect === W) {
					return;
				}
				this.landTypeSelect = W;
				this.$nextTick(() => {
					this.updateSwiper();
				});
			}
		},
		openNotice() {
			this.isOpen = !this.isOpen;
		},
		closeSelect(event) {
			const isAccordionButton = event.target.classList.contains("button--selector");
			const somethingButton = event.target.closest(".button--selector");
			const isInsideAccordion = event.target.closest(".selector__content");
			if (!isAccordionButton && !isInsideAccordion && !somethingButton) {
				document.querySelectorAll(".button--selector, .selector__content").forEach((content) => {
					this.landTypeSelectToggle = false;
					this.realmSelectToggle = false;
					this.worldSelectToggle = false;
				});
			}
		},
		updateSelectorHeight(selector) {
			setTimeout(() => {
				if (!this[selector + "Toggle"]) return;
				const listHeight = document.querySelector(selector + " ul").clientHeight;
				const maxHeight = 360;
				document.querySelector(selector + " .selector__transform").style.height = Math.min(listHeight, maxHeight) + "px";
			}, 0);
		},
		updateSwiper() {
			this.$nextTick(() => {
				this.$nextTick(() => {
					if (!isMobile.any) {
						if (this.swiper.destroyed && this.landTypeFilter.length > 3) {
							this.swiper = new Swiper(".main-territory__swiper", {
								slidesPerView: 3,
								spaceBetween: 30,
								centeredSlides: true,
								loop: true,
								navigation: {
									nextEl: ".main-territory__swiper-next",
									prevEl: ".main-territory__swiper-prev"
								}
							});
						}
						if (this.landTypeFilter.length <= 3) {
							this.swiper.update();
							this.swiper.loopDestroy();
							this.swiper.destroy();
						} else {
							this.swiper.update();
							this.swiper.loopDestroy();
							this.swiper.loopCreate();
						}
					} else {
						this.swiper.update();
						this.swiper.loopDestroy();
						this.swiper.loopCreate();
					}
				});
			});
		}
	},
	mounted() {
		this.worlds = territoryData.worlds;
		this.territory = territoryData.territorys;
		this.worldData = [...worldData1];
		this.worldSelect = this.worlds[0].W;
		this.realmSelect = this.worlds[0].realms[0].R;
		this.landTypeSelect = this.landType[0];
		this.$nextTick(() => {
			if (isMobile.any) {
				this.swiper = new Swiper(".main-territory__swiper", {
					slidesPerView: 1,
					spaceBetween: 30,
					centeredSlides: true,
					loop: true
				});
			} else {
				this.swiper = new Swiper(".main-territory__swiper", {
					slidesPerView: 3,
					spaceBetween: 30,
					centeredSlides: true,
					loop: true,
					navigation: {
						nextEl: ".main-territory__swiper-next",
						prevEl: ".main-territory__swiper-prev"
					}
				});
			}
		});
	},
	template: `
    <div class="main-territory" @click="closeSelect">
        <div class="main-territory__wrap">
            <div class="main-territory__title">據點現況</div>
            <div class="main-territory__nav">
                <div class="main-territory__nav-item main-territory__nav-world">
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
                </div>
                <div class="main-territory__nav-item main-territory__nav-realm">
                    <div class="button--selector button--selector-territory" @click="selectToggle('realm',$event)">
                        <span class="_name">領域選擇</span>
                        <div class="mask-text _value"><div>{{territorySelectComputed?.name}}</div></div>
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
                <div class="main-territory__nav-item main-territory__nav-type">
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
            </div>
            <div class="main-territory__tab">
                <div v-for="l in landType" class="main-territory__tab-item" :class="[landTypeSelect?.v === l.v?'active':'']" @click="selected('landType',l)"><i :class="'i--'+l.v"></i>{{l.name}}</div>
            </div>
            <div class="main-territory__info">
                <div class="main-territory__info-total">總計:<span>{{territoryFilter.length}}</span></div>
                <div :class="['main-territory__info-notice', { '-open': isOpen }]" @click="openNotice">
                    <i class="i--notice"></i>
                    <div class="main-territory__info-notice-popup">據點佔領現況每1小時更新一次<span></span></div>
                </div>
            </div>
            <div class="main-territory__swiper-box" :class="[landTypeFilter.length <= 3 ? 'stop-swiper':'']">
                <div class="main-territory__swiper swiper">
                    <div class="main-territory__swiper-wrapper swiper-wrapper">
                        <div class="main-territory__swiper-slide swiper-slide" v-for="(land,index) of landTypeFilter">
                            <div class="main-territory__land-box">
                                <span class="main-territory__land-type"><i :class="'i--'+land.landType"></i></span>
                                <div class="main-territory__land-name">{{land.ui.name}}</div>
                            </div>
                            <div class="main-territory__land-box main-territory__land-box--guild">
                                <div class="main-territory__land-guild__lv" :class="[land.guild_id !== null?'':'npc']">
									<span v-if="land.guild_id !== null">LV.{{land.guild_level}}</span>
									<div class="spinner--progress-dots" style="--0dba516f: rgba(200, 200, 200, 1);" v-else><span></span><span></span><span></span></div>
								</div>
                                <div class="main-territory__land-guild__name">{{land.guild_id !== null?land.guild_master_gc_name:'佔領精靈軍隊'}}</div>
                            </div>
                            <div class="main-territory__land-box main-territory__land-tax">
                                <span class="land-tax-stack"><i class="i--money"></i>累積稅金 </span>
                                <div class="land-wealth type--diamond">
                                    <span class="land-wealth__icon"></span>
                                    <span class="land-wealth__value">{{land.tax_dia}}</span>
                                </div>
                                <div class="land-wealth type--ruby">
                                    <span class="land-wealth__icon"></span>
                                    <span class="land-wealth__value">{{land.tax_ruby}}</span>
                                </div>
                            </div>
                            <div class="main-territory__land-box main-territory__land-tax">
                                <span class="land-trade-tax"><i class="i--money"></i>一般商店稅率 </span>
        						<span class="land-trade-tax__value">{{land.shop_tax_rate}}%</span>
                            </div>
                            <div class="main-territory__land-box main-territory__land-tax">
                                <span class="land-trade-tax"><i class="i--money"></i>鐵匠稅率 </span>
        						<span class="land-trade-tax__value">{{land.craft_tax_rate}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-territory__swiper-prev"></div>
                <div class="main-territory__swiper-next"></div>
            </div>
            <a href="javascript:;" class="main-territory__btn">更多據點的詳細狀況</a>
        </div>
    </div>
    `
};

export default mainTerritory;
