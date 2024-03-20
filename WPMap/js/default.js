import territory from "./components/territory.js";
import mainTerritory from "./components/mainTerritory.js";
import pagination from "./components/pagination.js";
let app = Vue.createApp({
	components: {
		territory,
		mainTerritory,
		pagination
	}
});

app.mount("#app");
