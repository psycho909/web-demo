// 定義變量
let canvas;
let ctx;
let errorDiv;

// 加載圖片並支持 CORS 的函數
export function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
		img.src = src;
	});
}

// 居中繪製文字的函數
export function drawCenteredText(text, x, y, font, color) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}

// 動態繪製成長率文本的函數（僅當提供 growthRate 時才顯示）
export function drawGrowthRate(cardX, baselineY, growthRate) {
	if (!growthRate) return; // 若 growthRate 為空則隱藏成長率

	const centerX = cardX + 139;
	const normalFont = 'normal 28px "Microsoft JhengHei"';
	const largeFont = 'normal 44px "Microsoft JhengHei"';

	ctx.font = normalFont;
	const prefix = "成長率";
	const suffix = "%";
	const prefixWidth = ctx.measureText(prefix).width;
	const suffixWidth = ctx.measureText(suffix).width;

	ctx.font = largeFont;
	const numberWidth = ctx.measureText(growthRate).width;

	const spacing = 2;
	const totalWidth = prefixWidth + numberWidth + suffixWidth + spacing * 2;
	let startX = centerX - totalWidth / 2;

	ctx.font = normalFont;
	ctx.fillStyle = "#ffebd1";
	ctx.textAlign = "left";
	ctx.fillText(prefix, startX, baselineY);

	startX += prefixWidth + spacing;
	ctx.font = largeFont;
	ctx.fillText(growthRate, startX, baselineY);

	startX += numberWidth + spacing;
	ctx.font = normalFont;
	ctx.fillText(suffix, startX, baselineY);
}

// 繪製卡片內容的函數，支持 "mabi" 標誌的特殊設置
export function drawCardContent(cardX, cardY, { days2024, days2023, growthRate, show2024, show2023, desc2024Image, desc2023Image }, isMabi) {
	const titleY = isMabi ? cardY + 105 : cardY + 90;
	const desc2024Y = isMabi ? cardY + 209 : cardY + 174;

	// 繪製 "累積登入天數" 標籤
	drawCenteredText("累積登入天數", cardX + 139, titleY, 'bold 28px "Microsoft JhengHei"', "#ffebd1");

	// 若有指定天數顯示，則繪製 2024 天數
	if (show2024 && days2024) {
		const textY = isMabi ? cardY + 295 : cardY + 240;
		drawCenteredText(days2024, cardX + 139, textY, 'normal 34px "Microsoft JhengHei"', "#d1ac66");
	}

	// 若非 "mabi" 標誌且有 growthRate 則繪製成長率
	if (!isMabi) drawGrowthRate(cardX, cardY + 300, growthRate);

	// 若非 "mabi" 且 show2023 顯示，則繪製 2023 的天數和標籤
	if (show2023 && !isMabi) {
		if (desc2023Image) ctx.drawImage(desc2023Image, cardX + 85, cardY + 322);
		if (days2023) {
			drawCenteredText(days2023, cardX + 139, cardY + 388, 'normal 34px "Microsoft JhengHei"', "#d1ac66");
		}
	}

	// 如果 show2024 且 desc2024Image 存在，繪製 2024 標籤圖片
	if (show2024 && desc2024Image) {
		ctx.drawImage(desc2024Image, cardX + 85, desc2024Y);
	}
}

// 主函數：繪製所有內容並支持自定義設置
export async function drawShareImage({
	logo = "cso",
	cardData = [
		{ show2024: true, show2023: true, days2024: "123天", days2023: "100天", growthRate: "100" },
		{ show2024: true, show2023: false, days2024: "456天", days2023: "", growthRate: "200" },
		{ show2024: true, show2023: true, days2024: "789天", days2023: "200天", growthRate: "" }
	]
} = {}) {
	// 初始化畫布和上下文
	canvas = document.getElementById("shareCanvas");
	ctx = canvas.getContext("2d");
	errorDiv = document.getElementById("error");

	canvas.width = 1200;
	canvas.height = 630;

	try {
		const bgImage = await loadImage("./images/share/bg-share.jpg");
		const titleImage = await loadImage("./images/share/share-title.png");
		const logoImage = await loadImage(`./images/share/share-logo-${logo}.png`);
		const cardBgImage = await loadImage("./images/share/share-card-bg.png");

		ctx.drawImage(bgImage, 0, 0, 1200, 630);
		ctx.drawImage(titleImage, 572, 80, 191, 33);
		ctx.drawImage(logoImage, 375, 51, 195, 90);

		const isMabi = logo === "mabi";
		const cardPositions = [
			{ x: 115, y: 165 },
			{ x: 462, y: 165 },
			{ x: 794, y: 165 }
		];

		for (let i = 0; i < cardData.length; i++) {
			const { x, y } = cardPositions[i];
			const card = cardData[i];

			// 設置卡片的陰影效果
			ctx.shadowColor = "rgba(81,44, 0, 0.75)"; // 陰影顏色
			ctx.shadowOffsetX = 0; // 陰影橫向偏移
			ctx.shadowOffsetY = 4; // 陰影縱向偏移
			ctx.shadowBlur = 11; // 模糊程度
			ctx.drawImage(cardBgImage, x, y, 278, 428);

			const desc2024Image = card.show2024 ? await loadImage("./images/share/share-desc-2024.png") : null;
			const desc2023Image = card.show2023 ? await loadImage("./images/share/share-desc-2023.png") : null;

			drawCardContent(x, y, { ...card, desc2024Image, desc2023Image }, isMabi);
		}
	} catch (error) {
		console.error("Error:", error);
		errorDiv.textContent = error.message;
	}
}

// 獲取 Base64 圖片字符串的函數
export function getBase64Image(format = "image/jpeg", quality = 0.6) {
	return canvas.toDataURL(format, quality); // 使用 JPEG 格式並設置質量
}

// 生成可下載圖片的函數
export function downloadImage() {
	const imageData = getBase64Image();
	const downloadLink = document.createElement("a");
	downloadLink.href = imageData;
	downloadLink.download = "share_image.png";
	downloadLink.click();
}
