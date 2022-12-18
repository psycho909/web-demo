import lightbox from "./GLightbox.js";
let sec2 = {
	setup() {
		let messageText = Vue.ref("");
		let messageLightbox = Vue.ref(false);
		const onRemove = () => {
			messageLightbox.value = false;
		};
		return {
			messageLightbox,
			messageText,
			messageLightbox,
			onRemove
		};
	},
	components: {
		lightbox
	},
	template: `
    <lightbox v-model:showLightbox="messageLightbox">
        <template #lightbox-content>
            <div class="text-center">確認刪除此元件嗎?</div>
        </template>
        <template #lightbox-btn>
            <a href="javascript:;" class="btn btn__submit" @click="onRemove">確認</a>
        </template>
    </lightbox>
    <div class="sec sec2-wrap">
        <div class="container">
            <div class="sec2-coin">
                <div class="sec2-coin__title">代幣取得</div>
                <div class="sec2-coin__info">
                    <span class="sec2-coin__info-title">累積消費額</span>
                    <span class="sec2-coin__info-num">999</span>
                </div>
                <div class="sec2-coin__steps">
                    <span class="sec2-coin__step"></span>
                    <span class="sec2-coin__step"></span>
                    <span class="sec2-coin__step"></span>
                    <span class="sec2-coin__step"></span>
                    <span class="sec2-coin__step"></span>
                    <span class="sec2-coin__step"></span>
                </div>
            </div>
            <div class="sec2-game">
                <div class="sec2-game__title">龍谷搖獎機</div>
                <div class="sec2-game__info-group">
                    <div class="sec2-game__info" data-info="current">
                        <span class="sec2-game__info-title">目前持有代幣</span>
                        <span class="sec2-game__info-num">7,000枚</span>
                    </div>
                    <div class="sec2-game__info" data-info="total">
                        <span class="sec2-game__info-title">累積消耗代幣</span>
                        <span class="sec2-game__info-num">7,000枚</span>
                    </div>
                </div>
                <div class="sec2-game__main">
                    <div class="sec2-game__machine"></div>
                    <label class="sec2-game__checkbox-label">
                        <input type="checkbox" class="sec2-game__checkbox-control" />
                        <span class="sec2-game__checkbox-style">一次轉十個</span>
                    </label>
                    <div class="sec2-game__message">這裡是字數不限的兩行字唷唷唷 這裡是字數不限的兩行字唷唷唷</div>
                </div>
                <div class="sec2-game__award-content">
                    <div class="sec2-game__award-title">本次得獎內容</div>
                    <div class="sec2-game__award-list">
                        <div class="sec2-game__award-li">
                            <span class="sec2-game__award-type" data-type="epic">史詩</span>
                            <span class="sec2-game__award-text">職業專用最高級女神紋章箱子一個</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sec2-box">
                <div class="sec2-box__title">小筠的珍藏寶箱</div>
                <div class="sec2-box__list">
                    <div class="sec2-box__col">
                        <div class="sec2-box__item" data-type="legend">傳奇</div>
                        <div class="sec2-box__info">
                            <span class="sec2-box__title">可開啟次數</span>
                            <span class="sec2-box__num">999</span>
                        </div>
                        <a href="javascript:;" class="sec2-box__btn" @click="() => messageLightbox = true">開啟一次</a>
                        <a href="javascript:;" class="sec2-box__btn">開啟十次</a>
                    </div>
                    <div class="sec2-box__col">
                        <div class="sec2-box__item" data-type="elder">上古</div>
                        <div class="sec2-box__info">
                            <span class="sec2-box__title">可開啟次數</span>
                            <span class="sec2-box__num">999</span>
                        </div>
                        <a href="javascript:;" class="sec2-box__btn">開啟一次</a>
                        <a href="javascript:;" class="sec2-box__btn">開啟十次</a>
                    </div>
                    <div class="sec2-box__col">
                        <div class="sec2-box__item" data-type="myth">神話</div>
                        <div class="sec2-box__info">
                            <span class="sec2-box__title">可開啟次數</span>
                            <span class="sec2-box__num">999</span>
                        </div>
                        <a href="javascript:;" class="sec2-box__btn" data-btn="1">開啟一次</a>
                        <a href="javascript:;" class="sec2-box__btn" data-btn="10">開啟十次</a>
                    </div>
                </div>
                <div class="sec2-box__message"></div>
            </div>
        </div>
    </div>
    `
};

export default sec2;
