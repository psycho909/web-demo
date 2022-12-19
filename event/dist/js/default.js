import sec1 from "./components/sec1.js";
import sec2 from "./components/sec2.js";
import sec3 from "./components/sec3.js";
import lightbox from "./components/GLightbox.js";
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
		lightbox,
	},
	setup() {
		const store = Vuex.useStore();
		let loginLB = Vue.ref(false);
		let messageText = Vue.ref("");
		let messageLB = Vue.ref(false);
		Vue.watchEffect(() => {
			if (store.state.login) {
				loginLB.value = true;
			} else {
				loginLB.value = false;
			}
			if (store.state.messageLB) {
				messageLB.value = true;
				messageText.value = store.state.message;
			} else {
				messageLB.value = false;
				messageText.value = "";
			}
		});

		let onConfirm = () => {
			store.commit("toggleLogin");
		};
		let onCancel = () => {
			store.commit("toggleLogin");
		};
		return {
			loginLB,
			onConfirm,
			messageText,
			messageLB,
			onCancel,
		};
	},
	data() {
		return {};
	},
});
app.use(store);
app.mount("#app");
