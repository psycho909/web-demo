import {CurrentSeason} from "../lightbox.js"

CurrentSeason()

const timeCreviceKill = {
	template: `
		<div class="kill-nav">
			<div class="kill-nav__progress">
				<div class="kill-nav__progress-inner">
					<span>進度條</span>
					<span>第4季 2024.02.07 (週三) ~ 2024.03.06 (週三) 維護前</span>
				</div>
				<a href="javascript:;" class="kill-nav__progress-check hexatag">查看</a>
			</div>
			<div class="kill-nav__search">
				<div class="kill-nav__search-bar">
					<div class="kill-nav__search-input">
						<input type="text" placeholder="請輸入旅團名稱" />
					</div>
					<a href="javascript:;" class="kill-nav__search-submit">
						<i class="i--search"></i>
					</a>
				</div>
			</div>
			<div class="kill-nav__selector">
				<div class="kill-nav__selector-item kill-nav__selector-season">
					<div class="button--selector button--selector-world" @click="selectToggle('world',$event)">
						<span class="_name">賽季</span>
						<div class="mask-text _value"><div>{{worldSelectComputed?.name}}</div></div>
						<div class="selector type--fly">
							<select v-model="worldSelect">
								<option v-for="world in worlds" :value="world.W">{{world.name}}</option>
							</select>
							<div class="selector__box type--fly" :class="[worldSelectToggle?'-open':'']">
								<span class="selector__dimmed"></span>
								<div class="selector__transform" v-if="worldSelectToggle">
									<span class="selector__close"><span></span></span>
									<div class="selector__content" style="max-height: 500px">
										<ul>
											<li v-for="world in worlds" :class="[worldSelect === world.W?'-selected':'']" @click="selected('world',world.W)"><span>{{world.name}}</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="kill-nav__selector-item kill-nav__selector-group">
					<div class="button--selector button--selector-world" @click="selectToggle('world',$event)">
						<span class="_name">組別</span>
						<div class="mask-text _value"><div>{{worldSelectComputed?.name}}</div></div>
						<div class="selector type--fly">
							<select v-model="worldSelect">
								<option v-for="world in worlds" :value="world.W">{{world.name}}</option>
							</select>
							<div class="selector__box type--fly" :class="[worldSelectToggle?'-open':'']">
								<span class="selector__dimmed"></span>
								<div class="selector__transform" v-if="worldSelectToggle">
									<span class="selector__close"><span></span></span>
									<div class="selector__content" style="max-height: 500px">
										<ul>
											<li v-for="world in worlds" :class="[worldSelect === world.W?'-selected':'']" @click="selected('world',world.W)"><span>{{world.name}}</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="kill-content">
			<div class="kill-notice">※Boss擊殺紀錄以「討伐貢獻」顯示，而非獎勵獲得</div>
			<div class="kill-table">
				<div class="kill-table__head">
					<div class="kill-table__item">
						<div class="kill-table__col-header">
							<div class="kill-table__col">賽季</div>
							<div class="kill-table__col">組別</div>
						</div>
						<div class="kill-table__col-wrap">
							<div class="kill-table__col-rank"><div class="kill-table__col">排名</div></div>
							<div class="kill-table__col-content">
								<div class="kill-table__col">BOSS擊殺</div>
								<div class="kill-table__col">旅團等級</div>
								<div class="kill-table__col">旅團名稱</div>
								<div class="kill-table__col">會長名稱</div>
								<div class="kill-table__col">領域名稱</div>
							</div>
						</div>
					</div>
				</div>
				<div class="kill-table__body">
					<div class="kill-table__item">
						<div class="kill-table__col-header">
							<div class="kill-table__col">
								<span class="kill-table__col--value">第1季</span>
							</div>
							<div class="kill-table__col">
								<span class="kill-table__col--value">第5組</span>
							</div>
						</div>
						<div class="kill-table__col-wrap">
							<div class="kill-table__col-rank">
								<div class="kill-table__col">
									<span class="kill-table__col--value"><span class="kill-table__rank-number" data-rank="1"><span>1</span></span></span>
								</div>
							</div>
							<div class="kill-table__col-content">
								<div class="kill-table__col kill-table__col-season kill-table__col--mb">
									<span class="kill-table__col--value">第1季</span>
									<span class="kill-table__col--value">第5組</span>
								</div>
								<div class="kill-table__col">
									<span class="kill-table__col--key">BOSS名稱</span>
									<span class="kill-table__col--value">8</span>
								</div>
								<div class="kill-table__col kill-table__col--pc">
									<span class="kill-table__col--value">Lv.15</span>
								</div>
								<div class="kill-table__col">
									<span class="kill-table__col--key">旅團名稱</span>
									<span class="kill-table__col--lv kill-table__col--mb">Lv.15</span>
									<span class="kill-table__col--value">台灣菁英團</span>
								</div>
								<div class="kill-table__col">
									<span class="kill-table__col--key">會長名稱</span>
									<span class="kill-table__col--value">台灣南坡萬</span>
								</div>
								<div class="kill-table__col">
									<span class="kill-table__col--key">領域名稱</span>
									<span class="kill-table__col--value">扭曲的黃金港02</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
};

export default timeCreviceKill;
