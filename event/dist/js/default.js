import sec1 from "./components/sec1.js";
import sec2 from "./components/sec2.js";
import sec3 from "./components/sec3.js";
import store from "./store/index.js";

// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}
const { createApp } = Vue;
const app = createApp({
	components: {
		sec1,
		sec2,
		sec3,
	},
	data() {
		return {};
	},
});
app.use(store);
app.mount("#app");
