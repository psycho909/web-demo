import { Notice, MessageLB, SelectCreate } from "../lightbox.js";
import useEventStore from "../store.js";
import { GetUserCharacterData, GetServerData } from "../api.js";
import { isValidString } from "../utils.js";

const listData = [
	{
		WorldSeq: 1,
		WorldName: "扭曲的黃金港",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港1",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港2",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 3,
		ServerName: "扭曲的黃金港3",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 4,
		ServerName: "扭曲的黃金港4",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 5,
		ServerName: "扭曲的黃金港5",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 2,
		WorldName: "test02",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港1",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 2,
		WorldName: "test02",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港2",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 3,
		WorldName: "test03",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港3-1",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	},
	{
		WorldSeq: 3,
		WorldName: "test03",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港3-2",
		Flag: 1,
		IsAdminNew: 0,
		IsAdminRecommend: 0
	}
];
const selected = {
	setup() {
		const store = useEventStore();
		let serverData = Vue.ref([]);
		let selectedRealm = Vue.ref(null);
		let selectedName = Vue.ref("");
		let nameError = Vue.ref("");
		let status = Vue.ref(false);
		function groupedByWorldSeq(data) {
			let groupedBy = {};
			return (groupedBy = data.reduce((acc, obj) => {
				if (!acc[obj.WorldSeq]) {
					acc[obj.WorldSeq] = [];
				}
				acc[obj.WorldSeq].push(obj);
				return acc;
			}, {}));
		}

		// 檢查名稱
		let checkName = () => {
			if (selectedName.value.length < 1 || selectedName.value.length > 10) {
				// 跳窗提示
				nameError.value = "字數超過上限，中英數字最多不可超過10個字，請重新輸入。";
				return;
			}
			if (!isValidString(selectedName.value)) {
				// 跳窗提示
				nameError.value = "請勿使用特殊符號、空白、注音符或非法文字，並再次輸入。";
				return;
			}
			nameError.value = "";
			// API判斷名稱有無重複

			// 沒有重複
			SelectCreate();
		};
		// 選擇領域id filter後顯示名稱
		let filterWorldSeq = Vue.computed(() => {
			if (selectedRealm.value == null) return [];
			let [WorldSeq, ServerSeq] = selectedRealm.value.split("-");
			return listData.filter((item) => item.WorldSeq == WorldSeq && item.ServerSeq == ServerSeq)[0];
		});
		let toggleStatus = () => {
			status.value = !status.value;
		};
		Vue.onMounted(() => {
			// WorldSeq整理group
			serverData.value = groupedByWorldSeq(listData);
			// API取得伺服器資料
			// GetServerData().then((res) => {
			// 	let { code, message, listData } = res.data;
			// 	if (code != 1) {
			// 		Message();
			// 		return;
			// 	}
			// 	serverData.value = groupedByWorldSeq(listData);
			// });
		});
		return { Notice, serverData, selectedRealm, selectedName, checkName, filterWorldSeq, nameError, toggleStatus, status };
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
					<div class="selected-realm__row" :class="[status?'-open':'']" v-for="(worlds,worldsKey,worldsIndex) in serverData" :key="worldsIndex">
						<div class="selected-realm__title"><span>{{worlds[0]?.WorldName}}</span></div>
						<a href="javascript:;" class="selected-realm__toggle" @click="toggleStatus"></a>
						<div class="selected-realm__box">
							<div class="selected-realm__inner">
								<div class="selected-realm__inner-box">
									<label v-for="(realm,realmIndex) in worlds" :key="realm.ServerSeq">
										<input type="radio" name="realm" :value="worlds[0]?.WorldSeq+'-'+realm.ServerSeq" v-model="selectedRealm" />
										<div class="selected-realm__item" :data-type="realm.Flag">{{realm.ServerName}} <span class="icon--recommend" v-if="realm.IsAdminRecommend"></span><span class="icon--new" v-if="realm.IsAdminNew"></span></div>
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
					{{filterWorldSeq.ServerName}}
				</div>
				<div class="selected-chosen__input">
					<input type="text" placeholder="請輸入1~10個字的角色名稱" maxlength="10" v-model="selectedName" />
				</div>
				<span class="selected-chosen__error" v-if="nameError !== ''">{{nameError}}</span>
				<a href="javascript:;" class="selected-chosen__btn-submit" @click="checkName">檢查名稱</a>
				<span class="selected-chosen__notice"><span>※ 請注意！</span>創立角色名稱後，選定的領域將無法變更</span>
			</div>
			<a href="javascript:;" class="selected-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default selected;
