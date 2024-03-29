import { Notice, MessageLB } from "../lightbox.js";
import useEventStore from "../store.js";
import { GetServerData } from "../api.js";
const selected = {
	setup() {
		const store = useEventStore();
		let serverData = Vue.ref([]);
		let selectedRealm = Vue.ref(null);
		let selectedName = Vue.ref("");
		function groupedByWorldSeq(data) {
			let groupedBy = {};
			return (groupedBy = data.reduce((acc, obj) => {
				if (!acc[obj.worldSeq]) {
					acc[obj.worldSeq] = [];
				}
				acc[obj.worldSeq].push(obj);
				return acc;
			}, {}));
		}
		let checkName = () => {};
		Vue.onMounted(() => {
			const listData = [
				{
					worldSeq: 1,
					worldName: "扭曲的黃金港",
					serverSeq: 1,
					serverName: "扭曲的黃金港1",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 1,
					worldName: "test01",
					serverSeq: 2,
					serverName: "扭曲的黃金港2",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 1,
					worldName: "test01",
					serverSeq: 3,
					serverName: "扭曲的黃金港3",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 2,
					worldName: "test02",
					serverSeq: 1,
					serverName: "扭曲的黃金港1",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 2,
					worldName: "test02",
					serverSeq: 2,
					serverName: "扭曲的黃金港2",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 3,
					worldName: "test03",
					serverSeq: 1,
					serverName: "扭曲的黃金港1",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				},
				{
					worldSeq: 3,
					worldName: "test03",
					serverSeq: 2,
					serverName: "扭曲的黃金港2",
					flag: 1,
					isAdminNew: 0,
					isAdminRecommend: 0
				}
			];
			serverData.value = groupedByWorldSeq(listData);
			// GetServerData().then((res) => {
			// 	let { code, message, listData } = res.data;
			// 	if (code != 1) {
			// 		Message();
			// 		return;
			// 	}
			// 	serverData.value = groupedByWorldSeq(listData);
			// });
		});
		return { Notice, serverData, selectedRealm, selectedName, checkName };
	},
	template: `
		<div class="selected-content">
			<div class="selected-title">選擇領域</div>
			<div class="selected-realm-box">
				<div class="selected-realm__status">
					<div class="selected-realm__status-item" data-type="recommend">推薦</div>
					<div class="selected-realm__status-item" data-type="new">最新</div>
					<div class="selected-realm__status-item" data-type="2">順暢</div>
					<div class="selected-realm__status-item" data-type="3">擁擠</div>
					<div class="selected-realm__status-item" data-type="4">飽和</div>
					<div class="selected-realm__status-item" data-type="5">關閉</div>
				</div>
				<div class="selected-realm__row-group">
					<div class="selected-realm__row" v-for="(worlds,worldsKey,worldsIndex) in serverData" :key="worldsIndex">
						<div class="selected-realm__title"><span>{{worlds[worldsIndex]?.worldName}}</span></div>
						<a href="javascript:;" class="selected-realm__toggle"></a>
						<div class="selected-realm__box">
							<div class="selected-realm__inner">
								<div class="selected-realm__inner-box">
									<label v-for="(realm,realmIndex) in worlds" :key="realm.serverSeq">
										<input type="radio" name="realm" :value="worlds[worldsIndex]?.worldSeq+'-'+realm.serverSeq" v-model="selectedRealm" />
										<div class="selected-realm__item" :data-type="realm.flag">{{realm.serverName}} <span class="icon--recommend" v-if="realm.isAdminRecommend"></span><span class="icon--new" v-if="realm.isAdminNew"></span></div>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selected-chosen" v-if="selectedRealm != null">
				<div class="selected-chosen__title">
					<span class="selected-chosen__title-hexagon"></span>
					扭曲的黃金港01
				</div>
				<div class="selected-chosen__input">
					<input type="text" placeholder="請輸入1~10個字的角色名稱" v-model="selectedName" />
				</div>
				<span class="selected-chosen__error">字數超過上限，中英數字最多不可超過10個字，請重新輸入。</span>
				<a href="javascript:;" class="selected-chosen__btn-submit" @click="checkName">檢查名稱</a>
				<span class="selected-chosen__notice"><span>※ 請注意！</span>創立角色名稱後，選定的領域將無法變更</span>
			</div>
			<a href="javascript:;" class="selected-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default selected;
