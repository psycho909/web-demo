const rankGuild = {
	template: `
    <div class="rank-content">
        <div class="rank-tag">
            <div class="rank-tag__item"><i class="i--class-all"></i>全部</div>
            <div class="rank-tag__item"><i class="i--class-MirageBlade"></i>幻影劍士</div>
            <div class="rank-tag__item"><i class="i--class-IncenseArcher"></i>香射手</div>
            <div class="rank-tag__item"><i class="i--class-RuneScribe"></i>咒文刻印師</div>
            <div class="rank-tag__item"><i class="i--class-Enforcer"></i>執行官</div>
        </div>
        <div class="rank-notice">※等級排名每10分鐘更新一次</div>
        <div class="rank-table">
            <div class="rank-table__item">
                <div class="rank-table__col">排行</div>
                <div class="rank-table__col">角色名稱</div>
                <div class="rank-table__col">角色等級</div>
                <div class="rank-table__col">討伐等級</div>
                <div class="rank-table__col">旅團名稱</div>
            </div>
            <div class="rank-table__item">
                <div class="rank-table__col-group">
                    <div class="rank-table__col"><div class="rank-table__ranking-number rank-table__ranking-number--1"></div>
                </div>
                <div class="rank-table__col-group">
                    <div class="rank-table__col">
                        <span class="icon-class">
                            <i class="i--class-MirageBlade"></i>
                        </span>
                        台灣南坡萬
                    </div>
                    <div class="rank-table__col">Lv.76</div>
                    <div class="rank-table__col">15</div>
                    <div class="rank-table__col">台灣菁英團</div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default rankGuild;
