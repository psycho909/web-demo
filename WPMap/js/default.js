import territory from "./components/territory.js";
import mainTerritory from "./components/mainTerritory.js";
import pagination from "./components/pagination.js";
import pagination2 from "./components/pagination2.js";
import records from "./components/records.js";
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
		let data = Vue.ref([]);
		const currentPage = Vue.ref(1);

		const handlePageUpdate = (newPage) => {
			currentPage.value = newPage;
			// You can perform additional actions here, e.g., fetching data for the new page
			console.log(`The current page is now: ${newPage}`);
		};
		const random = () => {
			// 隨機亂數1~200
			let num = Math.floor(Math.random() * 200) + 1;
			fetch(`https://randomuser.me/api/?results=${num}`)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					data.value = json.results;
					console.log(data.value.length);
				});
		};
		return {
			currentPage,
			handlePageUpdate,
			random,
			data
		};
	}
});

app.mount("#app");
