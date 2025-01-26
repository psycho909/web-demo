import page1 from "./components/page1.js";

// 避免JSON快取的Fetch方法
function fetchNonCachedJSON(url) {
	// 使用時間戳動態產生唯一查詢參數
	const nonCachedUrl = `${url}?_=${new Date().getTime()}`;

	return fetch(nonCachedUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("成功載入最新JSON資料");
			return data;
		})
		.catch((error) => {
			console.error("獲取JSON時發生錯誤:", error);
		});
}

// 使用範例
// fetchNonCachedJSON("data.json").then((data) => {
// 	// 處理載入的資料
// 	console.log(data);
// });
// vue3
let app = Vue.createApp({
	components: {
		page1: page1
	},
	setup() {
		let data = Vue.ref(null);
		let fetchData = async () => {
			data.value = await fetchNonCachedJSON("data.json");
		};
		Vue.onMounted(() => {
			fetchData();
		});
		return {
			data
		};
	}
});
app.mount("#app");
