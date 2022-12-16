let sec1 = {
	setup() {
		return {};
	},
	template: `
        <div class="sec sec1-wrap">
            <div class="container">
                <a href="javascript:;" class="logo"></a>
                <div class="sec1-top">
                    <div class="sec1-top__account"><span>bea</span></div>
                    <a href="javascript:;" class="sec1-top__logout">登出</a>
                </div>
                <div class="sec1-slogan1"></div>
                <div class="sec1-slogan2"></div>

                <div class="sec1-time">
                    <span>活動時間</span>
                    <span>2023/01/31(二)14:00~2023/02/15(三)10:00</span>
                </div>
                <div class="sec1-btns">
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="event-info">活動介紹</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="award-info">獎勵介紹</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="coin-history">代幣紀錄</a>
                    <a href="javascript:;" class="sec1-btns__btn" data-btn="get-award">領獎專區</a>
                </div>
            </div>
        </div>
    `,
};

export default sec1;
