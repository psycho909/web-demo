import { h, render } from "https://esm.sh/preact";
import htm from "https://esm.sh/htm";

// Initialize htm with Preact
const html = htm.bind(h);

function TodoItems() {
	html`<li>A</li>
		<li>B</li>
		<li>C</li>`;
}
export default TodoItems;
