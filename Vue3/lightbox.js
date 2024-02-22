import { useCounterStore } from "./store.js";
export function MessageLB(msg, url, callback) {
	const store = useCounterStore();
	console.log(store.count);
	$.gbox.open(msg, {
		addClass: "default",
		afterOpen: function () {
			store.increment();
		},
		hasCloseBtn: true,
		hasActionBtn: false
	});
}
