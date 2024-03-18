class ImageMap2D {
	constructor(e = {}) {
		const s = this._checkRequired(e);
		if (!s.value) throw s.message;
		const { frame: t, canvas: i, image: h, area: r, areaScale: l, plate: a, plateScale: o, wheelScale: f = !1, initX: m = 50, initY: w = 50, power: c = 0.25, scale: n = 1, limitCloseoutScale: g = 0.1, limitCloseupScale: v = 1.5, draggable: x = !0 } = e;
		(this.default = {
			limitCloseoutScale: g,
			limitCloseupScale: v,
			scale: n,
			initX: m,
			initY: w,
			power: c
		}),
			(this.power = c),
			(this.isFreeze = !1),
			(this.isActive = !1),
			(this.wheelScale = f),
			(this.draggable = x),
			(this.focus = {
				x: 0,
				y: 0,
				scale: n,
				width: 0,
				height: 0,
				xPercent: 50,
				yPercent: 50,
				xPercentMap: 50,
				yPercentMap: 50
			}),
			(this.map = {
				x: 0,
				y: 0,
				scale: n,
				width: 0,
				height: 0,
				xPercent: 50,
				yPercent: 50,
				xPercentMap: 50,
				yPercentMap: 50
			}),
			(this.mouse = {
				x: 0,
				y: 0
			}),
			(this.press = {
				isPress: !1,
				startFocusX: 0,
				startFocusY: 0,
				startPressX: 0,
				startPressY: 0,
				moveX: 0,
				moveY: 0
			}),
			(this.el = {
				frame: t || null,
				canvas: i,
				plate: a || r,
				plateScale: o || l,
				image: h
			});
		const p = this.el.frame ? this.el.frame.clientWidth : window.innerWidth,
			u = this.el.frame ? this.el.frame.clientHeight : window.innerHeight;
		(this.size = {
			width: p,
			height: u,
			cx: p / 2,
			cy: u / 2
		}),
			(this.events = {}),
			(this.subscribe = {}),
			(this.ctx = i.getContext("2d")),
			(this.resizeObserver = null);
	}
	_checkRequired(e) {
		const { canvas: s, image: t } = e,
			i = {
				value: !1,
				message: ""
			};
		return s instanceof HTMLCanvasElement ? (t instanceof HTMLImageElement ? ((i.value = !0), i) : ((i.message = "필수: 실행 옵션 객체 내 image에 이미지 객체를 전달해주세요. new ImageMap2D({image: HTMLImageElement})"), i)) : ((i.message = "필수: 실행 옵션 객체 내 canvas에 canvas DOM을 전달해주세요. new ImageMap2D({canvas: HTMLCanvasElement})"), i);
	}
	async _init() {
		await this._setupImage(), this._setupElement(), this._setupEvent();
	}
	_setupinitSize() {
		this._setSize(), this.setScale(this.focus.scale, !0), this.setFocusPercent(this.default.initX, this.default.initY, !0);
	}
	_readyImage() {
		return new Promise((e, s) => {
			this.el.image.complete && e(),
				(this.el.image.onload = () => {
					this.isActive ? e() : s();
				});
		});
	}
	async _setupImage() {
		await this._readyImage(), this._setupinitSize();
	}
	_setupElement() {
		this.el.plate && ((this.el.plate.style.willChange = "width, height, transform"), (this.el.plate.style.boxSizing = "border-box"), (this.el.plate.style.position = "absolute"), (this.el.plate.style.left = 0), (this.el.plate.style.top = 0), (this.el.plate.style.pointerEvents = "none"), (this.el.plate.style.zIndex = 2)), this.el.plateScale && ((this.el.plateScale.style.willChange = "transform"), (this.el.plateScale.style.boxSizing = "border-box"), (this.el.plateScale.style.position = "absolute"), (this.el.plateScale.style.left = 0), (this.el.plateScale.style.top = 0), (this.el.plateScale.style.pointerEvents = "none"), (this.el.plateScale.style.width = `${this.el.image.width}px`), (this.el.plateScale.style.height = `${this.el.image.height}px`), (this.el.plateScale.style.transformOrigin = "0 0"), (this.el.plate.style.zIndex = 1));
	}
	_setupEvent() {
		(this.events.resize = () => {
			this.eventFire("resize"), this._setSize(), this.setFocusMapPercent(focus.xPercentMap, focus.yPercentMap), this.setScale(this.focus.scale, !0), this._drawMap(!0);
		}),
			(this.events.mousewheel = (e) => {
				if (this.isFreeze || !this.wheelScale) return;
				e.preventDefault(), e.deltaY > 0 ? this.focus.scale > this.default.limitCloseoutScale && this.setScale(Math.max(this.focus.scale - this.wheelScale, this.default.limitCloseoutScale)) : this.focus.scale < this.default.limitCloseupScale && this.setScale(Math.min(this.focus.scale + this.wheelScale, this.default.limitCloseupScale)), this.setFocus();
			}),
			(this.events.mousedown = (e) => {
				this._pressDown(e.clientX, e.clientY, e);
			}),
			(this.events.mousemove = (e) => {
				this._pressMove(e.clientX, e.clientY);
			}),
			(this.events.mouseup = () => {
				this._pressUp();
			}),
			(this.events.touchstart = (e) => {
				this._pressDown(e.touches[0].clientX, e.touches[0].clientY);
			}),
			(this.events.touchmove = (e) => {
				this._pressMove(e.touches[0].clientX, e.touches[0].clientY);
			}),
			(this.events.touchend = () => {
				this._pressUp();
			});
	}
	_pressDown(e, s, t) {
		if (this.isFreeze || !this.draggable) return;
		const i = t.composedPath();
		if (!this.el.frame) {
			for (let r = 0, l = i.length; r < l && !(i[r] === this.el.canvas || i[r] === this.el.plate); ++r) if (r === i.length - 1) return;
		}
		this.eventFire("pressDownBefore", i) !== !1 && ((this.press.isPress = !0), (this.press.startPressX = e), (this.press.startPressY = s), (this.press.startFocusX = this.focus.x), (this.press.startFocusY = this.focus.y), this.eventFire("pressDown", this.press));
	}
	_pressMove(e, s) {
		if (!this.press.isPress || this.isFreeze) return;
		(this.press.moveX = e), (this.press.moveY = s);
		const t = this.press.moveX - this.press.startPressX,
			i = this.press.moveY - this.press.startPressY,
			h = this.press.startFocusX - t,
			r = this.press.startFocusY - i;
		this.eventFire("pressMove", {
			dx: t,
			dy: i
		}),
			this.setFocus(h, r);
	}
	_pressUp() {
		this.press.isPress && ((this.press.isPress = !1), (this.press.moveX = 0), (this.press.moveY = 0), (this.press.startFocusX = 0), (this.press.startFocusY = 0), this.eventFire("pressUp"));
	}
	_perRound(e) {
		return Math.round(e * 1e3) / 10;
	}
	_drawMap(e) {
		const s = {
			x: this.focus.x - this.map.x,
			y: this.focus.y - this.map.y,
			scale: this.focus.scale - this.map.scale
		};
		if (s.x + s.y + s.scale !== 0 || e) {
			const i = Math.abs(s.x) < 1e-4 ? this.focus.x : this.map.x + s.x * this.power,
				h = Math.abs(s.y) < 1e-4 ? this.focus.y : this.map.y + s.y * this.power,
				r = Math.abs(s.scale) < 1e-6 ? this.focus.scale : this.map.scale + s.scale * this.power;
			(this.map.x = i), (this.map.y = h), s.scale !== 0 && (this.map.scale = r), (this.map.width = this.el.image.width * this.map.scale), (this.map.height = this.el.image.height * this.map.scale), this.eventFire("draw");
		} else return;
		this.el.plate && ((this.el.plate.style.transform = `translate3d(${-this.map.x}px,${-this.map.y}px,0)`), (this.el.plate.style.width = `${this.map.width}px`), (this.el.plate.style.height = `${this.map.height}px`)), this.el.plateScale && (this.el.plateScale.style.transform = `translate3d(-${this.map.x}px,-${this.map.y}px,0) scale(${this.map.scale})`), this.ctx.drawImage(this.el.image, -this.map.x, -this.map.y, this.map.width, this.map.height);
	}
	_render() {
		this.isActive && (this._drawMap(), requestAnimationFrame(this._render.bind(this)));
	}
	on(e, s, t = {}) {
		typeof e == "string" &&
			typeof s == "function" &&
			(this.subscribe[e] || (this.subscribe[e] = []),
			this.subscribe[e].push({
				fn: s,
				options: t
			}));
	}
	eventFire(e, s) {
		let t = null;
		return (
			this.subscribe[e] &&
				this.subscribe[e].forEach((i, h) => {
					(t = i.fn(this, s)), i.options.once && this.subscribe[e].splice(h, 1);
				}),
			t
		);
	}
	setFocus(e = this.focus.x, s = this.focus.y, t = !1) {
		const i = this.focus.width - e - this.size.width < 0,
			h = this.focus.height - s - this.size.height < 0,
			r = this.focus.width - this.size.width - 1,
			l = this.focus.height - this.size.height - 1,
			a = Math.round(e <= 0 ? 0 : i ? r : e),
			o = Math.round(s <= 0 ? 0 : h ? l : s);
		(this.focus.x = a), (this.focus.y = o), t && ((this.map.x = a), (this.map.y = o)), (this.focus.xPercent = this._perRound(this.focus.x / (this.focus.width - this.size.width))), (this.focus.yPercent = this._perRound(this.focus.y / (this.focus.height - this.size.height))), (this.focus.xPercentMap = this._perRound((this.focus.x + this.size.cx) / this.focus.width)), (this.focus.yPercentMap = this._perRound((this.focus.y + this.size.cy) / this.focus.height));
	}
	setFocusPercent(e = this.focus.xPercent, s = this.focus.yPercent, t = !1) {
		const i = ((this.focus.width - this.size.width) / 100) * e,
			h = ((this.focus.height - this.size.height) / 100) * s;
		this.setFocus(i, h, t);
	}
	setFocusMapPercent(e = this.focus.xPercentMap, s = this.focus.yPercentMap, t = !1) {
		const i = (this.focus.width / 100) * e - this.size.cx,
			h = (this.focus.height / 100) * s - this.size.cy;
		this.setFocus(i, h, t);
	}
	setPower(e = this.default.power) {
		this.power = e;
	}
	_setSize() {
		const s = this.el.frame ? this.el.frame.clientWidth : window.innerWidth,
			t = this.el.frame ? this.el.frame.clientHeight : window.innerHeight;
		(this.size.width = s * 1), (this.size.height = t * 1), (this.size.cx = s / 2), (this.size.cy = t / 2), (this.el.canvas.width = this.size.width), (this.el.canvas.height = this.size.height);
	}
	setScale(e = this.default.scale, s = !1) {
		e = e <= 0.001 ? 0.001 : e;
		const t = {
			x: (1 / this.focus.scale) * this.focus.x,
			y: (1 / this.focus.scale) * this.focus.y
		};
		(t.x = t.x - (this.size.cx - (1 / this.focus.scale) * this.size.cx)), (t.y = t.y - (this.size.cy - (1 / this.focus.scale) * this.size.cy)), this.el.image.width * e < this.size.width && (e = (this.size.width + 1) / this.el.image.width), this.el.image.height * e < this.size.height && (e = (this.size.height + 1) / this.el.image.height), (this.focus.scale = e), (this.focus.width = this.el.image.width * e), (this.focus.height = this.el.image.height * e), s && ((this.map.scale = e), (this.map.width = this.focus.width), (this.map.height = this.focus.height));
		const i = (t.x - this.size.cx / e) * e + this.size.cx * e,
			h = (t.y - this.size.cy / e) * e + this.size.cy * e;
		this.setFocus(i, h, s), this.eventFire("changeScale");
	}
	disable() {
		this.isFreeze = !0;
	}
	enable() {
		this.isFreeze = !1;
	}
	async create() {
		if (this.isActive) return;
		(this.isActive = !0), await this._init();
		const e = this.el.frame || window;
		return (
			e.addEventListener(
				"wheel",
				(s) => {
					this.events.mousewheel(s);
				},
				{
					passive: !1
				}
			),
			e.addEventListener("pointerdown", this.events.mousedown),
			e.addEventListener("dragstart", (s) => {
				s.preventDefault();
			}),
			window.addEventListener("pointermove", this.events.mousemove),
			window.addEventListener("pointerup", this.events.mouseup),
			this.el.frame
				? ((this.resizeObserver = new ResizeObserver((s) => {
						s.forEach(() => {
							this.events.resize();
						});
				  })),
				  this.resizeObserver.observe(this.el.frame))
				: window.addEventListener("resize", this.events.resize),
			this._render(),
			this.ctx.drawImage(this.el.image, -this.map.x, -this.map.y, this.map.width, this.map.height),
			this
		);
	}
	destroy() {
		this.isActive = !1;
		const e = this.el.frame || window;
		return e.removeEventListener("wheel", this.events.mousewheel), e.removeEventListener("pointerdown", this.events.mousedown), window.removeEventListener("pointermove", this.events.mousemove), window.removeEventListener("pointerup", this.events.mouseup), this.resizeObserver ? this.resizeObserver.unobserve(this.el.frame) : window.removeEventListener("resize", this.events.resize), this;
	}
}

export default ImageMap2D;
