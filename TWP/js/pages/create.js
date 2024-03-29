import { Notice, MessageLB } from "../lightbox.js";
import useEventStore from "../store.js";

const create = {
	setup() {
		let stopTimer;
		const store = useEventStore();
		const timer = Vue.ref({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
		const list = Vue.ref([]);

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
				timer.value.seconds = "09"; // 确保倒计时从9开始
				console.log("开始快速倒數");

				const updateTimer = () => {
					const formattedSeconds = remaining.toString().padStart(2, "0");
					timer.value.seconds = formattedSeconds;

					if (remaining > 0) {
						setTimeout(updateTimer, 10);
					} else {
						console.log("快速倒數結束");
						resolve("倒數結束"); // 倒数完成时解决Promise
					}
					remaining -= 1;
				};

				updateTimer();
			});
		}
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
					console.log("倒數計時結束。");
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
		const deleteItem = () => {
			console.log("deleteItem");
		};
		// 稱號招喚
		const rollItem = () => {
			// 倒數計時中
			if (formattedTime.value.completed) {
				return;
			}
			stopTimer.stop();
			stopTimer = countdown("2024-03-30 00:00:00", (update) => {
				timer.value = update;
			});
			if (list.value.length >= 3) {
				return;
			}
			// store.setCurrentPage("plunder");
			console.log("rollItem");
		};
		Vue.onMounted(() => {
			quickCountdown();
			// stopTimer = countdown("2024-03-29 17:47:00", (update) => {
			// 	timer.value = update;
			// });
		});

		// 組件卸載時停止計時器
		Vue.onUnmounted(() => {
			if (stopTimer) {
				stopTimer.stop();
			}
		});
		return { Notice, deleteItem, rollItem, list, formattedTime };
	},
	template: `
		<div class="create-content">
			<div class="create-title">預創角色名稱</div>
			<div class="create-action">
				<div class="create-countdown">
					<div class="create-countdown__title">保護及搶奪冷卻時間</div>
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
					<div class="create-countdown__notice">可使用保護或掠奪技能</div>
				</div>
				<div class="create-action__btn-group">
					<a href="javascript:;" class="create-action__btn-protect" @click="rollItem">保護</a>
				</div>
			</div>
			<div class="create-pre">
				<div class="create-pre__title">預約角色名稱</div>
				<div class="create-pre__name">角色名稱最多十個文字</div>
				<div class="create-pre__realm">
					<span>扭曲的黃金港01</span>
				</div>
				<div class="create-pre__notice">活動結束後，僅有預約角色名稱能創立角色</div>
			</div>
			<div class="create-hold">
				<div class="create-hold__title">目前持有的角色名稱</div>
				<div class="create-hold__list">
					<div class="create-hold__item" v-for="i in 3">
						<div class="create-hold__name">角色名稱最多十個文字</div>
						<a href="javascript:;" class="create-hold__btn-set btn-common" @click="deleteItem">設為預約角色</a>
					</div>
				</div>
			</div>
			<a href="javascript:;" class="create-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default create;
