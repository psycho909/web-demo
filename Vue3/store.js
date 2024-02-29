const { defineStore, storeToRefs } = Pinia;

export const useCounterStore = defineStore("counter", {
	state: () => ({
		count: 0
	}),
	actions: {
		increment() {
			this.count++;
		},
		decrement() {
			this.count--;
		},
		promiseFun() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(1);
				}, 3000);
			});
		}
	}
});
