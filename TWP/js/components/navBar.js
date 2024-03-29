const navBar = {
	setup() {
		let menuStatus = Vue.ref(false);

		return { menuStatus };
	},
	template: `
		<div class="nav-bar">
			<div class="nav-bar__wrap">
				<div class="nav-bar__head">
					<a href="我是官網" class="nav-bar__logo" target="_blank"></a>
					<a href="javascript:;" class="nav-bar__toggle" :class="[menuStatus?'-close':'-open']">
						<span></span>
						<span></span>
						<span></span>
					</a>
				</div>
				<div class="nav-bar__content" :class="[menuStatus?'-open':'']">
					<ul class="nav-bar__menu-list">
						<li class="nav-bar__menu-item current" data-page="">奪名之戰</li>
						<li class="nav-bar__menu-item" data-page="">事前預約</li>
						<li class="nav-bar__menu-item" data-page="">預創旅團</li>
					</ul>
					<div class="nav-bar__social-list">
						<a href="https://www.youtube.com/@user-warsofprasia" class="nav-bar__social-item" target="_blank" data-type="yt"></a>
						<a href="https://www.facebook.com/warsofprasia.tw" class="nav-bar__social-item" target="_blank" data-type="f"></a>
					</div>
				</div>
			</div>
		</div>
	`
};

export default navBar;
