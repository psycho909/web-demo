import { MessageLB, Notice, Warning, SelectNot, SelectPlundered, SelectPlunderSuccess, SelectPlunderFailed, SelectCreate, SelectCreated, PreProtect, PreCD, PlunderSuccess, Plundered, PlunderFailed } from "./lightbox.js";
import navBar from "./components/navBar.js";
import top from "./components/top.js";
import entrance from "./pages/entrance.js";
import login from "./pages/login.js";
import selected from "./pages/selected.js";

// MessageLB("MessageLB");
let app = Vue.createApp({
	components: {
		"nav-bar": navBar,
		top,
		entrance,
		login,
		selected
	},
	setup() {
		// const store = useEventStore();
		let token = Vue.ref("");
		Vue.onMounted(() => {});
		return {};
	}
});
app.mount("#app");
