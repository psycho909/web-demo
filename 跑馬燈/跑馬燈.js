class Marquee {
	constructor(element, options = {}) {
		// 基本屬性初始化
		this.container = typeof element === "string" ? document.querySelector(element) : element;
		if (!this.container) {
			throw new Error("Invalid element provided");
		}

		// 配置選項
		this.options = {
			// 跑馬燈移動方向，預設為「左」
			direction: options.direction || "left",
			// 移動速度，預設為 50 (像素/秒)
			speed: options.speed || 50,
			// 間隔時間，預設為 3000 毫秒
			interval: options.interval || 3000,
			// 要顯示的項目陣列，預設為空陣列
			items: options.items || [],
			// 跑馬燈項目的 CSS class 名稱，預設為 'marquee-item'
			itemClass: options.itemClass || "marquee-item",
			// 複製項目的 CSS class 名稱，預設為 'marquee-duplicate'
			duplicateClass: options.duplicateClass || "marquee-duplicate",
			// 載入中的 CSS class 名稱，預設為 'marquee-loading'
			loadingClass: options.loadingClass || "marquee-loading",
			// 滑鼠懸停時是否暫停，預設為 true
			pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
			// 跑馬燈模式，預設為空字串
			mode: options.mode || "",
			// 重新啟動延遲時間，預設為 0 毫秒
			restartDelay: options.restartDelay || 0,
			// 展開其他傳入的選項
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
		this.restartTimeout = null; // 新增重啟計時器

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
		this.infinite = 2;
		// 效能優化相關屬性
		this.rafEnabled = true;
		this.lastFrameTime = 0;
		this.minFrameInterval = 16;

		// 事件處理器綁定
		this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

		// 暫停相關屬性
		this.pausedTimestamp = 0;

		// 單項目模式相關屬性
		this.currentItemIndex = 0;
		this.itemWidth = 0;

		// 從 mode 設定衍生的屬性
		this.singleItemMode = this.options.mode === "single";
		this.noInfiniteScroll = this.options.mode === "group";

		// 自動初始化
		this.initPromise = this.init().catch((error) => {
			console.error("Marquee initialization failed:", error);
		});
	}

	// 初始化相關方法
	async init() {
		try {
			// 在創建結構前先獲取原始的 marquee items
			const originalItems = Array.from(this.container.querySelectorAll(".marquee-item")).map((el) => el.innerHTML);

			this.createStructure();
			if (["up", "down"].includes(this.options.direction)) {
				this.content.style.display = "inline-flex";
				this.content.style.flexDirection = "column";
				this.content.style.whiteSpace = "nowrap";
				if (this.options.direction === "down") {
					this.currentPosition = -(this.content.offsetHeight - this.wrapper.offsetHeight);
				}
			}

			// 使用從 HTML 獲取的項目
			await this.preloadImages(originalItems);
			this.updateItems(originalItems);
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
		const itemElement = document.createElement("div");
		itemElement.className = isDuplicate ? `${this.options.itemClass} ${this.options.duplicateClass}` : this.options.itemClass;

		// 直接設置內容，不管是文字還是HTML
		itemElement.innerHTML = String(item);

		return itemElement;
	}

	preloadImages(items) {
		// 創建臨時的 DOM 元素來解析 HTML 字符串
		const tempDiv = document.createElement("div");
		const imageUrls = items
			.flatMap((item) => {
				tempDiv.innerHTML = item;
				const urls = [];

				// 檢查 img 標籤
				const img = tempDiv.querySelector("img");
				if (img?.src) {
					urls.push(img.src);
				}

				// 檢查所有元素的背景圖片
				const elements = tempDiv.querySelectorAll("*");
				elements.forEach((element) => {
					// 檢查 style 屬性中的背景圖片
					const style = element.getAttribute("style");
					if (style) {
						const bgMatch = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);
						if (bgMatch?.[1]) {
							urls.push(bgMatch[1]);
						}
					}

					// 檢查 class 對應的 CSS 背景圖片（如果需要）
					const computedStyle = window.getComputedStyle(element);
					const bgImage = computedStyle.backgroundImage;
					if (bgImage && bgImage !== "none") {
						const bgUrl = bgImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1];
						if (bgUrl) {
							urls.push(bgUrl);
						}
					}
				});

				tempDiv.innerHTML = ""; // 清空以便重用
				return urls;
			})
			.filter((url) => url && url.includes("http")); // 過濾出有效的 URL

		// 去除重複的 URL
		const uniqueUrls = [...new Set(imageUrls)];

		return Promise.all(
			uniqueUrls.map((url) => {
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
	async updateItems(items) {
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
				const itemElement = this.createItemElement(item, isDuplicate);

				// 如果是單項目模式，設置初始顯示狀態
				if (this.singleItemMode && ["left", "right"].includes(this.options.direction)) {
					itemElement.style.display = index === this.currentItemIndex ? "inline-block" : "none";
				}

				fragment.appendChild(itemElement);

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

		// 只在非單項目模式且需要無限滾動時處理複製
		if (!this.singleItemMode && ["left", "right"].includes(this.options.direction)) {
			const contentWidth = this.content.offsetWidth;
			const wrapperWidth = this.wrapper.offsetWidth;

			if (!this.noInfiniteScroll) {
				// 原有的無限滾動邏輯
				if (contentWidth < wrapperWidth) {
					this.infinite = Math.min(Math.ceil(wrapperWidth / contentWidth) + 1, 3);
				} else {
					this.infinite = 2;
				}
			} else {
				// group 模式：不論項目數量都不複製
				this.infinite = 1;
			}
		}
		if (!this.singleItemMode) {
			// 清空內容後重新創建
			this.content.innerHTML = "";
			// 添加原始內容
			this.content.appendChild(createContent(false));
			// 添加複製內容
			for (let i = 1; i < this.infinite; i++) {
				this.content.appendChild(createContent(true));
			}
		}
		// 修改圖片加載和內容顯示的邏輯
		const images = this.content.getElementsByTagName("img");
		if (images.length > 0) {
			// 先將所有圖片設置為不可見
			Array.from(images).forEach((img) => {
				img.style.visibility = "hidden";
			});

			await Promise.all(
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
			);

			// 所有圖片加載完成後，設置為可見
			Array.from(images).forEach((img) => {
				if (img.style.display !== "none") {
					img.style.visibility = "visible";
				}
			});

			// 等待一個短暫延遲，確保瀏覽器完成渲染
			await new Promise((resolve) => setTimeout(resolve, 50));

			this.resetPosition();
			this.content.classList.remove(this.options.loadingClass);
			this.content.style.opacity = "1";
			this.resume();
		} else {
			this.resetPosition();
			this.content.classList.remove(this.options.loadingClass);
			this.content.style.opacity = "1";
			this.resume();
		}
	}

	async animate() {
		await this.initPromise;
		if (!this.isRunning || this.isPaused || !this.rafEnabled) return;

		const now = performance.now();
		const elapsed = now - this.lastFrameTime;

		if (elapsed < this.minFrameInterval) {
			this.animationFrame = requestAnimationFrame(() => this.animate());
			return;
		}

		const move = (timestamp) => {
			if (!this.isRunning || this.isPaused) return;

			if (this.pausedTimestamp) {
				this.lastTimestamp = timestamp - (this.pausedTimestamp - this.lastTimestamp);
				this.pausedTimestamp = 0;
			}

			if (!this.lastTimestamp) this.lastTimestamp = timestamp;
			const deltaTime = timestamp - this.lastTimestamp;

			if (deltaTime >= this.frameInterval) {
				const contentHeight = this.content.offsetHeight;
				const contentWidth = this.content.offsetWidth;
				const wrapperWidth = this.wrapper.offsetWidth;
				const pixelsPerFrame = (this.options.speed * deltaTime) / 1000;

				switch (this.options.direction) {
					case "left":
						if (this.singleItemMode) {
							this.currentPosition -= pixelsPerFrame;
							const items = this.content.querySelectorAll(`.${this.options.itemClass}`);

							if (this.currentPosition <= -contentWidth) {
								this.pause();
								this.currentPosition = wrapperWidth;
								this.currentItemIndex = (this.currentItemIndex + 1) % items.length;

								// 如果已經顯示完最後一個項目
								if (this.currentItemIndex === 0) {
									this.restartTimeout = setTimeout(() => {
										items.forEach((item, index) => {
											item.style.display = index === 0 ? "inline-block" : "none";
										});
										this.resume();
									}, this.options.restartDelay);
								} else {
									items.forEach((item, index) => {
										item.style.display = index === this.currentItemIndex ? "inline-block" : "none";
									});
									this.resume();
								}
							}
						} else if (this.noInfiniteScroll) {
							this.currentPosition -= pixelsPerFrame;
							if (this.currentPosition <= -contentWidth) {
								this.pause();
								this.restartTimeout = setTimeout(() => {
									this.currentPosition = wrapperWidth;
									this.resume();
								}, this.options.restartDelay);
							}
						} else {
							this.currentPosition -= pixelsPerFrame;
							if (this.currentPosition <= -(contentWidth / this.infinite)) {
								this.currentPosition += contentWidth / this.infinite;
							}
						}
						break;

					case "right":
						if (this.singleItemMode) {
							this.currentPosition += pixelsPerFrame;
							const items = this.content.querySelectorAll(`.${this.options.itemClass}`);

							if (this.currentPosition >= wrapperWidth) {
								this.pause();
								this.currentPosition = -contentWidth;
								this.currentItemIndex = (this.currentItemIndex + 1) % items.length;

								if (this.currentItemIndex === 0) {
									this.restartTimeout = setTimeout(() => {
										items.forEach((item, index) => {
											item.style.display = index === 0 ? "inline-block" : "none";
										});
										this.resume();
									}, this.options.restartDelay);
								} else {
									items.forEach((item, index) => {
										item.style.display = index === this.currentItemIndex ? "inline-block" : "none";
									});
									this.resume();
								}
							}
						} else if (this.noInfiniteScroll) {
							this.currentPosition += pixelsPerFrame;
							if (this.currentPosition >= wrapperWidth) {
								this.pause();
								this.restartTimeout = setTimeout(() => {
									this.currentPosition = -contentWidth;
									this.resume();
								}, this.options.restartDelay);
							}
						} else {
							this.currentPosition += pixelsPerFrame;
							if (this.currentPosition >= 0) {
								this.currentPosition -= contentWidth / this.infinite;
							}
						}
						break;

					case "up":
						this.currentPosition -= pixelsPerFrame;
						if (this.currentPosition <= -(contentHeight / this.infinite)) {
							if (this.noInfiniteScroll) {
								this.pause();
								this.restartTimeout = setTimeout(() => {
									this.currentPosition = this.wrapper.offsetHeight;
									this.resume();
								}, this.options.restartDelay);
							} else {
								this.currentPosition += contentHeight / this.infinite;
							}
						}
						break;

					case "down":
						this.currentPosition += pixelsPerFrame;
						if (this.currentPosition >= 0) {
							if (this.noInfiniteScroll) {
								this.pause();
								this.restartTimeout = setTimeout(() => {
									this.currentPosition = -contentHeight;
									this.resume();
								}, this.options.restartDelay);
							} else {
								this.currentPosition -= contentHeight / this.infinite;
							}
						}
						break;
				}

				const transform = this.options.direction === "left" || this.options.direction === "right" ? `translate3d(${this.currentPosition}px, 0, 0)` : `translate3d(0, ${this.currentPosition}px, 0)`;

				this.content.style.transform = transform;
				this.lastTimestamp = timestamp;
			}

			this.animationFrame = requestAnimationFrame(move);
		};

		this.lastFrameTime = now;
		move();
	}

	// 修改 resetPosition 方法
	resetPosition() {
		requestAnimationFrame(() => {
			this._setInitialPosition();
		});
	}
	// 新增輔助方法來設置實際位置
	_setInitialPosition() {
		// 添加一個小延遲確保內容完全渲染
		setTimeout(() => {
			const checkDimensions = () => {
				const contentWidth = this.content.getBoundingClientRect().width;
				const wrapperWidth = this.wrapper.getBoundingClientRect().width;

				if (contentWidth === 0) {
					requestAnimationFrame(checkDimensions);
					return;
				}

				switch (this.options.direction) {
					case "left":
						this.currentPosition = wrapperWidth;
						break;
					case "right":
						this.currentPosition = -contentWidth;
						break;
					case "up":
						this.currentPosition = this.wrapper.offsetHeight;
						break;
					case "down":
						this.currentPosition = -this.content.offsetHeight;
						break;
					default:
						this.currentPosition = 0;
				}

				const transform = this.options.direction === "left" || this.options.direction === "right" ? `translate3d(${this.currentPosition}px, 0, 0)` : `translate3d(0, ${this.currentPosition}px, 0)`;

				this.content.style.transform = transform;
			};

			requestAnimationFrame(checkDimensions);
		}, 50); // 50ms 的延遲通常足夠等待渲染完成
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
		if (this.options.pauseOnHover) {
			this.wrapper.addEventListener("mouseenter", this.handleMouseEnter);
			this.wrapper.addEventListener("mouseleave", this.handleMouseLeave);
		}

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

	pause() {
		if (this.restartTimeout) {
			clearTimeout(this.restartTimeout);
			this.restartTimeout = null;
		}
		this.isPaused = true;
		this.rafEnabled = false;
		this.pausedTimestamp = performance.now();
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
			this.animationFrame = null;
		}
	}

	resume() {
		if (this.restartTimeout) {
			clearTimeout(this.restartTimeout);
			this.restartTimeout = null;
		}
		if (!this.isPaused) return;
		this.isPaused = false;
		this.rafEnabled = true;
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
	// 新增方法：動態設置滑鼠暫停行為
	setPauseOnHover(enabled) {
		if (this.options.pauseOnHover === enabled) return;

		this.options.pauseOnHover = enabled;

		if (enabled) {
			this.wrapper.addEventListener("mouseenter", this.handleMouseEnter);
			this.wrapper.addEventListener("mouseleave", this.handleMouseLeave);
		} else {
			this.wrapper.removeEventListener("mouseenter", this.handleMouseEnter);
			this.wrapper.removeEventListener("mouseleave", this.handleMouseLeave);
			// 如果當前是因為滑鼠移入而暫停的，則恢復運行
			if (this.isPaused) {
				this.resume();
			}
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
		if (this.options.pauseOnHover) {
			this.wrapper.removeEventListener("mouseenter", this.handleMouseEnter);
			this.wrapper.removeEventListener("mouseleave", this.handleMouseLeave);
		}
		window.removeEventListener("resize", this.handleResize);
		document.removeEventListener("visibilitychange", this.handleVisibilityChange);

		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
		}

		if (this.restartTimeout) {
			clearTimeout(this.restartTimeout);
			this.restartTimeout = null;
		}

		this.container.innerHTML = "";
		this.isInitialized = false;
	}
}
