const rankLV = {
	template: `
    <div class="rank-content">
        <div class="rank-notice">※等級排名每10分鐘更新一次</div>
        <div class="rank-table">
            <div class="rank-table__item">
                <div class="rank-table__col">排行</div>
                <div class="rank-table__col">會長名稱</div>
                <div class="rank-table__col">旅團名稱</div>
                <div class="rank-table__col">旅團等級</div>
                <div class="rank-table__col">旅團成員</div>
                <div class="rank-table__col">佔領據點</div>
            </div>
            <div class="rank-table__item">
                <div class="rank-table__col">
                    <div class="rank-table__ranking-number rank-table__ranking-number--1">
                </div>
                <div class="rank-table__col rank-table__col--inner">
                    <div class="rank-table__col">
                        <span class="icon-class">
                            <i class="i--class-MirageBlade"></i>
                        </span>
                        台灣南坡萬
                    </div>
                    <div class="rank-table__col">Lv.76</div>
                    <div class="rank-table__col">99/99</div>
                    <div class="rank-table__col">
                        <span class="land-badge type--fortress"></span>
                        <span class="land-badge type--castle"></span>
                        <span class="land-badge type--garrison"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default rankLV;
