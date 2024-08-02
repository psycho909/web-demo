/**
 * Setup
 */
const num_icons = 10, // Number of icons in the strip
	// Max-speed in ms for animating one icon down
	time_per_icon = 30,
	// Holds icon indexes
	indexes = [0, 0, 0, 0, 0, 0];

/**
 * Roll one reel
 */
const roll = (reel, offset = 0, icon_width, icon_height, targetIndex) => {
	// Minimum of 2 + the reel offset rounds
	const currentIndex = indexes[offset];
	const delta = ((targetIndex - currentIndex + num_icons) % num_icons) + (offset + 2) * num_icons;

	// Return promise so we can wait for all reels to finish
	return new Promise((resolve, reject) => {
		const style = getComputedStyle(reel),
			// Current background position
			backgroundPositionY = parseFloat(style["background-position-y"]),
			// Target background position
			targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
			// Normalized background position, for reset
			normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

		// Delay animation with timeout, for some reason a delay in the animation property causes stutter
		setTimeout(() => {
			// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// reel.style.transition = `background-position-y ${time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Set background position
			reel.style.backgroundPositionY = `-${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);

		let end = (8 + 1 * delta) * time_per_icon + offset * 150;
		// let end = time_per_icon;
		// After animation
		setTimeout(() => {
			// Reset position, so that it doesn't get higher without limit
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `-${normTargetBackgroundPositionY}px`;

			// Resolve this promise
			resolve(delta % num_icons);
		}, end);
	});
};

/**
 * Roll all reels, when promise resolves roll again
 */
function rollAll(targetIndexes = [0, 0, 0, 0, 0, 0], callback) {
	const reelsList = document.querySelectorAll(".slots > .reel > span");
	// Get the icon dimensions from the first reel span
	const firstReelSpan = reelsList[0];
	const icon_width = firstReelSpan.offsetWidth;
	const icon_height = firstReelSpan.offsetHeight;

	Promise

		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all([...reelsList].map((reel, i) => roll(reel, i, icon_width, icon_height, targetIndexes[i])))

		// When all reels done animating (all promises solve)
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons));
			if (callback) {
				callback();
			}
			// Again!
			// setTimeout(rollAll, 2000);
		});
}

function setReelIndexes(newIndexes) {
	if (newIndexes.length !== indexes.length) {
		console.error("The number of indexes provided does not match the number of reels.");
		return;
	}

	const reelsList = document.querySelectorAll(".slots > .reel > span");
	const firstReelSpan = reelsList[0];
	const icon_height = firstReelSpan.offsetHeight;

	newIndexes.forEach((newIndex, i) => {
		if (newIndex < 0 || newIndex >= num_icons) {
			console.error(`Invalid index ${newIndex} for reel ${i}. Index should be between 0 and ${num_icons - 1}.`);
			return;
		}

		const reel = reelsList[i];
		const currentIndex = indexes[i];
		const delta = (newIndex - currentIndex + num_icons) % num_icons;

		// reel.style.transition = "none";
		// reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
		// reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
		reel.style.backgroundPositionY = `-${newIndex * icon_height}px`;
		indexes[i] = newIndex;
	});
}

function getCountdown(endDate) {
	const now = new Date().getTime();
	const timeLeft = endDate - now;

	if (timeLeft < 0) {
		return "倒數結束！";
	}

	// 計算小時、分鐘和秒
	let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

	// 添加前導零
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	// 回傳倒數計時字串
	return `${hours}${minutes}${seconds}`.split("");
}
function startCountdown(endDate, callback) {
	let timer;

	function update() {
		const countdownString = getCountdown(endDate);
		callback(countdownString);

		if (countdownString === "倒數結束！") {
			clearInterval(timer);
		}
	}

	// 立即執行一次
	update();

	// 設置定時器，每秒更新一次
	timer = setInterval(update, 1000);

	// 返回一個函數，用於停止計時器
	return () => clearInterval(timer);
}

// 使用示例
const endDate = new Date("2024-07-19 18:00:00").getTime();
let targetIndex = getCountdown(endDate);
// console.log(targetIndex);
// const stopCountdown = startCountdown(endDate, (countdownString) => {
// 	console.log(countdownString); // 或者用其他方式處理倒數計時字串
// });

// 如果需要提前停止倒數計時，可以調用：
// stopCountdown();

// Kickoff with target positions
console.log(targetIndex);
setTimeout(
	() =>
		rollAll(targetIndex, () => {
			const stopCountdown = startCountdown(endDate, (countdownString) => {
				setReelIndexes(countdownString);
				console.log(countdownString); // 或者用其他方式處理倒數計時字串
			});
		}),
	1000
);
