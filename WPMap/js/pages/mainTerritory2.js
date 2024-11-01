import territoryData from "../territoryData.js";
import worldData1 from "../worldData.js";
import worldData2 from "../worldData2.js";
import { GetWorldList, GetServerList, PostLiveapiTerritoryByWorldId } from "../api.js";

const mainTerritory = {
	setup() {
		// 世界選取
		let worlds = Vue.reactive(territoryData.worlds);
		let worldSelect = Vue.ref(null);
		// 領域選取
		let realmSelect = Vue.ref(null);
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
		let worldSelectToggle = Vue.ref(false);
		let realmSelectToggle = Vue.ref(false);
		let landTypeSelectToggle = Vue.ref(false);
		let swiper = Vue.ref(null);
		// 獲取領地SVG資料
		let territory = territoryData.territorys;
		// 類API資料
		let worldData = Vue.ref([]);
		worldData.value = [...worldData1];
		const territoryFilter = Vue.computed(() => {
			const guildIndexMap = new Map();

			// Pre-process to create a map for guild_id to indices
			worldData.value.forEach((v, i) => {
				if (v.guild_id) {
					if (!guildIndexMap.has(v.guild_id)) {
						guildIndexMap.set(v.guild_id, []);
					}
					guildIndexMap.get(v.guild_id).push(i);
				}
			});

			// Filter and transform the world data
			return worldData.value
				.map((v) => {
					const isMatchUI = !!territory[v.territory_id];
					const chainIndices = v.guild_id ? guildIndexMap.get(v.guild_id) : [];
					return {
						...v,
						isMatchUI,
						landType: v.territory_grade.toLowerCase(),
						ui: {
							...(territory[v.territory_id] || {}),
							isOccupyElf: v.guild_id == null,
							isShowTradeTax: v.guild_id != null && v.gradeType !== "garrison",
							chainIndexs: chainIndices
						}
					};
				})
				.filter((v) => v.isMatchUI);
		});
		// 當點擊其他非選取DOM關閉
		const closeSelect = (event) => {
			const isAccordionButton = event.target.classList.contains("button--selector");
			const somethingButton = event.target.closest(".button--selector");
			const isInsideAccordion = event.target.closest(".selector__content");
			if (!isAccordionButton && !isInsideAccordion && !somethingButton) {
				document.querySelectorAll(".button--selector").forEach((content) => {
					landTypeSelectToggle.value = false;
					realmSelectToggle.value = false;
					worldSelectToggle.value = false;
				});
				document.querySelectorAll(".selector__content").forEach((button) => {
					landTypeSelectToggle.value = false;
					realmSelectToggle.value = false;
					worldSelectToggle.value = false;
				});
			}
		};
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
				// 切換世界時重新打API
				worldData.value = [...worldData2];
			}
			if (type == "territory") {
				realmSelect.value = W;
				// 切換世界時重新打API
				worldData.value = [...worldData1];
			}
			if (type == "landType") {
				if (landTypeSelect.value === W) {
					return;
				}
				landTypeSelect.value = W;
				// 更新輪播資料
				Vue.nextTick(() => {
					Vue.nextTick(() => {
						if (!isMobile.any) {
							if (swiper.value.destroyed && landTypeFilter.value.length > 3) {
								swiper.value = new Swiper(".main-territory__swiper", {
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
							if (landTypeFilter.value.length <= 3) {
								swiper.value.update();
								swiper.value.loopDestroy();
								swiper.value.destroy();
							} else {
								swiper.value.update();
								swiper.value.loopDestroy();
								swiper.value.loopCreate();
							}
						} else {
							swiper.value.update();
							swiper.value.loopDestroy();
							swiper.value.loopCreate();
						}
					});
				});
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
		const territorySelectComputed = Vue.computed(() => {
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
		// 據點現況Slide
		const landTypeFilter = Vue.computed(() => {
			let l = territoryFilter.value.filter((v, i) => {
				if (v.territory_grade.toLocaleLowerCase() === landTypeSelect.value?.v) {
					return v;
				}
			});
			if (l.length > 0) {
				return l;
			}
			return [];
		});
		// 打開notice
		const isOpen = Vue.ref(false);

		const openNotice = () => {
			isOpen.value = !isOpen.value;
		};
		// 初始化
		Vue.onMounted(() => {
			worldSelect.value = worlds[0].W;
			realmSelect.value = worlds[0].realms[0].R;
			landTypeSelect.value = landType[0];
			Vue.nextTick(() => {
				if (isMobile.any) {
					swiper.value = new Swiper(".main-territory__swiper", {
						slidesPerView: 1,
						spaceBetween: 30,
						centeredSlides: true,
						loop: true
					});
				} else {
					swiper.value = new Swiper(".main-territory__swiper", {
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
		});
		return {
			territoryFilter,
			worlds,
			landType,
			worldSelect,
			realmSelect,
			landTypeSelect,
			selectToggle,
			selected,
			worldSelectComputed,
			territorySelectComputed,
			worldSelectToggle,
			realmSelectToggle,
			landTypeSelectToggle,
			landTypeFilter,
			openNotice,
			isOpen,
			closeSelect
		};
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
