const rankGuild = {
	template: `
    <div class="rank-content">
        <div class="rank-notice">※等級排名每10分鐘更新一次</div>
        <div class="rank-table rank-table--level">
            <div class="rank-table__item rank-table__header rank-table__item rank-table__header--level">
                <div class="rank-table__col">排行</div>
                <div class="rank-table__col">會長名稱</div>
                <div class="rank-table__col">旅團名稱</div>
                <div class="rank-table__col">旅團等級</div>
                <div class="rank-table__col">旅團成員</div>
                <div class="rank-table__col">佔領據點</div>
            </div>
            <div class="rank-table__item" data-rank="1">
                <div class="rank-table__col-ranking">
                    <div class="rank-table__col"><div class="rank-table__ranking-number rank-table__ranking-number--1">1</div></div>
                </div>
                <div class="rank-table__col-inner rank-table__col-inner--level">
                    <div class="rank-table__col">
                        <span class="rank-table__col--value rank-table__col--value-lv">Lv.76</span>
                        <span class="rank-table__col--value">台灣南坡萬</span>
                    </div>
                    <div class="rank-table__col">
                        <span class="rank-table__col--key">旅團名稱</span>
                        <span class="rank-table__col--value">台灣菁英團</span>
                    </div>
                    <div class="rank-table__col rank-table__col--lv">Lv.76</div>
                    <div class="rank-table__col">
                        <span class="rank-table__col--key">旅團成員</span>
                        <span class="rank-table__col--value">99/99</span>
                    </div>
                    <div class="rank-table__col rank-table__col--land-badge">
                        <span class="rank-table__col--key">佔領據點</span>
                        <div class="rank-table__col--value">
                            <div class="land-badge land--fortress">
                                <span>沙刃駐紮地</span>
                            </div>
                            <div class="land-badge land--castle">
                                <span>精靈2</span>
                            </div>
                            <div class="land-badge land--garrison">
                                <span>精靈3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default rankGuild;
