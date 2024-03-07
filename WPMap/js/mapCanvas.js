class ImageMap2D {
	constructor(options = {}) {
		const { frame = null, canvas, image, area, areaScale, plate, plateScale, wheelScale = false, initX = 50, initY = 50, power = 0.25, scale = 1, limitCloseoutScale = 0.1, limitCloseupScale = 1.5, draggable = true } = options;

		this._validateRequiredOptions(canvas, image);

		this.settings = {
			limitCloseoutScale,
			limitCloseupScale,
			scale,
			initX,
			initY,
			power,
			draggable,
			wheelScale
		};

		this.elements = {
			frame,
			canvas,
			image,
			area,
			plate,
			plateScale
		};

		this.state = {
			isFrozen: false,
			isActive: false,
			focus: {
				x: 0,
				y: 0,
				scale: scale
			},
			press: {
				isPressed: false,
				startX: 0,
				startY: 0
			}
		};

		this._init();
	}

	_validateRequiredOptions(canvas, image) {
		if (!(canvas instanceof HTMLCanvasElement)) {
			throw new Error("Canvas element is required.");
		}
		if (!(image instanceof HTMLImageElement)) {
			throw new Error("Image element is required.");
		}
	}

	async _init() {
		await this._setupImage();
		this._setupElements();
		this._setupEvents();
		console.log("end");
	}
	_setSize() {
		const s = this.elements.frame ? this.elements.frame.clientWidth : window.innerWidth,
			t = this.elements.frame ? this.elements.frame.clientHeight : window.innerHeight;
		this.size = {
			width: s,
			height: t,
			cx: s / 2,
			cy: t / 2
		};
		this.elements.canvas.width = this.size.width;
		this.elements.canvas.height = this.size.height;
	}
	setScale(scale = this.settings.scale, updateFocus = false) {
		// 确保缩放比例至少为0.001
		scale = Math.max(0.001, scale);

		// 计算相对于当前缩放的焦点坐标
		let scaledX = (1 / this.state.focus.scale) * this.state.focus.x;
		let scaledY = (1 / this.state.focus.scale) * this.state.focus.y;

		// 调整焦点坐标，使其基于新的缩放中心
		scaledX -= this.size.cx - (1 / this.state.focus.scale) * this.size.cx;
		scaledY -= this.size.cy - (1 / this.state.focus.scale) * this.size.cy;

		// 确保图像在新的缩放级别下覆盖整个可视区域
		if (this.elements.image.width * scale < this.size.width) {
			scale = (this.size.width + 1) / this.elements.image.width;
		}
		if (this.elements.image.height * scale < this.size.height) {
			scale = (this.size.height + 1) / this.elements.image.height;
		}

		// 更新焦点缩放和尺寸
		this.state.focus.scale = scale;
		this.state.focus.width = this.elements.image.width * scale;
		this.state.focus.height = this.elements.image.height * scale;

		if (updateFocus) {
			const focusX = scaledX * scale + this.size.cx * scale;
			const focusY = scaledY * scale + this.size.cy * scale;
			// 更新焦点位置
			this.setFocus(focusX, focusY, true);
		}

		// 触发缩放变化事件
		this.eventFire("changeScale");
	}
	_setupInitSize() {
		this._setSize();
		this.setScale(this.settings.scale, true);
		this.setFocusPercent(this.settings.initX, this.settings.initY, true);
	}
	setFocusPercent(e = this.focus.xPercent, s = this.focus.yPercent, t = !1) {
		const i = ((this.focus.width - this.size.width) / 100) * e,
			h = ((this.focus.height - this.size.height) / 100) * s;
		this.setFocus(i, h, t);
	}
	_readyImage() {
		return new Promise((resolve, reject) => {
			if (this.elements.image.complete && this.elements.image.naturalHeight !== 0) {
				resolve();
			} else {
				this.elements.image.onload = () => {
					resolve();
				};
				this.elements.image.onerror = () => {
					reject(new Error("Failed to load image."));
				};
			}
		});
	}
	async _setupImage() {
		await this._readyImage();
		this._setupInitSize();
		// return new Promise((resolve, reject) => {
		// 	if (this.elements.image.complete && this.elements.image.naturalHeight !== 0) {
		// 		console.log("image loaded");
		// 		resolve();
		// 	} else {
		// 		this.elements.image.onload = () => resolve();
		// 		this.elements.image.onerror = reject;
		// 	}
		// });
	}

	_setupElements() {
		const { plate, plateScale } = this.elements;
		[plate, plateScale].forEach((el) => {
			if (el) {
				Object.assign(el.style, {
					willChange: "width, height, transform",
					boxSizing: "border-box",
					position: "absolute",
					left: "0",
					top: "0",
					pointerEvents: "none"
				});
			}
		});
		if (plate) plate.style.zIndex = "2";
		if (plateScale) {
			Object.assign(plateScale.style, {
				transformOrigin: "0 0",
				zIndex: "1",
				width: `${this.elements.image.width}px`,
				height: `${this.elements.image.height}px`
			});
		}
	}

	_setupEvents() {
		const { canvas } = this.elements;
		canvas.addEventListener("mousedown", this._handleMouseDown.bind(this));
		window.addEventListener("mouseup", this._handleMouseUp.bind(this));
		window.addEventListener("mousemove", this._handleMouseMove.bind(this));
		// Add other event listeners as needed
	}
	setFocus(x = this.state.focus.x, y = this.state.focus.y, updateMap = false) {
		// 确保焦点坐标不会导致图像超出可视区域
		const isXOutOfBounds = this.state.focus.width - x - this.size.width < 0;
		const isYOutOfBounds = this.state.focus.height - y - this.size.height < 0;

		const maxX = this.state.focus.width - this.size.width - 1;
		const maxY = this.state.focus.height - this.size.height - 1;

		// 计算并修正焦点坐标，确保它们在有效范围内
		const correctedX = Math.round(x <= 0 ? 0 : isXOutOfBounds ? maxX : x);
		const correctedY = Math.round(y <= 0 ? 0 : isYOutOfBounds ? maxY : y);

		// 更新焦点坐标
		this.state.focus.x = correctedX;
		this.state.focus.y = correctedY;

		if (updateMap) {
			// 如果需要，同时更新地图（或视图）的坐标
			this.state.map.x = correctedX;
			this.state.map.y = correctedY;
		}

		// 更新焦点位置的百分比，用于可能的进一步计算或界面更新
		const widthAvailable = this.state.focus.width - this.size.width;
		const heightAvailable = this.state.focus.height - this.size.height;

		this.state.focus.xPercent = this._perRound((correctedX / widthAvailable) * 100);
		this.state.focus.yPercent = this._perRound((correctedY / heightAvailable) * 100);

		// 计算焦点相对于图像宽度和高度的百分比位置
		this.state.focus.xPercentMap = this._perRound(((correctedX + this.size.cx) / this.state.focus.width) * 100);
		this.state.focus.yPercentMap = this._perRound(((correctedY + this.size.cy) / this.state.focus.height) * 100);
	}

	_perRound(value) {
		// 将值四舍五入到最接近的小数点后两位
		return Math.round(value * 100) / 100;
	}

	_handleMouseDown(event) {
		// Implementation for mouse down event
		this.state.press.isPressed = true;
		this.state.press.startX = event.clientX;
		this.state.press.startY = event.clientY;
	}

	_handleMouseUp(event) {
		// Implementation for mouse up event
		this.state.press.isPressed = false;
	}

	_handleMouseMove(event) {
		// Implementation for mouse move event
		if (this.state.press.isPressed) {
			// Update focus based on mouse movement
			// Placeholder logic
			let dx = event.clientX - this.state.press.startX;
			let dy = event.clientY - this.state.press.startY;

			this._updateFocus(dx, dy);
		}
	}

	_updateFocus(dx, dy) {
		// Placeholder logic for updating focus
		// Implement actual logic for updating focus position
		console.log(`Move focus by dx: ${dx}, dy: ${dy}`);
	}
}

export default ImageMap2D;
