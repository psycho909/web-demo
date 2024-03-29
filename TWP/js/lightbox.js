import pinia from "./pinia.js";
import useEventStore from "./store.js";

export function MessageLB(msg, url, callback) {
	// const store = useEventStore(pinia);
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				target: false,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				}
			},
			{
				text: "取消",
				class: "btn-cancel",
				click: function () {
					$.gbox.close();
				}
			}
		]
	});
}

// index 警告
export function Warning() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "是，已滿十八歲",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "否，離開",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="warning-icon"></div>
		<div class="warning-content">
			<p>你即將進入遊戲之內容</p>
			<p>需買十八歲方可瀏覽</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// index 注意事項
export function Notice() {
	var config = {
		addClass: "default w840 notice",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".notice-content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				}
				// advanced: { extraDraggableSelectors: ".notice-content" }
			});
		},
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="notice-title">注意事項</div>
		<div class="notice-content">
			<ol class="notice-list">
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">預創角色名稱後，需於開服後30天內完成創立角色，逾期角色名稱將被刪除</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
				<li class="notice-list__item">單一帳號最多可創立一個角色名稱以及搶奪兩個角色名稱</li>
			</ol>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇領域
// 選擇領域 - 未搶佔
export function SelectNot() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱尚未被搶佔</p>
			<p>是否搶先獲得此角色名稱?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 已佔領
export function SelectPlundered() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱已被搶佔</p>
			<p>發起搶奪即有機會可搶奪該名稱</p>
			<p>是否進行搶奪?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 搶奪成功
export function SelectPlunderSuccess() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "設定為預創角色",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<p>已成功搶奪角色名稱</p>
			<div class="select-realm-name select-realm-name--my">角色名稱最多十個文字</div>
			<p class="red">*72小時後該名稱將可被他人搶奪</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 搶奪失敗
export function SelectPlunderFailed() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-text">搶奪失敗</div>
			<p>名稱已受到保護，</p>
			<p>請於保護消失後再次嘗試搶奪</p>
			<div class="plunder-protect-time-box">
				<span class="plunder-protect-time__icon"></span>
				<div class="plunder-protect-time__num-box">
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="hour" data-num="0"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="hour" data-num="3"></i>
					<i class="plunder-protect-time__num icon--num-style1 i--colon"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="min" data-num="1"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="min" data-num="6"></i>
					<i class="plunder-protect-time__num icon--num-style1 i--colon"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="sec" data-num="5"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="sec" data-num="9"></i>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇領域 - 未創立
export function SelectCreate() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱尚未被使用</p>
			<p>是否使用該名稱創立角色?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 創立成功
export function SelectCreated() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "延長保護",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "發起搶奪",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<p class="select-realm-p select-realm-p--18">已成功創立角色名稱</p>
			<div class="select-realm-box">
				<div class="select-realm__group select-realm__world">
					<span class="select-realm__world-icon"></span>
					<span class="select-realm__world-name">扭曲的黃金港</span>
				</div>
				<div class="select-realm__group select-realm__realm">
					<span class="select-realm__realm-icon"></span>
					<span class="select-realm__realm-name">扭曲的黃金港1</span>
				</div>
			</div>
			<div class="select-realm-name">台灣南波萬</div>
			<p>該名稱已設定為預定角色，30分鐘後</p>
			<p>將可被他人搶奪，是否延長保護時間或</p>
			<p>對其他名稱發起搶奪?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 預創角色
// 預創角色 - 保護
export function PreProtect() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="preprotect-content">
			<p>是否將此名稱套用24小時保護狀態?</p>
			<div class="preprotect-name">角色名稱最多十個文字</div>
			<p>若選擇的名稱仍有剩餘保護時間，</p>
			<p class="red">再次套用時僅會獲得24小時保護時間，</p>
			<p>剩餘保護時間不會進行累加。</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 預創角色 - 技能冷卻中
export function PreCD() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="preprotect-content">
			<div class="preprotect-text">技能冷卻中</div>
			<p>請等冷卻時間結束後，重新嘗試</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色
// 搶奪角色 - 搶奪成功
export function PlunderSuccess() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="plunder-content">
			<p>已成功搶奪角色名稱</p>
			<div class="plunder-name">角色名稱最多十個文字</div>
			<p class="red">請等冷卻時間結束後，重新嘗試</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色 - 已被搶奪
export function Plundered() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="plunder-content">
			<p>角色名稱已被搶奪</p>
			<div class="plunder-name">角色名稱最多十個文字</div>
			<p class="red">系統已自動給與『無名之輩01』角色名稱</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色 - 搶奪失敗
export function PlunderFailed() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="plunder-content">
			<div class="plunder-name plunder-name--mb">搶奪失敗</div>
			<p>名稱已受到保護，</p>
			<p>請於保護消失後再次嘗試搶奪</p>
			<div class="plunder-protect-time-box">
				<span class="plunder-protect-time__icon"></span>
				<div class="plunder-protect-time__num-box">
					<i class="plunder-protect-time__num" data-type="hour" data-num="0"></i>
					<i class="plunder-protect-time__num" data-type="hour" data-num="3"></i>
					<i class="plunder-protect-time__num i--colon"></i>
					<i class="plunder-protect-time__num" data-type="min" data-num="1"></i>
					<i class="plunder-protect-time__num" data-type="min" data-num="6"></i>
					<i class="plunder-protect-time__num i--colon"></i>
					<i class="plunder-protect-time__num" data-type="sec" data-num="5"></i>
					<i class="plunder-protect-time__num" data-type="sec" data-num="9"></i>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}
