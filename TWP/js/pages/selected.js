const selected = {
	setup() {
		return {};
	},
	template: `
		<div class="selected-content">
			<div class="selected-title">選擇領域</div>
			<div class="selected-realm-box">
				<div class="selected-realm__status">
					<div class="selected-realm__status-item" data-type="recommend">推薦</div>
					<div class="selected-realm__status-item" data-type="new">最新</div>
					<div class="selected-realm__status-item" data-type="smooth">順暢</div>
					<div class="selected-realm__status-item" data-type="crowded">擁擠</div>
					<div class="selected-realm__status-item" data-type="saturated">飽和</div>
					<div class="selected-realm__status-item" data-type="close">關閉</div>
				</div>
				<div class="selected-realm__row-group">
					<div class="selected-realm__row -open">
						<div class="selected-realm__title"></div>
						<a href="javascript:;" class="selected-realm__toggle"></a>
						<div class="selected-realm__box">
							<div class="selected-realm__inner">
								<div class="selected-realm__inner-box">
									<a href="javascript:;" class="selected-realm__item" data-type="smooth">扭曲的黃金港01 <span class="icon--recommend"></span><span class="icon--new"></span></a>
									<a href="javascript:;" class="selected-realm__item" data-type="crowded">扭曲的黃金港01</a>
									<a href="javascript:;" class="selected-realm__item" data-type="saturated">扭曲的黃金港01</a>
									<a href="javascript:;" class="selected-realm__item" data-type="close">扭曲的黃金港01</a>
									<a href="javascript:;" class="selected-realm__item" data-type="close">扭曲的黃金港01</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selected-chosen">
				<div class="selected-chosen__title">
					<span class="selected-chosen__title-hexagon"></span>
					扭曲的黃金港01
				</div>
				<div class="selected-chosen__input">
					<input type="text" placeholder="請輸入1~10個字的角色名稱" />
				</div>
				<span class="selected-chosen__error">字數超過上限，中英數字最多不可超過10個字，請重新輸入。</span>
				<a class="selected-chosen__btn-submit">檢查名稱</a>
				<span class="selected-chosen__notice"><span>※ 請注意！</span>創立角色名稱後，選定的領域將無法變更</span>
			</div>
			<a href="javascript:;" class="selected-btn__notice btn-common">注意事項</a>
		</div>
	`
};

export default selected;
