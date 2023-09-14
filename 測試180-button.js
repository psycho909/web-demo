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
		this._shadowRoot = this.attachShadow({ mode: "open" });
		this._shadowRoot.appendChild(template.content.cloneNode(true));

		this.$button = this._shadowRoot.querySelector("button");
		this.$button.addEventListener("click", () => {
			this.dispatchEvent(
				new CustomEvent("onCustomClick", {
					detail: "被點擊了"
				})
			);
		});
	}

	connectedCallback() {}
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
	attributeChangedCallback(name, oldVal, newVal) {
		this.render();
	}
}
customElements.define("my-button", Button);
