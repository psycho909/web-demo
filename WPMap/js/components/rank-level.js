const rankLevel = {
	template: `
    <div class="rank-content">
        <div class="rank-tag">
            <div class="rank-tag__list">
                <div class="rank-tag__item hexatag -stroke active"><i class="i--class-all"></i>全部</div>
                <div class="rank-tag__item hexatag"><i class="i--class-MirageBlade"></i>幻影劍士</div>
                <div class="rank-tag__item hexatag"><i class="i--class-IncenseArcher"></i>香射手</div>
                <div class="rank-tag__item hexatag"><i class="i--class-RuneScribe"></i>咒文刻印師</div>
                <div class="rank-tag__item hexatag"><i class="i--class-Enforcer"></i>執行官</div>
            </div>
            <div class="rank-tag__selector">
                <div class="button--selector button--selector-class" @click="selectToggle('class',$event)">
                    <span class="_name"><i class="i--class-all"></i>全部{{worldSelectComputed?.name}}</span>
                    <div class="selector type--fly">
                        <select v-model="classSelect">
                            <option v-for="c in classlist" :value="world.W">{{world.name}}</option>
                        </select>
                        <div class="selector__box type--fly" :class="[classSelectToggle?'-open':'']">
                            <span class="selector__dimmed"></span>
                            <div class="selector__transform" v-if="classSelectToggle">
                                <span class="selector__close"><span></span></span>
                                <div class="selector__content" style="max-height: 500px">
                                    <ul>
                                        <li v-for="c in classlist" :class="[classSelect === world.W?'-selected':'']" @click="selected('world',world.W)"><span>{{world.name}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rank-notice">※等級排名每10分鐘更新一次</div>
        <div class="rank-table rank-table">
            <div class="rank-table__item rank-table__header">
                <div class="rank-table__col">排行</div>
                <div class="rank-table__col">角色名稱</div>
                <div class="rank-table__col">角色等級</div>
                <div class="rank-table__col">討伐等級</div>
                <div class="rank-table__col">旅團名稱</div>
            </div>
            <div class="rank-table__item" data-rank="1">
                <div class="rank-table__col-ranking">
                    <div class="rank-table__col"><div class="rank-table__ranking-number rank-table__ranking-number--1">1</div></div>
                </div>
                <div class="rank-table__col-inner">
                    <div class="rank-table__col">
                        <span class="icon-class">
                            <i class="i--class-MirageBlade"></i>
                        </span>
                        <span class="rank-table__col--value">台灣南坡萬</span>
                        <span class="rank-table__col--value rank-table__col--value-lv">Lv.76</span>
                    </div>
                    <div class="rank-table__col rank-table__col--lv">Lv.76</div>
                    <div class="rank-table__col">
                        <span class="rank-table__col--key">討伐等級</span>
                        <span class="rank-table__col--value">15</span>
                    </div>
                    <div class="rank-table__col">
                        <span class="rank-table__col--key">旅團名稱</span>
                        <span class="rank-table__col--value">台灣菁英團</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export default rankLevel;
