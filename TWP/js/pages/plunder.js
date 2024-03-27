const plunder = {
	setup() {
		return {};
	},
	template: `
		<div class="plunder-content">
			<div class="plunder-title">掠奪角色名稱</div>
			<div class="plunder-chosen">
				<div class="plunder-chosen__input">
					<input type="text" placeholder="請輸入角色名稱" />
				</div>
				<span class="plunder-chosen__error">查無該角色名稱，請重新輸入。</span>
				<a class="plunder-chosen__btn-submit">檢查名稱</a>
			</div>
			<div class="plunder-names">
				<div class="plunder-names__title">推薦名稱</div>
				<div class="plunder-names__list">
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
					<div class="plunder-names__item">角色名稱最多十個文字</div>
				</div>
				<a href="javascript:;" class="plunder-names__btn-refresh">
					<span class="icon-refresh"></span>重新整理
				</a>
				<span class="plunder-names__error">重新整理速度過快，請稍後再次嘗試</span>
			</div>
			<a href="javascript:;" class="plunder-btn__notice btn-common">注意事項</a>
		</div>
	`
};

export default plunder;
