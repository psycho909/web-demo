import rankGuild from "./rank-guild.js";
import rankLV from "./rank-lv.js";

const rank = {
	components: {
		rankGuild,
		rankLV
	},
	template: `
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
    
    `
};

export default rank;
