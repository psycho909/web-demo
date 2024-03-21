const records = {
	template: `
        <div class="records-wrap">
            <div class="records-nav">
                <div class="records-nav__item">戰榜RANK</div>
                <div class="records-nav__item">賽季戰況</div>
                <div class="records-nav__item current">據點現況</div>
            </div>
            <div class="rank-nav">
                <div class="rank-nav__item"><i class="i--rank-lv"></i>等級排行</div>
                <div class="rank-nav__item"><i class="i--rank-guild"></i>旅團排行</div>
            </div>
            <div class="rank-selector">
                <div class="rank-selector__item rank-selector__world">
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
                <div class="rank-selector__item rank-selector__realm">
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
            </div>
            <div class="rank-tag">
                <div class="rank-tag__item"><i class="i--class-all"></i>全部</div>
                <div class="rank-tag__item"><i class="i--class-MirageBlade"></i>幻影劍士</div>
                <div class="rank-tag__item"><i class="i--class-IncenseArcher"></i>香射手</div>
                <div class="rank-tag__item"><i class="i--class-RuneScribe"></i>咒文刻印師</div>
                <div class="rank-tag__item"><i class="i--class-Enforcer"></i>執行官</div>
            </div>
            <div class="rank-notice">※等級排名每10分鐘更新一次</div>
            <div class="rank-list">
                <div class="rank-list__item">
                    <div class="rank-list__col">排行</div>
                    <div class="rank-list__col">角色名稱</div>
                    <div class="rank-list__col">角色等級</div>
                    <div class="rank-list__col">討伐等級</div>
                    <div class="rank-list__col">旅團名稱</div>
                </div>
                <div class="rank-list__item">
                    <div class="rank-list__col">
                        <div class="rank-list__ranking-number rank-list__ranking-number--1">
                    </div>
                    <div class="rank-list__col rank-list__col--inner">
                        <div class="rank-list__col">
                            <span class="icon-class">
                                <i class="i--class-MirageBlade"></i>
                            </span>
                            台灣南坡萬
                        </div>
                        <div class="rank-list__col">Lv.76</div>
                        <div class="rank-list__col">15</div>
                        <div class="rank-list__col">台灣菁英團</div>
                    </div>
                </div>
            </div>
        </div>
    `
};

export default records;
