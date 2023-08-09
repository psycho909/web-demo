// import { createStore } from "./測試175-redux.js";
// 弹出框使用 Redux
import { LBRule } from "./測試175-lbbox.js";
// 初始状态
const initialState = {
	count: 0
};

// Reducer 函数
const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INCREMENT":
			return { ...state, count: state.count + 1 };
		case "DECREMENT":
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};

const store = Redux.createStore(counterReducer, initialState);
const valueEl = document.getElementById("value");

function render() {
	valueEl.innerHTML = store.getState().count.toString();
}

render();
store.subscribe(() => {
	console.log(store.getState());
	valueEl.innerHTML = store.getState().count.toString();
});

document.getElementById("increment").addEventListener("click", function () {
	store.dispatch({ type: "INCREMENT" });
});

document.getElementById("decrement").addEventListener("click", function () {
	store.dispatch({ type: "DECREMENT" });
});

document.getElementById("openLBBox").addEventListener("click", function () {
	LBRule(store);
});
