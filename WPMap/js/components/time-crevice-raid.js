const timeCreviceRaid = {
	template: `
	<div class="raid-nav">
		<div class="raid-nav__progress">
			<div class="raid-nav__progress-inner">
				<span>進度條</span>
				第4季 2024.02.07 (週三) ~ 2024.03.06 (週三) 維護前
			</div>
			<a href="javascript:;" class="raid-nav__progress-check hexatag">查看</a>
		</div>
		<div class="raid-nav__search">
			<div class="raid-nav__search-bar">
				<div class="raid-nav__search-input">
					<input type="text" />
				</div>
				<a href="javascript:;" class="raid-nav__search-submit"></a>
			</div>
		</div>
		<div class="raid-nav__selector">
			<div class="raid-nav__selector-item raid-nav__selector-season">
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
			<div class="raid-nav__selector-item raid-nav__selector-group">
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
			<div class="raid-nav__selector-item raid-nav__selector-boss">
				<div class="button--selector button--selector-world" @click="selectToggle('world',$event)">
					<span class="_name">BOSS</span>
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
	<div class="raid-content">
		<div class="raid-notice">※Boss擊殺紀錄以「討伐貢獻」顯示，而非獎勵獲得</div>
		<div class="raid-table">
			<div class="raid-table__head">
				<div class="raid-table__item">
					<div class="raid-table__col-group">
						<div class="raid-table__col">賽季</div>
						<div class="raid-table__col">組別</div>
						<div class="raid-table__col">BOSS</div>
					</div>
					<div class="raid-table__col-group">
						<div class="raid-table__col">旅團名稱</div>
						<div class="raid-table__col">會長名稱</div>
						<div class="raid-table__col">領域名稱</div>
						<div class="raid-table__col">討伐名稱</div>
						<div class="raid-table__col"></div>
					</div>
				</div>
			</div>
			<div class="raid-table__body">
				<div class="raid-table__item">
					<div class="raid-table__card">
						<div class="raid-table__col-header">
							<div class="raid-table__col">
								<span class="raid-table__col--value">第1季</span>
							</div>
							<div class="raid-table__col">
								<span class="raid-table__col--value">第5組</span>
							</div>
							<div class="raid-table__col">
								<span class="raid-table__col--key">BOSS名稱</span>
							</div>
						</div>
						<div class="raid-table__col-wrap">
							<div class="raid-table__col-content">
								<div class="raid-table__col">
									<span class="raid-table__col--key">旅團名稱</span>
									<span class="raid-table__col--value">台灣菁英團</span>
								</div>
								<div class="raid-table__col">
									<span class="raid-table__col--key">會長名稱</span>
									<span class="raid-table__col--value">台灣菁英團</span>
								</div>
								<div class="raid-table__col">
									<span class="raid-table__col--key">領域名稱</span>
									<span class="raid-table__col--value">台灣菁英團</span>
								</div>
								<div class="raid-table__col">
									<span class="raid-table__col--key">討伐名稱</span>
									<span class="raid-table__col--value">台灣菁英團</span>
									<a href="javascript:;" class="raid-table__btn-toggle raid-table__col--mb">
										<i class="i--plus"></i>
									</a>
								</div>
							</div>
							<div class="raid-table__col-button">
								<div class="raid-table__col">
									<a href="javascript:;" class="raid-table__btn-toggle raid-table__col--pc">
										<i class="i--plus"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="raid-table__accordion">
						<div class="raid-table__accordion-body">
							<div class="raid-table__accordion-inner">
								<div class="raid-table__accordion-inner-box">
									<div class="raid-table__accordion-title">MVP</div>
									<div class="raid-table__accordion-table">
										<div class="raid-table__accordion-table__block">
											<div class="raid-table__accordion-table__head"><span>排行</span><span>承受傷害</span></div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="1">1</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="2">2</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="3">3</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
										</div>
										<div class="raid-table__accordion-table__block">
											<div class="raid-table__accordion-table__head"><span>承受傷害</span></div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="1">1</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="2">2</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="3">3</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
										</div>
										<div class="raid-table__accordion-table__block">
											<div class="raid-table__accordion-table__head"><span>承受傷害</span></div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="1">1</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="2">2</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
											<div class="raid-table__accordion-table__body">
												<span class="raid-table__accordion-table__rank-number" data-type="3">3</span>
												<span class="raid-table__accordion-table__character-class"><i class="i--class-enforcer"></i></span>
												<span class="raid-table__accordion-table__character-name">台灣南坡萬</span>
												<span class="raid-table__accordion-table__character-level">LV.67</span>
												<span class="dot-line"></span>
												<span class="raid-table__accordion-table__percent">16</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
};

export default timeCreviceRaid;
