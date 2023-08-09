export function LBRule(store) {
	var config = {
		addClass: "default lb-rule",
		titleBar: "報名方式與規則",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
    <p>
      Clicked: <span id="value2">0</span> times
      <button id="increment2">+</button>
      <button id="decrement2">-</button>
    </p>
  `;

	$.gbox.open(HTML, config);

	const valueEl2 = document.getElementById("value2");
	const incrementBtn = document.getElementById("increment2");
	const decrementBtn = document.getElementById("decrement2");

	function render() {
		valueEl2.innerHTML = store.getState().count.toString();
	}

	render();
	store.subscribe(render);

	incrementBtn.addEventListener("click", function () {
		store.dispatch({ type: "INCREMENT" });
	});

	decrementBtn.addEventListener("click", function () {
		store.dispatch({ type: "DECREMENT" });
	});
}
