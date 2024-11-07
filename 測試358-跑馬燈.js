class Marquee {
	constructor(element, options = {}) {
		this.container = typeof element === "string" ? document.querySelector(element) : element;
		this.options = {
			direction: options.direction || "left",
			speed: options.speed || 50,
			interval: options.interval || 3000,
			gap: options.gap || 50,
			items: options.items || [],
			separator: options.separator || " | ",
			itemClass: options.itemClass || "marquee-item",
			duplicateClass: options.duplicateClass || "marquee-duplicate",
			...options
		};

		this.isRunning = false;
		this.isPaused = false;
		this.animationFrame = null;
		this.wrapper = null;
		this.content = null;
		this.currentPosition = 0; // 追踪當前位置
		this.init();
	}

	init() {
		this.createStructure();
		this.updateItems(this.options.items);
		this.bindEvents();
		this.start();
	}

	createStructure() {
		// 清空容器
		this.container.innerHTML = "";

		// 創建包裝容器
		this.wrapper = document.createElement("div");
		this.wrapper.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        `;

		// 創建內容容器
		this.content = document.createElement("div");
		this.content.style.cssText = `
            position: absolute;
            white-space: nowrap;
            display: inline-block;
        `;

		this.wrapper.appendChild(this.content);
		this.container.appendChild(this.wrapper);
	}

	createItemElement(item, isDuplicate = false) {
		// 根据内容类型创建文字或图片项
		const itemElement = document.createElement(item.includes("http") ? "img" : "span");
		itemElement.className = isDuplicate ? `${this.options.itemClass} ${this.options.duplicateClass}` : this.options.itemClass;

		if (item.includes("http")) {
			itemElement.src = item; // 设置图片的 URL
			itemElement.alt = "Marquee Image"; // 设置图片的替代文本
			itemElement.style.cssText = `
                width: auto;
                height: 100%;
                vertical-align: middle;
            `;
		} else {
			itemElement.textContent = item;
		}
		itemElement.style.margin = `0 ${this.options.gap / 2}px`;
		return itemElement;
	}

	updateItems(items) {
		// 停止當前動畫
		this.pause();

		// 更新選項中的 items
		this.options.items = items;

		// 清空內容容器
		this.content.innerHTML = "";

		// 創建內容生成函數
		const createContent = () => {
			const fragment = document.createDocumentFragment();

			items.forEach((item) => {
				fragment.appendChild(this.createItemElement(item));
				const separator = document.createElement("span");
				separator.textContent = this.options.separator;
				fragment.appendChild(separator);
			});

			return fragment;
		};

		// 重复添加内容，使其在滚动时保持连续性
		if (this.options.direction === "left" || this.options.direction === "right") {
			for (let i = 0; i < 3; i++) {
				this.content.appendChild(createContent());
			}
		} else {
			this.content.appendChild(createContent());
		}

		// 等待所有圖片載入後再重置位置
		const images = this.content.getElementsByTagName("img");
		if (images.length > 0) {
			Promise.all(
				Array.from(images).map((img) => {
					return new Promise((resolve) => {
						if (img.complete) {
							resolve();
						} else {
							img.onload = () => resolve();
							img.onerror = () => resolve(); // 即使圖片載入失敗也繼續
						}
					});
				})
			).then(() => {
				this.resetPosition();
				this.resume();
			});
		} else {
			// 如果沒有圖片，直接重置位置
			this.resetPosition();
			this.resume();
		}
	}

	resetPosition() {
		setTimeout(() => {
			switch (this.options.direction) {
				case "left":
					this.content.style.left = `${this.currentPosition}px`;
					this.content.style.top = "0";
					break;
				case "right":
					this.content.style.left = `${this.currentPosition}px`;
					this.content.style.top = "0";
					break;
				case "up":
					this.content.style.top = `${this.currentPosition}px`;
					break;
				case "down":
					this.content.style.top = `${this.currentPosition}px`;
					break;
			}
		}, 0);
	}

	animate() {
		if (!this.isRunning || this.isPaused) return;

		const move = () => {
			if (!this.isRunning || this.isPaused) return;

			const contentHeight = this.content.offsetHeight; // Full height of content
			const containerHeight = this.wrapper.offsetHeight; // Height of the container
			const contentWidth = this.content.offsetWidth;
			const containerWidth = this.wrapper.offsetWidth;
			switch (this.options.direction) {
				case "left":
					this.currentPosition -= this.options.speed / 60;
					if (this.currentPosition <= -(contentWidth / 3)) {
						// Reset position to the start of the second duplicate for seamless loop
						this.currentPosition = 0;
					}
					this.content.style.left = `${this.currentPosition}px`;
					break;

				case "right":
					this.currentPosition += this.options.speed / 60;
					if (this.currentPosition >= 0) {
						// Reset position to the start of the duplicate for seamless loop
						this.currentPosition = -contentWidth / 3; // 因為我們有3份複製的內容，所以除以3
					}
					this.content.style.left = `${this.currentPosition}px`;
					break;

				case "up":
					// Scroll up by reducing position until content is fully off the top
					this.currentPosition -= this.options.speed / 60;
					if (this.currentPosition <= -contentHeight) {
						// Reset position to below the container
						this.currentPosition = containerHeight;
					}
					this.content.style.top = `${this.currentPosition}px`;
					break;

				case "down":
					// Scroll down by increasing position until content is fully off the bottom
					this.currentPosition += this.options.speed / 60;
					if (this.currentPosition >= containerHeight) {
						// Reset position to above the container
						this.currentPosition = -contentHeight;
					}
					this.content.style.top = `${this.currentPosition}px`;
					break;
			}

			this.animationFrame = requestAnimationFrame(move);
		};

		move();
	}

	bindEvents() {
		// 滑鼠懸停事件
		this.wrapper.addEventListener("mouseenter", () => this.pause());
		this.wrapper.addEventListener("mouseleave", () => this.resume());

		// 監聽容器大小變化
		window.addEventListener("resize", () => this.handleResize());
	}
	togglePause() {
		if (this.isPaused) {
			this.resume();
		} else {
			this.pause();
		}
	}
	handleResize() {
		this.pause();
		this.resetPosition();
		this.resume();
	}

	start() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.animate();
	}

	pause() {
		this.isPaused = true;
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
			this.animationFrame = null;
		}
	}

	resume() {
		if (!this.isPaused) return;
		this.isPaused = false;
		this.animate();
	}

	setSpeed(speed) {
		const newSpeed = parseFloat(speed);
		if (!isNaN(newSpeed) && newSpeed > 0) {
			this.options.speed = newSpeed;
		}
	}

	setDirection(direction) {
		if (["left", "right", "up", "down"].includes(direction)) {
			this.pause();
			this.options.direction = direction;
			this.resetPosition();
			this.resume();
		}
	}

	destroy() {
		this.pause();
		this.wrapper.removeEventListener("mouseenter", () => this.pause());
		this.wrapper.removeEventListener("mouseleave", () => this.resume());
		window.removeEventListener("resize", () => this.handleResize());
		this.container.innerHTML = "";
	}
}
