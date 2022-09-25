// 即刻加入
function Join() {
	var config = {
		addClass: "gbox popup popup-join",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: []
	};

	var HTML = `<div class="lb-popup__content" style="--width:890px;--m-width:758;">
		<div class="popup-join__title">即刻加入</div>
		<div class="popup-join__text">選擇您登入天堂M帳號的方式</div>
		<div class="popup-join__btn-group">
			<a href="javascript:;" class="popup-join__btn" data-type="bf">bf</a>
			<a href="javascript:;" class="popup-join__btn" data-type="f">f</a>
			<a href="javascript:;" class="popup-join__btn" data-type="g">g</a>
			<a href="javascript:;" class="popup-join__btn" data-type="apple">apple</a>
		</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// Join();
// 遊戲帳號需達到60級 才可參加本活動
function NotEligible() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close2",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content" style="--width:380px;--m-width:300;">遊戲帳號需達到60級<br />才可參加本活動</div>`;
	$.gbox.open(HTML, config);
}
// NotEligible();
// 查無遊戲帳號
function NoAccount() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close2",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content" style="--width:380px;--m-width:300;">查無遊戲帳號</div>`;
	$.gbox.open(HTML, config);
}
// NoAccount();

// 確定登出嗎
function CheckLogout() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "是",
				class: "lb-btn-yes",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "否",
				class: "lb-btn-no",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content" style="--width:400px;--m-width:400;--pd:60px">確定要登出嗎</div>`;
	$.gbox.open(HTML, config);
}
// CheckLogout();

// 個人名片介紹
function CardInfo() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:400px;--m-width:400;--pd:0px">
		<div class="popup-info__card">個人名片</div>
		<div class="popup-info__text">文字文字文字文字文字文字 文字文字文字文字文字文字 文字文字文字文字文字文字 拷貝</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// CardInfo();

// 商店介紹
function StoreInfo() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:400px;--m-width:400;--pd:0px">
		<div class="popup-info__store">商店</div>
		<div class="popup-info__text">文字文字文字文字文字文字 文字文字文字文字文字文字 文字文字文字文字文字文字 拷貝</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// StoreInfo();

// 我的陣營介紹
function FactionInfo() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:400px;--m-width:400;--pd:0px">
		<div class="popup-info__faction">我的陣營</div>
		<div class="popup-info__text">文字文字文字文字文字文字 文字文字文字文字文字文字 文字文字文字文字文字文字 拷貝</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// FactionInfo();

// 獎勵歷程
function History() {
	var config = {
		addClass: "gbox popup popup-history",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {
			$.mCustomScrollbar.defaults.scrollButtons.enable = true;
			$(".popup-history__list").mCustomScrollbar({
				theme: "dark"
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close2",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content" style="--width:637px;--m-width:727;--pd:0px">
		<div class="popup-history__title">我的陣營</div>
		<div class="popup-history__list">
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
			<div class="popup-history__box">
				<div class="popup-history__img">
					<img src="./assets/css/img/popup/item.png" alt="" />
				</div>
				<div class="popup-history__info">
					<div>來自xxx</div>
					<div>成功兌換：xxxx</div>
					<div>2022/05/01 下午05:00</div>
				</div>
			</div>
		</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// History();

// 加入陣營
function FactionSelect() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:997px;-m-width:727;--pd:0px">
		<div class="faction-select__title">請選擇你想加入的陣營</div>
		<div class="faction-select__list">
			<label class="faction-select__box">
				<input class="faction-select__radio" type="radio" name="faction" value="heine" />
				<div class="faction-select__style" data-type="heine"></div>
			</label>
			<label class="faction-select__box">
				<input class="faction-select__radio" type="radio" name="faction" value="kent" />
				<div class="faction-select__style" data-type="kent"></div>
			</label>
			<label class="faction-select__box">
				<input class="faction-select__radio" type="radio" name="faction" value="aden" />
				<div class="faction-select__style" data-type="aden"></div>
			</label>
		</div>
		<a href="javascript:;" class="faction-select__create">創立</a>
		<div class="faction-select__notice">於遊戲內的經驗值累積將累計於您選取的陣營，陣營選取後將無法進行更換。</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// FactionSelect();

// 職業形象
function JobSelect() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:997px;-m-width:727;--pd:0px">
		<div class="job-select__title">請選擇你想要的職業形象</div>
		<div class="job-select__list">
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="gun" />
				<div class="job-select__style" data-type="gun"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="knight" />
				<div class="job-select__style" data-type="knight"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="king" />
				<div class="job-select__style" data-type="king"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="sword" />
				<div class="job-select__style" data-type="sword"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="wizard" />
				<div class="job-select__style" data-type="wizard"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="elven" />
				<div class="job-select__style" data-type="elven"></div>
			</label>
			<label class="job-select__box">
				<input class="job-select__radio" type="radio" name="job" value="dark" />
				<div class="job-select__style" data-type="dark"></div>
			</label>
		</div>
		<a href="javascript:;" class="job-select__create">創立</a>
		<div class="job-select__notice">於遊戲內的經驗值累積將累計於您選取的陣營，陣營選取後將無法進行更換。</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// JobSelect();

// 背包
function Bag() {
	var config = {
		addClass: "gbox popup popup-bag",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close2",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content popup-bag__content" style="--width:560px;--m-width:727;--pd:0px">
		<div class="popup-bag__title">背包</div>
		<div class="popup-bag__list">
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
			<div class="popup-bag__box">
				<img src="./assets/css/img/popup/item.png" alt="" />
			</div>
		</div>
		<div class="popup-bag__notice">
		用戶於個人名片或陣營簽到事件的獎勵箱皆會進入背包，可以於背包可選取您的獎勵，點擊【領取】後可進入獎勵發送頁面。</div>
	</div>`;
	$.gbox.open(HTML, config);
}

// Bag();

// 恭喜獲得 確認
function RewardChecked() {
	var config = {
		addClass: "gbox popup",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確認",
				class: "lb-btn-check",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `<div class="lb-popup__content" style="--width:425px;--m-width:425;--pd:0px">
		<div class="popup-reward__title">恭喜獲得</div>
		<div class="popup-reward__item">
			<img src="./assets/css/img/itg/item.png" alt="" />
		</div>
		<div class="popup-reward__name">獎品名稱</div>
	</div>`;
	$.gbox.open(HTML, config);
}
RewardChecked();
// 獎勵發送 完成
function RewardComplete() {
	var config = {
		addClass: "gbox popup popup-complete ",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `<div class="lb-popup__content" style="--width:880px;--m-width:758;--pd:0px">
		<div class="popup-complete__title">獎勵發送</div>
		<div class="popup-complete__notice">
			<div class="popup-complete__notice-box">
				<p><span>注意！</span>伺服器/角色名稱僅為帳號驗證使用，非實際道具領取角色。</p>
				<ul class="popup-complete__notice-list1">
					<li>請玩家在進行獎勵發送之前，將遊戲中角色登出後再進行發送。</li>
					<li>於突發事件（機會）及成長計畫中所獲得之物品，無法派送予重生服角色。</li>
				</ul>
			</div>
			<div class="popup-complete__notice-box">
				<p>此組獎勵發送後，置入帳號的優先順序如下</p>
				<ol class="popup-complete__notice-list2">
					<li>進行獎勵發送時，登入在遊戲中的角色。</li>
					<li>完成獎勵發送後第一個登入遊戲的角色。</li>
				</ol>
				<p>發送後可於獎勵歷程頁面確認紀錄。</p>
			</div>
		</div>
	</div>`;
	$.gbox.open(HTML, config);
}
// RewardComplete();
