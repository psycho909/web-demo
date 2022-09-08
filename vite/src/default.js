import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/default.scss";
import Gbox from "./components/Gbox.vue";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.component("Gbox", Gbox);
app.directive("reload", (el, binding) => {
	if (binding.oldValue !== binding.value) {
		el.load();
	}
});
app.mount("#app");
