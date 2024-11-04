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

	createItemElement(text, isDuplicate = false) {
		const item = document.createElement("span");
		item.className = isDuplicate ? `${this.options.itemClass} ${this.options.duplicateClass}` : this.options.itemClass;
		item.textContent = text;
		item.style.margin = `0 ${this.options.gap / 2}px`;
		return item;
	}

	updateItems(items) {
		// 停止當前動畫
		this.pause();

		// 更新選項中的items
		this.options.items = items;

		// 清空內容容器
		this.content.innerHTML = "";

		// 創建內容生成函數
		const createContent = () => {
			const fragment = document.createDocumentFragment();

			items.forEach((text, index) => {
				// 添加項目
				fragment.appendChild(this.createItemElement(text));

				// 添加分隔符（包括最後一個項目後面）
				const separator = document.createElement("span");
				separator.textContent = this.options.separator;
				fragment.appendChild(separator);
			});

			return fragment;
		};

		// 添加原始內容
		this.content.appendChild(createContent());

		// 添加複製的內容（不包括最後一個分隔符）
		const duplicateContent = createContent();
		// 移除最後一個分隔符
		duplicateContent.lastChild.remove();
		this.content.appendChild(duplicateContent);

		// 重置位置
		this.resetPosition();

		// 恢復動畫
		this.resume();
	}

	resetPosition() {
		switch (this.options.direction) {
			case "left":
				this.currentPosition = 0;
				this.content.style.left = "0";
				this.content.style.top = "0";
				break;
			case "right":
				this.currentPosition = -this.content.offsetWidth / 2;
				this.content.style.left = `${this.currentPosition}px`;
				this.content.style.top = "0";
				break;
			case "up":
				this.currentPosition = 0;
				this.content.style.top = "0";
				this.content.style.left = "0";
				break;
			case "down":
				this.currentPosition = -this.content.offsetHeight / 2;
				this.content.style.top = `${this.currentPosition}px`;
				this.content.style.left = "0";
				break;
		}
	}

	animate() {
		if (!this.isRunning || this.isPaused) return;

		const move = () => {
			if (!this.isRunning || this.isPaused) return;

			const contentWidth = this.content.offsetWidth / 2;
			const contentHeight = this.content.offsetHeight / 2;

			switch (this.options.direction) {
				case "left":
					this.currentPosition -= this.options.speed / 60;
					if (this.currentPosition <= -contentWidth) {
						this.currentPosition = 0;
					}
					this.content.style.left = `${this.currentPosition}px`;
					break;

				case "right":
					this.currentPosition += this.options.speed / 60;
					if (this.currentPosition >= 0) {
						this.currentPosition = -contentWidth;
					}
					this.content.style.left = `${this.currentPosition}px`;
					break;

				case "up":
					this.currentPosition -= this.options.speed / 60;
					if (this.currentPosition <= -contentHeight) {
						this.currentPosition = 0;
					}
					this.content.style.top = `${this.currentPosition}px`;
					break;

				case "down":
					this.currentPosition += this.options.speed / 60;
					if (this.currentPosition >= 0) {
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
		// 確保速度是有效的數字
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
