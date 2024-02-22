const { defineStore, storeToRefs } = Pinia;

export const useCounterStore = defineStore("counter", {
	state: () => ({
		count: 0
	}),
	actions: {
		increment() {
			this.count++;
		}
	}
});
