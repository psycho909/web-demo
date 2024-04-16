import territory from "./pages/territory.js";
import mainTerritory from "./pages/mainTerritory.js";
import pagination from "./components/pagination.js";
import pagination2 from "./components/pagination2.js";
import records from "./pages/records.js";
// import data from "./components/test.js";
let app = Vue.createApp({
	components: {
		territory,
		mainTerritory,
		pagination,
		pagination2,
		records
	},
	setup() {
		const currentPage = Vue.ref(1);

		const handlePageUpdate = (newPage) => {
			currentPage.value = newPage;
			// You can perform additional actions here, e.g., fetching data for the new page
			console.log(`The current page is now: ${newPage}`);
		};
		return {
			currentPage,
			handlePageUpdate
		};
	}
});

app.mount("#app");
