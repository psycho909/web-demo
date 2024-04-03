import { Notice, MessageLB, PlunderSuccess } from "../lightbox.js";
import { UpdateTitleLog } from "../api.js";
import useEventStore from "../store.js";
const ItemList = [
	{
		title: "稱號1",
		description: "稱號1的描述",
		icon: "稱號1的圖示",
		id: "稱號1的ID"
	},
	{
		title: "稱號2",
		description: "稱號2的描述",
		icon: "稱號2的圖示",
		id: "稱號2的ID"
	},
	{
		title: "稱號3",
		description: "稱號3的描述",
		icon: "稱號3的圖示",
		id: "稱號3的ID"
	},
	{
		title: "稱號4",
		description: "稱號4的描述",
		icon: "稱號4的圖示",
		id: "稱號4的ID"
	},
	{
		title: "稱號5",
		description: "稱號5的描述",
		icon: "稱號5的圖示",
		id: "稱號5的ID"
	},
	{
		title: "稱號6",
		description: "稱號6的描述",
		icon: "稱號6的圖示",
		id: "稱號6的ID"
	},
	{
		title: "稱號7",
		description: "稱號7的描述",
		icon: "稱號7的圖示",
		id: "稱號7的ID"
	},
	{
		title: "稱號8",
		description: "稱號8的描述",
		icon: "稱號8的圖示",
		id: "稱號8的ID"
	},
	{
		title: "稱號9",
		description: "稱號9的描述",
		icon: "稱號9的圖示",
		id: "稱號9的ID"
	},
	{
		title: "稱號10",
		description: "稱號10的描述",
		icon: "稱號10的圖示",
		id: "稱號10的ID"
	}
];
const plunder = {
	setup() {
		const store = useEventStore();
		let api = Vue.ref(false);
		const selected = Vue.ref(null);
		// 稱號選擇後的操作
		const titleSubmit = () => {
			if (selected.value == null) {
				return;
			}
			// 打API成功後執行
			// 刪掉之前default的項目
			// 進入下一頁
			let data = ItemList.find((item) => item.id == selected.value);
			// UpdateTitleLog().then((res)=>{
			// 	let {code,message,data,Listdata,url}=res.data
			// 	if(code == -1){
			// 		MessageLB(message);
			// 		return;
			// 	}
			// 	if(code == -2){
			// 		MessageLB(message,url);
			// 		return;
			// 	}
			// })
			PlunderSuccess();
			store.setTitleList(data);
			store.setCurrentPage("create");
		};

		// 默認選擇第一個項目並執行操作
		function defaultSelect() {
			let Item;
			Item = ItemList[0];
			localStorage.setItem("selectedItemId", JSON.stringify(Item));
		}
		Vue.onMounted(() => {
			selected.value = ItemList[0].id;
			// 進入頁面時執行
			// defaultSelect();
		});
		window.addEventListener("beforeunload", (event) => {
			// 關閉或重新整理時執行
			// defaultSelect();
		});
		Vue.onUnmounted(() => {
			// 離開頁面時執行
			// window.removeEventListener("beforeunload", defaultSelect);
		});
		return { Notice, selected, titleSubmit, ItemList };
	},
	template: `
		<div class="plunder-content">
			<div class="plunder-title">掠奪角色名稱</div>
			<div class="plunder-chosen">
				<a href="javascript:;" class="plunder-chosen__btn-submit" @click="titleSubmit">檢查名稱</a>
			</div>
			<div class="plunder-names">
				<div class="plunder-names__title">推薦名稱</div>
				<div class="plunder-names__list">
					<label class="plunder-names__label" v-for="i in ItemList">
						<input type="radio" name="title" :value="i.id" v-model="selected"  />
						<span class="plunder-names__item">{{i.title}}</span>
					</label>
				</div>
				<span class="plunder-names__error">請選擇一個天命進行召喚</span>
			</div>
			<a href="javascript:;" class="plunder-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default plunder;
