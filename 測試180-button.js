const template = document.createElement("template");

template.innerHTML = `
<style>
    .container {
        padding: 8px;
    }

    button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
    }
</style>
<div class="container">
    <button>default text</button>
</div>
`;

class Button extends HTMLElement {
	constructor() {
		super();
		// 開啟影子節點
		this._shadowRoot = this.attachShadow({ mode: "open" });
		// 插入模板消息
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		// 獲取模板節點
		this.$button = this._shadowRoot.querySelector("button");
		this.$button.addEventListener("click", () => {
			this.dispatchEvent(
				new CustomEvent("onCustomClick", {
					detail: "被點擊了"
				})
			);
		});
	}
	// 必寫 元素插入到文檔的操作
	connectedCallback() {}
	// 元素從文檔中移除時的操作
	disconnectedCallback() {}
	static get observedAttributes() {
		return ["text"];
	}

	get text() {
		return this.getAttribute("text");
	}

	set text(value) {
		this.setAttribute("text", value);
	}

	render() {
		this.$button.innerHTML = this.text;
	}
	// 監聽屬性變化的操作
	attributeChangedCallback(name, oldVal, newVal) {
		this.render();
	}
}
customElements.define("my-button", Button);
