import { MessageLB, Notice, Warning, SelectNot, SelectPlundered, SelectPlunderSuccess, SelectPlunderFailed, SelectCreate, SelectCreated, PreProtect, PreCD, PlunderSuccess, Plundered, PlunderFailed } from "./lightbox.js";
import navBar from "./components/navBar.js";
import top from "./components/top.js";
import entrance from "./pages/entrance.js";
import selected from "./pages/selected.js";
import create from "./pages/create.js";
import plunder from "./pages/plunder.js";
import pinia from "./pinia.js";
import useEventStore from "./store.js";

// SelectPlunderFailed();
// MessageLB("MessageLB");

const { storeToRefs } = Pinia;

let app = Vue.createApp({
	components: {
		"nav-bar": navBar,
		top,
		entrance,
		selected,
		plunder,
		create
	},
	setup() {
		const store = useEventStore();
		let token = Vue.ref("");
		let currentPage = Vue.ref("create");
		function getAndRemoveOTT() {
			// 假設當前URL是 https://warsofprasia.beanfun.com/login/galaxyCallback?OTT=...
			// 首先，創建一個URL對象
			const currentUrl = new URL(window.location.href);

			// 使用URLSearchParams獲取查詢參數
			const searchParams = currentUrl.searchParams;

			// 獲取OTT參數
			const ottValue = searchParams.get("OTT");
			console.log("OTT Value:", ottValue);

			// 刪除OTT參數
			searchParams.delete("OTT");

			// 更新瀏覽器的URL，但不重新加載頁面
			window.history.pushState({}, "", currentUrl);

			// 返回OTT參數值
			return ottValue;
		}
		Vue.watch(storeToRefs(store).currentPage, (val) => {
			currentPage.value = val;
		});
		Vue.onMounted(() => {
			getAndRemoveOTT();
		});
		return { currentPage };
	}
});

app.use(pinia);
app.mount("#app");
