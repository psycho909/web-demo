import { Notice, MessageLB, Mission, RemoveTitle } from "../lightbox.js";
import { GetUserCharacterData, InsertTitleLog, UpdateTitleLog } from "../api.js";
import useEventStore from "../store.js";
const { storeToRefs } = Pinia;

const create = {
	setup() {
		let stopTimer;
		let api = Vue.ref(false);
		const store = useEventStore();
		const timer = Vue.ref({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
		const { titleData } = storeToRefs(store);
		let CoolDownMin = Vue.ref(0);
		// 數字轉換
		const formattedTime = Vue.computed(() => {
			return {
				hours: timer.value.hours.toString().padStart(2, "0"),
				minutes: timer.value.minutes.toString().padStart(2, "0"),
				seconds: timer.value.seconds.toString().padStart(2, "0"),
				completed: timer.value.completed
			};
		});
		// 優化SVG讀取
		function quickCountdown() {
			return new Promise((resolve) => {
				let remaining = 9;
				timer.value.seconds = "09";
				const updateTimer = () => {
					const formattedSeconds = remaining.toString().padStart(2, "0");
					timer.value.seconds = formattedSeconds;

					if (remaining > 0) {
						setTimeout(updateTimer, 10);
					} else {
						resolve("倒數結束");
					}
					remaining -= 1;
				};

				updateTimer();
			});
		}
		// 倒數計時
		function countdown(initialEndTime, onUpdate) {
			let endTime = new Date(initialEndTime).getTime();
			let frameId;

			function stop() {
				if (frameId) {
					cancelAnimationFrame(frameId);
					frameId = null;
				}
			}

			function updateTimer() {
				const now = new Date().getTime();
				const distance = endTime - now;

				if (distance < 0) {
					onUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
					stop();
					return;
				}

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				onUpdate({ days, hours, minutes, seconds, completed: true });

				frameId = requestAnimationFrame(updateTimer);
			}

			function start(newEndTime) {
				if (newEndTime) {
					endTime = new Date(newEndTime).getTime();
				}
				if (!frameId) {
					updateTimer();
				}
			}

			// Initially start the timer
			start();

			// Return control methods
			return { start, stop };
		}

		// 刪除稱號
		const deleteItem = (Seq) => {
			// 打開lightbox確認是否刪除
			RemoveTitle(Seq);
		};
		// 稱號招喚
		const rollItem = () => {
			// 冷卻中
			if (formattedTime.value.completed) {
				return;
			}
			// 限制最多三個
			if (titleData.value.length >= 3) {
				return;
			}
			// 停止計時器
			if (stopTimer) {
				stopTimer.stop();
			}

			// 冷卻開始
			stopTimer = countdown("2024-03-30 00:00:00", (update) => {
				timer.value = update;
			});

			// 1.打API稱號招喚並跳頁
			$("#loadingProgress").show();
			InsertTitleLog(store.token).then((res) => {
				$("#loadingProgress").hide();
				let { code, message, listData, url } = res.data;
				if (code != 1) {
					MessageLB(message);
					return;
				}
				if (code == -2) {
					MessageLB(message, url);
					return;
				}
				store.setTitleData(listData);
				store.setCurrentPage("plunder");
				console.log("rollItem");
			});
		};
		const MissionLB = () => {
			let data = [];
			Mission(data);
		};
		Vue.onMounted(() => {
			quickCountdown();
			// stopTimer = countdown("2024-03-29 17:47:00", (update) => {
			// 	timer.value = update;
			// });
			// $("#loadingProgress").show();
			// GetUserCharacterData(cookie).then((res) => {
			// 	let { code, message, listData, url } = res.data;
			// $("#loadingProgress").hide();
			// 	if (code != 1) {
			// 		MessageLB(message);
			// 		return;
			// 	}
			// 	if (code == -2) {
			// 		MessageLB(message, url);
			// 		return;
			// 	}
			// });
			if (isMobile.any) {
				var swiper = new Swiper(".create-hold__box", {
					loop: true,
					navigation: {
						nextEl: ".create-hold__item-next",
						prevEl: ".create-hold__item-prev"
					}
				});
			}
		});

		// 組件卸載時停止計時器
		Vue.onUnmounted(() => {
			if (stopTimer) {
				stopTimer.stop();
			}
		});
		return { Notice, deleteItem, rollItem, titleData, formattedTime, MissionLB };
	},
	template: `
		<div class="create-content">
			<div class="create-title">天命覺醒</div>
			<div class="create-action">
				<div class="create-countdown">
					<div class="create-countdown__title">召喚冷卻時間</div>
					<div class="create-countdown__time-box">
						<!-- 時 -->
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="hour" :data-num="formattedTime.hours[0]"></i>
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="hour" :data-num="formattedTime.hours[1]"></i>
						<i class="create-countdown__time-num icon--num-style2 i--colon">:</i>
						<!-- 分 -->
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="min" :data-num="formattedTime.minutes[0]"></i>
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="min" :data-num="formattedTime.minutes[1]"></i>
						<i class="create-countdown__time-num icon--num-style2 i--colon">:</i>
						<!-- 秒 -->
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="sec" :data-num="formattedTime.seconds[0]"></i>
						<i class="create-countdown__time-num icon--num icon--num-style2" data-type="sec" :data-num="formattedTime.seconds[1]"></i>
					</div>
				</div>
				<div class="create-action__btn-group">
					<a href="javascript:;" class="create-action__btn-protect" :class="[formattedTime.completed?'-disabled':'']" @click="rollItem">召換天命</a>
				</div>
				<div class="create-countdown__notice" v-if="!formattedTime.completed">可進行天命召喚</div>
			</div>
			<div class="create-pre">
				<div class="create-pre__title">角色名稱</div>
				<div class="create-pre__name">角色名稱最多十個文字</div>
				<div class="create-pre__realm">
					<span>扭曲的黃金港01</span>
				</div>
				<div class="create-pre__notice">活動結束後，僅有預約角色名稱能創立角色</div>
			</div>
			<div class="create-hold">
				<div class="create-hold__title">目前持有的天命</div>
				<div class="create-hold__box swiper">
					<div class="create-hold__list swiper-wrapper">
						<div class="swiper-slide" v-for="i in titleData">
							<div class="create-hold__item">
								<div class="create-hold__name">{{i.TitleName}}</div>
								<a href="javascript:;" class="create-hold__btn-set btn-common" @click="deleteItem(i.Seq)">捨棄天命</a>
							</div>
						</div>
					</div>
					<div class="create-hold__item-prev"></div>
					<div class="create-hold__item-next"></div>
				</div>
			</div>
			<div class="create-task__list">
				<div class="create-task__item complete">
					<span>活動結束後每持有1個紫色天命</span>
					<span>可獲得一般造型召喚券5張</span>
				</div>
				<div class="create-task__item">
					<span>活動結束後每持有1個紫色天命</span>
					<span>可獲得一般造型召喚券5張</span>
				</div>
				<div class="create-task__item">
					<span>活動結束後每持有1個紫色天命</span>
					<span>可獲得一般造型召喚券5張</span>
				</div>
				<div class="create-task__item">
					<span>活動結束後每持有1個紫色天命</span>
					<span>可獲得一般造型召喚券5張</span>
				</div>
			</div>
			<a href="javascript:;" class="create-btn__mission" @click="MissionLB"></a>
			<a href="javascript:;" class="create-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default create;
