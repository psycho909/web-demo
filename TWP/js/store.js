const { defineStore, storeToRefs } = Pinia;

const useEventStore = defineStore("event", {
	state: () => ({
		currentPage: "entrance"
	}),
	actions: {
		setCurrentPage(page) {
			this.currentPage = page;
		}
	}
});

export default useEventStore;
