// 創建容器來顯示所有canvas
const container = document.createElement("div");
document.body.appendChild(container);
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "10px";

// 主canvas - 最終輸出
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
container.appendChild(canvas);

// 原始視頻canvas - 用於顯示原始影片
const originalCanvas = document.createElement("canvas");
const originalCtx = originalCanvas.getContext("2d");
originalCanvas.width = 1200;
originalCanvas.height = 600;
container.appendChild(originalCanvas);

// alpha通道canvas - 用於顯示alpha部分
const alphaCanvas = document.createElement("canvas");
const alphaCtx = alphaCanvas.getContext("2d");
alphaCanvas.width = 1200;
alphaCanvas.height = 600;
container.appendChild(alphaCanvas);

const video = document.createElement("video");
video.src = "./video/title_in.mp4"; // 確保這裡填入正確的視頻路徑
video.playsInline = true;
video.muted = true;

// 添加視頻元素到頁面以便調試
container.appendChild(video);

// 添加播放按鈕
const playButton = document.createElement("button");
playButton.textContent = "播放視頻";
container.appendChild(playButton);
playButton.onclick = () => video.play();

video.addEventListener("play", function () {
	function processFrame() {
		if (!video.paused && !video.ended) {
			// 清除所有 canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
			alphaCtx.clearRect(0, 0, alphaCanvas.width, alphaCanvas.height);

			// 顯示原始視頻（上半部分）
			originalCtx.drawImage(
				video,
				0,
				0,
				1200,
				600, // 源視頻的上半部分
				0,
				0,
				1200,
				600 // 目標位置和尺寸
			);

			// 顯示 alpha 通道（下半部分）
			alphaCtx.drawImage(
				video,
				0,
				600,
				1200,
				600, // 源視頻的下半部分
				0,
				0,
				1200,
				600 // 目標位置和尺寸
			);

			// 獲取 alpha 通道的圖像數據
			const alphaData = alphaCtx.getImageData(0, 0, alphaCanvas.width, alphaCanvas.height);
			// 獲取主圖像數據
			const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);

			// 應用 alpha
			for (let i = 0; i < imageData.data.length; i += 4) {
				// 使用 alpha 圖像的亮度值作為主圖像的 alpha 值
				const alpha = Math.round(alphaData.data[i] * 0.299 + alphaData.data[i + 1] * 0.587 + alphaData.data[i + 2] * 0.114);
				imageData.data[i + 3] = 255 - alpha; // 反轉 alpha 值
			}

			// 將最終結果繪製到主 canvas
			ctx.putImageData(imageData, 0, 0);

			// 添加標籤
			ctx.fillStyle = "white";
			ctx.font = "20px Arial";
			originalCtx.fillText("原始影片", 10, 30);
			alphaCtx.fillText("Alpha通道", 10, 30);
			ctx.fillText("最終結果", 10, 30);

			requestAnimationFrame(processFrame);
		}
	}
	processFrame();
});

// 錯誤處理
video.onerror = function () {
	console.error("視頻加載出錯：", video.error);
	console.log("錯誤碼：", video.error.code);
	console.log("錯誤訊息：", video.error.message);
};

// 添加更多事件監聽以便調試
video.addEventListener("loadedmetadata", () => {
	console.log("視頻元數據已加載");
	console.log("視頻尺寸：", video.videoWidth, "x", video.videoHeight);
});

video.addEventListener("loadeddata", () => {
	console.log("視頻數據已加載");
});
