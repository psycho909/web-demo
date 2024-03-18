import ImageMap2D from "./mapCanvas.js";
import worldData from "./worldData.js";
import territoryData from "./territoryData.js";

import territory from "./components/territory.js";
import mainTerritory from "./components/mainTerritory.js";
let app = Vue.createApp({
	components: {
		territory,
		mainTerritory
	}
});

app.mount("#app");
