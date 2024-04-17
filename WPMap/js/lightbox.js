export function CurrentSeason() {
	var config = {
		addClass: "lb-time-crevice",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			document.querySelectorAll(".lb-time-crevice-tab__item").forEach(function (item, index) {
				item.addEventListener("click", function () {
					document.querySelector(".lb-time-crevice-tab__item.active").classList.remove("active");
					item.classList.add("active");
					if (index === 0) {
						document.querySelector(".lb-time-crevice-info").innerHTML = "請查看當前賽季匹配組資訊";
					} else {
						document.querySelector(".lb-time-crevice-info").innerHTML = "請查看下個賽季匹配組資訊";
					}
				});
			});
		},
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="lb-time-crevice-content">
            <div class="lb-time-crevice-title">查看組別表</div>
            <div class="lb-time-crevice-tab">
                <a href="javascript::" class="lb-time-crevice-tab__item active">當前賽季</a>
                <a href="javascript::" class="lb-time-crevice-tab__item">下個賽季</a>
            </div>
            <div class="lb-time-crevice-info">請查看當前賽季匹配組資訊</div>
            <div class="lb-time-crevice-half">
                <div class="lb-time-crevice-half__title">上半場</div>
                <div class="lb-time-crevice-half__list">
                    <div class="lb-time-crevice-half__item">
                        <div class="lb-time-crevice-half__item-head">組別1 - 菁英組</div>
                        <div class="lb-time-crevice-half__item-body">
                            <span>扭曲的黃金港01   首領領地04</span>
                            <span>扭曲的黃金港01   首領領地04</span>
                        </div>
                    </div>
                    <div class="lb-time-crevice-half__item">
                        <div class="lb-time-crevice-half__item-head">組別1 - 菁英組</div>
                        <div class="lb-time-crevice-half__item-body">
                            <span>扭曲的黃金港01   首領領地04</span>
                            <span>扭曲的黃金港01   首領領地04</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lb-time-crevice-half">
                <div class="lb-time-crevice-half__title">下半場</div>
                <div class="lb-time-crevice-half__list">
                    <div class="lb-time-crevice-half__item">
                        <div class="lb-time-crevice-half__item-head">組別1 - 菁英組</div>
                        <div class="lb-time-crevice-half__item-body">
                            <span>扭曲的黃金港01   首領領地04</span>
                            <span>扭曲的黃金港01   首領領地04</span>
                        </div>
                    </div>
                    <div class="lb-time-crevice-half__item">
                        <div class="lb-time-crevice-half__item-head">組別1 - 菁英組</div>
                        <div class="lb-time-crevice-half__item-body">
                            <span>扭曲的黃金港01   首領領地04</span>
                            <span>扭曲的黃金港01   首領領地04</span>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	`;
	$.gbox.open(HTML, config);
}
