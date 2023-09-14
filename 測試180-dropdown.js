import "./測試180-button.js";

const template = document.createElement("template");
template.innerHTML = `
<div class="dropdown">
    <span class="label">Label</span>
    <my-button></my-button>
    <div class="dropdown-list-container">
        <ul class="dropdown-list"></ul>
    </div>
</div>
`;

class Dropdown extends HTMLElement {
	constructor() {
		super();

		this._ropdownRoot = this.attachShadow({ mode: "open" });
		this._ropdownRoot.appendChild(template.content.cloneNode(true));

		this.$label = this._ropdownRoot.querySelector(".label");
		this.$button = this._ropdownRoot.querySelector("my-button");
		this.$dropdown = this._ropdownRoot.querySelector(".dropdown");
		this.$dropdownList = this._ropdownRoot.querySelector(".dropdown-list");
	}

	static get observedAttributes() {
		return ["label", "option", "options"];
	}

	get label() {
		return this.getAttribute("label");
	}

	set label(value) {
		this.setAttribute("label", value);
	}

	get option() {
		return this.getAttribute("option");
	}

	set option(value) {
		this.setAttribute("option", value);
	}

	get options() {
		return JSON.parse(this.getAttribute("options"));
	}

	set options(value) {
		this.setAttribute("options", JSON.stringify(value));
	}

	attributeChangeCallback(name, oldVal, newVal) {
		this.render();
	}

	render() {
		if (!Array.isArray(this.options)) {
			console.warn("Options must be an array...");
			return;
		}

		this.$label.innerHTML = this.label;
		this.$button.setAttribute("text", this.options.find((item) => item.value === parseInt(this.option) || (this.options && this.options[0])).label);
	}
}

customElements.define("web-dropdown", Dropdown);
