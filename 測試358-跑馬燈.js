class Marquee {
	constructor(element, options = {}) {
		// 基本屬性初始化
		this.container = typeof element === "string" ? document.querySelector(element) : element;
		if (!this.container) {
			throw new Error("Invalid element provided");
		}

		// 配置選項
		this.options = {
			direction: options.direction || "left",
			speed: options.speed || 50,
			interval: options.interval || 3000,
			items: options.items || [],
			itemClass: options.itemClass || "marquee-item",
			duplicateClass: options.duplicateClass || "marquee-duplicate",
			loadingClass: options.loadingClass || "marquee-loading",
			...options
		};

		// 狀態標記
		this.isInitialized = false;
		this.isRunning = false;
		this.isPaused = false;

		// 動畫相關
		this.animationFrame = null;
		this.currentPosition = 0;
		this.lastTimestamp = 0;
		this.fps = 60;
		this.frameInterval = 1000 / this.fps;

		// DOM 元素
		this.wrapper = null;
		this.content = null;

		// 觀察者和定時器
		this.resizeTimeout = null;

		// 事件處理器綁定
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleResize = this.throttleResize.bind(this);

		// 創建多個副本以實現無縫效果
		this.infinite = 6;
		// 新增事件處理器綁定
		this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
		// 添加新的屬性來追踪暫停時的時間戳
		this.pausedTimestamp = 0;

		// 自動初始化
		this.initPromise = this.init().catch((error) => {
			console.error("Marquee initialization failed:", error);
		});
	}

	// 初始化相關方法
	async init() {
		try {
			this.createStructure();
			if (["up", "down"].includes(this.options.direction)) {
				this.content.style.display = "inline-flex";
				this.content.style.flexDirection = "column";
				this.content.style.whiteSpace = "nowrap";
				// 為 down 方向設置初始位置
				if (this.options.direction === "down") {
					this.currentPosition = -(this.content.offsetHeight - this.wrapper.offsetHeight);
				}
			}

			await this.preloadImages(this.options.items);
			this.updateItems(this.options.items);
			this.bindEvents();
			this.isInitialized = true;
			this.start();
		} catch (error) {
			console.error("Initialization failed:", error);
			throw error;
		}
	}

	createStructure() {
		this.container.innerHTML = "";

		this.wrapper = document.createElement("div");
		this.wrapper.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            transform: translateZ(0);
        `;

		this.content = document.createElement("div");
		this.content.style.cssText = `
            position: absolute;
            white-space: nowrap;
            display: inline-block;
            transform: translateZ(0);
            will-change: transform;
			opacity: 0;
        transition: opacity 0.3s ease;
        `;
		// 添加 loading 類
		this.content.classList.add(this.options.loadingClass);
		this.wrapper.appendChild(this.content);
		this.container.appendChild(this.wrapper);
	}

	// 圖片處理相關方法
	createItemElement(item, isDuplicate = false) {
		const itemStr = String(item);
		const itemElement = document.createElement(itemStr.includes("http") ? "img" : "span");

		// 修改這裡：分別設置基本類和複製類
		itemElement.classList.add(this.options.itemClass);
		if (isDuplicate) {
			itemElement.classList.add(this.options.duplicateClass);
		}

		if (itemStr.includes("http")) {
			itemElement.src = itemStr;
			itemElement.alt = "Marquee Image";
			itemElement.style.cssText = `
				width: auto;
				height: 100%;
				vertical-align: middle;
			`;
			itemElement.onerror = () => {
				console.warn(`Failed to load image: ${itemStr}`);
				itemElement.style.display = "none";
			};
		} else {
			itemElement.textContent = itemStr;
		}
		return itemElement;
	}

	preloadImages(items) {
		const imageUrls = items.filter((item) => item.includes("http"));

		return Promise.all(
			imageUrls.map((url) => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = () => resolve(url);
					img.onerror = () => {
						console.warn(`Failed to preload image: ${url}`);
						reject(new Error(`Failed to load ${url}`));
					};
					img.src = url;
				});
			})
		).catch((error) => {
			console.error("Error preloading images:", error);
			return [];
		});
	}

	updateItems(items) {
		// 確保 items 是數組
		if (!Array.isArray(items)) {
			items = [items];
		}

		this.pause();
		this.options.items = [...this.options.items, ...items]; // 合併新舊項目
		this.content.innerHTML = "";

		const createContent = (isDuplicate = false) => {
			const fragment = document.createDocumentFragment();
			const itemsToRender = this.options.direction === "down" || this.options.direction === "right" ? [...this.options.items].reverse() : this.options.items;

			itemsToRender.forEach((item, index) => {
				// 傳入 isDuplicate 參數來標記是否為複製項目
				fragment.appendChild(this.createItemElement(item, isDuplicate));
				if (this.options.separator && index < itemsToRender.length - 1) {
					const separator = document.createElement("span");
					separator.textContent = this.options.separator;
					fragment.appendChild(separator);
				}
			});
			return fragment;
		};
		// 先創建原始內容（不是複製的）
		this.content.appendChild(createContent(false));

		// 計算需要的副本數量
		if (["left", "right"].includes(this.options.direction)) {
			const contentWidth = this.content.offsetWidth;
			const wrapperWidth = this.wrapper.offsetWidth;

			if (contentWidth < wrapperWidth) {
				this.infinite = Math.ceil(wrapperWidth / contentWidth) + 1;
			}
		}

		// 清空內容後重新創建
		this.content.innerHTML = "";
		// 添加原始內容
		this.content.appendChild(createContent(false));

		// 添加複製內容
		for (let i = 1; i < this.infinite; i++) {
			this.content.appendChild(createContent(true));
		}

		const images = this.content.getElementsByTagName("img");
		if (images.length > 0) {
			Promise.all(
				Array.from(images).map((img) => {
					return new Promise((resolve) => {
						if (img.complete) {
							resolve();
						} else {
							img.onload = () => resolve();
							img.onerror = () => {
								console.warn(`Failed to load image: ${img.src}`);
								img.style.display = "none";
								resolve();
							};
						}
					});
				})
			)
				.then(() => {
					this.resetPosition();
					// 移除 loading 類並顯示內容
					this.content.classList.remove(this.options.loadingClass);
					this.content.style.opacity = "1"; // 所有圖片載入完成後顯示
					this.resume();
				})
				.catch((error) => {
					console.error("Error loading images:", error);
					this.resetPosition();
					// 即使有錯誤也移除 loading 類並顯示內容
					this.content.classList.remove(this.options.loadingClass);
					this.content.style.opacity = "1"; // 即使有錯誤也顯示
					this.resume();
				});
		} else {
			this.resetPosition();
			// 沒有圖片時直接移除 loading 類並顯示內容
			this.content.classList.remove(this.options.loadingClass);
			this.content.style.opacity = "1"; // 沒有圖片時直接顯示
			this.resume();
		}
	}

	// 動畫相關方法
	async animate() {
		await this.initPromise;
		if (!this.isRunning || this.isPaused) return;

		const move = (timestamp) => {
			if (!this.isRunning || this.isPaused) return;

			// 如果是從暫停恢復，調整lastTimestamp
			if (this.pausedTimestamp) {
				this.lastTimestamp = timestamp - (this.pausedTimestamp - this.lastTimestamp);
				this.pausedTimestamp = 0;
			}

			if (!this.lastTimestamp) this.lastTimestamp = timestamp;
			const deltaTime = timestamp - this.lastTimestamp;

			if (deltaTime >= this.frameInterval) {
				const contentHeight = this.content.offsetHeight;
				const contentWidth = this.content.offsetWidth;
				const pixelsPerFrame = (this.options.speed * deltaTime) / 1000;

				switch (this.options.direction) {
					case "left":
						this.currentPosition -= pixelsPerFrame;
						// 當內容移動超過一個完整循環時，重置位置但保持連續性
						if (this.currentPosition <= -(contentWidth / this.infinite)) {
							this.currentPosition += contentWidth / this.infinite;
						}
						break;
					case "right":
						this.currentPosition += pixelsPerFrame;
						if (this.currentPosition >= 0) {
							this.currentPosition -= contentWidth / this.infinite;
						}
						break;
					case "up":
						this.currentPosition -= pixelsPerFrame;
						if (this.currentPosition <= -(contentHeight / this.infinite)) {
							this.currentPosition += contentHeight / this.infinite;
						}
						break;
					case "down":
						this.currentPosition += pixelsPerFrame;
						if (this.currentPosition >= 0) {
							this.currentPosition -= contentHeight / this.infinite;
						}
						break;
				}

				const transform = this.options.direction === "left" || this.options.direction === "right" ? `translate3d(${this.currentPosition}px, 0, 0)` : `translate3d(0, ${this.currentPosition}px, 0)`;

				this.content.style.transform = transform;
				this.lastTimestamp = timestamp;
			}

			this.animationFrame = requestAnimationFrame(move);
		};

		move();
	}

	// 修改 resetPosition 方法
	resetPosition() {
		// 移除 setTimeout，直接設置位置
		switch (this.options.direction) {
			case "right":
				this.currentPosition = -(this.content.offsetWidth - this.wrapper.offsetWidth);
				break;
			case "down":
				this.currentPosition = -(this.content.offsetHeight - this.wrapper.offsetHeight);
				break;
			default:
				this.currentPosition = 0;
		}

		// 使用 translate3d 來強制啟用硬件加速
		const transform = this.options.direction === "left" || this.options.direction === "right" ? `translate3d(${this.currentPosition}px, 0, 0)` : `translate3d(0, ${this.currentPosition}px, 0)`;
		this.content.style.transform = transform;
	}

	// 事件處理相關方法
	handleMouseEnter() {
		this.pause();
	}

	handleMouseLeave() {
		this.resume();
	}

	throttleResize() {
		if (this.resizeTimeout) return;

		this.resizeTimeout = setTimeout(() => {
			this.pause();
			this.resetPosition();
			this.resume();
			this.resizeTimeout = null;
		}, 100);
	}

	bindEvents() {
		this.wrapper.addEventListener("mouseenter", this.handleMouseEnter);
		this.wrapper.addEventListener("mouseleave", this.handleMouseLeave);

		window.addEventListener("resize", this.handleResize);
		// 新增頁面可見性變化監聽
		document.addEventListener("visibilitychange", this.handleVisibilityChange);
	}
	// 新增處理頁面可見性變化的方法
	handleVisibilityChange() {
		if (document.hidden) {
			this.pause();
		} else {
			this.resume();
		}
	}
	togglePause() {
		if (this.isPaused) {
			this.resume();
		} else {
			this.pause();
		}
	}
	// 控制相關方法
	async start() {
		await this.initPromise;
		if (this.isRunning) return;
		this.isRunning = true;
		this.animate();
	}

	async pause() {
		await this.initPromise;
		this.isPaused = true;
		// 保存暫停時的時間戳
		this.pausedTimestamp = performance.now();
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
			this.animationFrame = null;
		}
	}

	async resume() {
		await this.initPromise;
		if (!this.isPaused) return;
		this.isPaused = false;
		this.animate();
	}

	// 設置相關方法
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

	// 重新初始化方法
	async reInit(options = {}) {
		try {
			// 先停止並清理當前實例
			this.destroy();

			// 更新選項，使用展開運算符合併所有選項
			this.options = {
				...this.options, // 保留原有選項作為基礎
				...options, // 覆蓋新的選項
				// 確保必要的默認值
				direction: options.direction || this.options.direction || "left",
				speed: options.speed || this.options.speed || 50,
				interval: options.interval || this.options.interval || 3000,
				items: options.items || this.options.items || [],
				itemClass: options.itemClass || this.options.itemClass || "marquee-item",
				duplicateClass: options.duplicateClass || this.options.duplicateClass || "marquee-duplicate",
				loadingClass: options.loadingClass || this.options.loadingClass || "marquee-loading"
			};

			// 重置所有狀態
			this.isInitialized = false;
			this.isRunning = false;
			this.isPaused = false;
			this.animationFrame = null;
			this.currentPosition = 0;
			this.lastTimestamp = 0;
			this.pausedTimestamp = 0;
			this.wrapper = null;
			this.content = null;
			this.resizeTimeout = null;

			// 重新綁定所有事件處理器
			this.handleMouseEnter = this.handleMouseEnter.bind(this);
			this.handleMouseLeave = this.handleMouseLeave.bind(this);
			this.handleResize = this.throttleResize.bind(this);
			this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

			// 重新初始化
			await this.init();

			return this;
		} catch (error) {
			console.error("reInit failed:", error);
			throw error;
		}
	}

	// 清理相關方法
	destroy() {
		this.pause();
		this.wrapper.removeEventListener("mouseenter", this.handleMouseEnter);
		this.wrapper.removeEventListener("mouseleave", this.handleMouseLeave);
		window.removeEventListener("resize", this.handleResize);
		document.removeEventListener("visibilitychange", this.handleVisibilityChange);

		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
		}

		this.container.innerHTML = "";
		this.isInitialized = false;
	}
}
