const { defineStore, storeToRefs } = Pinia;

const useEventStore = defineStore("event", {
	state: () => ({
		currentPage: "entrance",
		CharacterName: "",
		titleData: [
			{
				TitleName: "稱號1",
				TitleLevel: 0,
				Seq: 0
			},
			{
				TitleName: "稱號2",
				TitleLevel: 0,
				Seq: 1
			}
		]
	}),
	actions: {
		setData(data) {
			this.CharacterName = data.CharacterName;
			this.titleData = [...this.titleData, data.titleData];
		},
		setCurrentPage(page) {
			this.currentPage = page;
		},
		setTitleList(data) {
			if (this.titleData.length < 3) {
				this.titleData = [...this.titleData, data];
			}
		},
		removeTitle(Seq) {
			this.titleData = this.titleData.filter((title) => title.Seq !== Seq);
		}
	}
});

export default useEventStore;
