/**
 * Setup
 */
const num_icons = 10, // Number of icons in the strip
	// Max-speed in ms for animating one icon down
	time_per_icon = 100,
	// Holds icon indexes
	indexes = [0, 0, 0];

/**
 * Roll one reel
 */
const roll = (reel, offset = 0, icon_width, icon_height, callback) => {
	// Minimum of 2 + the reel offset rounds
	const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

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
			// Set background position
			reel.style.backgroundPositionY = `-${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);

		let end = (8 + 1 * delta) * time_per_icon + offset * 150;
		// After animation
		setTimeout(() => {
			// Reset position, so that it doesn't get higher without limit
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `-${normTargetBackgroundPositionY}px`;

			// Call the callback function if provided
			if (callback) {
				callback(reel, normTargetBackgroundPositionY);
			}

			// Resolve this promise
			resolve(delta % num_icons);
		}, end);
	});
};

/**
 * Roll all reels, when promise resolves roll again
 */
function rollAll(callback) {
	const reelsList = document.querySelectorAll(".slots > .reel > span");

	// Get the icon dimensions from the first reel span
	const firstReelSpan = reelsList[0];
	const icon_width = firstReelSpan.offsetWidth;
	const icon_height = firstReelSpan.offsetHeight;

	Promise

		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all([...reelsList].map((reel, i) => roll(reel, i, icon_width, icon_height, callback)))

		// When all reels done animating (all promises solve)
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons));

			// Again!
			// setTimeout(() => rollAll(callback), 2000);
		});
}

// Kickoff
setTimeout(
	() =>
		rollAll((reel, position) => {
			// Custom callback functionality to control the position of .slot > .reel > span
			// For example, setting the background color based on the final position
			console.log(position);
			// reel.style.backgroundColor = `hsl(${(position / num_icons) * 360}, 100%, 50%)`;
		}),
	1000
);

/*
幫我調整功能，可放入callback功能，可控制.slot > .reel > span 位置
*/

function countdown(endDate) {
	function updateCountdown() {
		const now = new Date().getTime();
		const timeLeft = endDate - now;

		if (timeLeft < 0) {
			clearInterval(timer);
			return;
		}

		// 計算小時、分鐘和秒
		let hours = Math.floor(timeLeft / (1000 * 60 * 60));
		let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		// 添加前導零
		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		// 更新HTML以顯示倒數計時
		console.log(hours + ":" + minutes + ":" + seconds);
	}

	// 立即更新一次
	updateCountdown();

	// 每秒更新一次
	const timer = setInterval(updateCountdown, 1000);
}

// 使用方法：設置結束日期
const endDate = new Date("2024-07-20 23:59:59").getTime();
// countdown(endDate);
