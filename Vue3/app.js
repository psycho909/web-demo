import { MessageLB } from "./lightbox.js";
import { useCounterStore } from "./store.js";
const pinia = Pinia.createPinia();
const { storeToRefs } = Pinia;
const app = Vue.createApp({
	setup() {
		const store = useCounterStore();
		const { count } = storeToRefs(store);
		const increment = async () => {
			await store.promiseFun();
			console.log("first");
			store.increment();
			MessageLB(21312321);
			// setTimeout(() => {
			// 	location.href = "https://www.google.com";
			// }, 0);
		};
		const decrement = () => {
			store.decrement();
		};
		return {
			count,
			increment,
			decrement
		};
	},
	data() {
		return {
			message: "Hello Vue3"
		};
	}
});
app.use(pinia);
app.mount("#app");
