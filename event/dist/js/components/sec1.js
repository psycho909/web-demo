import lightbox from "./GLightbox.js";
let sec1 = {
	setup() {
		let eventInfoLB = Vue.ref(false);
		let awardInfoLB = Vue.ref(false);
		let coinHistoryLB = Vue.ref(true);

		return {
			eventInfoLB,
			awardInfoLB,
			coinHistoryLB,
		};
	},
	components: {
		lightbox,
	},
	template: `
        <div class="sec sec1">
            <div class="container">
                <a href="javascript:;" class="logo"></a>
                <div class="sec1-top">
                    <div class="sec1-top__account"><span>bea...</span></div>
                    <a href="javascript:;" class="sec1-top__logout">登出</a>
                </div>
                <div class="sec1-slogan1"></div>
                <div class="sec1-slogan2"></div>

                <div class="sec1-time">
                    <span>活動時間</span>
                    <span>2023/01/31(二)14:00~2023/02/15(三)10:00</span>
                </div>
                <div class="sec1-btns">
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="event-info" @click="()=>eventInfoLB=true">活動介紹</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="award-info" @click="()=>awardInfoLB=true">獎勵介紹</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="coin-history">代幣紀錄</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="get-award">領獎專區</a>
                </div>
            </div>
        </div>
        <lightbox v-model:showLightbox="eventInfoLB" class-name="w960 lb-eventInfo" :action="false">
            <template #lightbox-title>
                <div class="lb-title lb-title-event-info"></div>
            </template>
            <template #lightbox-content>
                <div class="lb-content">
                    <div class="lb-content__box">
                        <div class="lb-content__tab lb-tab-event-info1"></div>
                        <ol class="lb-content__ol">
                            <li class="lb-content__li">可使用代幣來啟動搖獎機，預設為單抽(消耗1個代幣)，勾選 [抽10個]時，則為10連抽(消耗10個代幣)。</li>
                            <li class="lb-content__li">搖獎機分為史詩/傳奇/上古/神話/代幣，共5種級別獎勵，轉到該級別後，可獲得一種該級別的獎勵。</li>
                            <li class="lb-content__li">10連抽時，搖獎機必定轉到[ALL IN]珠子，並從全部級別獎勵中一次獲得10種獎勵。</li>
                            <li class="lb-content__li">
                                搖獎機全級別獎勵說明如下，各級別獎勵內容可於[獎勵介紹]確認。
                                <ul class="lb-content__inner-ul">
                                    <li>轉到史詩級別可獲得史詩級獎勵其中一種。</li>
                                    <li>轉到傳奇級別可獲得傳奇級獎勵其中一種。</li>
                                    <li>轉到上古級別可獲得上古級獎勵其中一種。</li>
                                    <li>轉到神話級別可獲得神話級獎勵其中一種。</li>
                                    <li>轉到代幣級別可獲得代幣級獎勵其中一種(代幣將直接加進玩家的持有代幣量)。</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div class="lb-content__box">
                        <div class="lb-content__tab lb-tab-event-info2"></div>
                        <ol class="lb-content__ol">
                            <li class="lb-content__li">代幣取得將依照玩家所登入的遊戲帳號之各種條件任務來取得對應數量的代幣。</li>
                            <li class="lb-content__li">
                                遊戲帳號完成以下任務時，可獲得的代幣數量如下：
                                <ul class="lb-content__inner-ul">
                                    <li>前一日完成世界每日任務達7個(含)以上=1枚代幣</li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達1,000元</span>=<span class="green">10枚代幣</span></li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達2,000元</span>=<span class="green">30枚代幣</span></li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達4,000元</span>=<span class="green">75枚代幣</span></li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達8,000元</span>=<span class="green">140枚代幣</span></li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達16,000元</span>=<span class="green">250枚代幣</span></li>
                                    <li>活動期間內於遊戲商城<span class="green">累積消費G幣達32,000元</span>=<span class="green">480枚代幣</span></li>
                                </ul>
                                (活動期間為2023/01/31(三)14:00~2023/02/15(三)10:00)
                            </li>
                            <li class="lb-content__li">累積消費<span class="green">每整點更新一次</span>，玩家可重新整理頁面來確認，<span class="green">各消費金額的代幣量可全獲得</span>。</li>
                            <li class="lb-content__li">每日任務的計算週期為當日09:00~隔日09:00，並於每日09~10點自動加進玩家的持有代幣量。</li>
                            <li class="lb-content__li">消費G幣的任務包含隱藏商人的G幣花費，<span class="green">但不包含遊戲商城內的送禮</span>，還請玩家留意。</li>
                            <li class="lb-content__li">代幣最後獲得時間為02/15(三)10:00，後續將無法再獲得任何代幣。</li>
                        </ol>
                    </div>
                    <div class="lb-content__box">
                        <div class="lb-content__tab lb-tab-event-info3"></div>
                        <ol class="lb-content__ol">
                            <li class="lb-content__li">網頁上的傳奇/上古/神話寶箱，需有[可開啟次數]才可開啟，每開啟1次，消耗[可開啟次數]1次。</li>
                            <li class="lb-content__li">依照玩家的<span class="green">[消耗代幣量]</span>，可分別獲得傳奇/上古/神話寶箱的[可開啟次　數]。
                                <ul class="lb-content__inner-ul">
                                    <li>代幣消耗<span class="green">達50次</span>=傳奇寶箱[可開啟次數]1次</li>
                                    <li>代幣總消耗<span class="green">達100次</span>=上古寶箱[可開啟次數]1次</li>
                                    <li>代幣總消耗<span class="green">達200次</span>=神話寶箱[可開啟次數]1次</li>
                                </ul>
                            </li>
                            <li class="lb-content__li">依照代幣消耗量所獲得的[可開啟次數]為累積計算，例如小明代幣消耗量達200次，他則會有4次傳奇/2次上古/1次神話寶箱的[可開啟次數]。</li>
                            <li class="lb-content__li">開啟傳奇/上古/神話寶箱時，可獲得對應級別的獎勵，例如開啟神話寶箱，必定獲得神話級獎勵之一。</li>
                        </ol>
                    </div>
                    <div class="lb-content__box">
                        <div class="lb-content__tab lb-tab-event-info4"></div>
                        <ol class="lb-content__ol">
                            <li class="lb-content__li">於搖獎機或寶箱獲得獎勵後，可於頁面上的[領獎專區]確認目前取得的獎勵。</li>
                            <li class="lb-content__li">[領獎專區]可勾選要領取的獎勵，並可選擇領取角色，送出獎勵後將於30分鐘內在角色的信箱獲得獎勵。</li>
                            <li class="lb-content__li">角色若在送出獎勵前就在線上，需重新選擇角色進入遊戲方可收到信件。</li>
                            <li class="lb-content__li">[領獎專區]開放至02/22(三)10:00，還請玩家把握領獎時間。</li>
                            <li class="lb-content__li">選擇角色領取獎勵後，將無法反悔更改，還請玩家留意領取角色。</li>
                            <li class="lb-content__li">遊戲內信箱的獎勵領取有期限設定，還請玩家把握時間從信件領取獎勵。</li>
                            <li class="lb-content__li">活動期間請避免遊戲內刪除角色，以免導致選擇角色領取獎勵的異常狀況發生。</li>
                        </ol>
                    </div>
                </div>
            </template>
        </lightbox>
        <lightbox v-model:showLightbox="awardInfoLB" class-name="w960 lb-award" :action="false">
            <template #lightbox-title>
                <div class="lb-title lb-title-event-info"></div>
            </template>
            <template #lightbox-content>
                <div class="lb-content">
                    <div class="lb-content__tab lb-tab-reward-info1"></div>
                    <div class="lb-content__box">
                        <div class="lb-content__lv" data-type="epic">史詩</div>
                        <div class="lb-content__name">二十系統字二十系統字二十系統字二十系統字</div>
                        <div class="lb-content__info">六十系統字六十系統字六十系統字六十系統字六十系統字六十系統字 六十系統字六十系統字六十系統字六十系統字六十系統字六十系統字</div>
                    </div>
                </div>
            </template>
        </lightbox>
        <lightbox v-model:showLightbox="coinHistoryLB" class-name="w640 lb-coin-history" :action="false">
            <template #lightbox-title>
                <div class="lb-title lb-title-event-info"></div>
            </template>
            <template #lightbox-content>
                <div class="lb-content">
                    <div class="lb-content__tab lb-tab-coin-history1"></div>
                    <div class="lb-content__box">
                        <div class="lb-content__date">8/17</div>
                        <div class="lb-content__total">4444</div>
                        <div class="lb-content__source">十二個系統字十二個系統字</div>
                    </div>
                    <div class="lb-content__box">
                        <div class="lb-content__date">8/17</div>
                        <div class="lb-content__total">4444</div>
                        <div class="lb-content__source">十二個系統字十二個系統字</div>
                    </div>
                </div>
            </template>
        </lightbox>
    `,
};

export default sec1;
