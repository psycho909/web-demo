import { Notice } from "../lightbox.js";
import useEventStore from "../store.js";
const plunder = {
	setup() {
		const store = useEventStore();
		const selected = Vue.ref(null);
		const titleSubmit = () => {
			if (selected.value == null) {
				return;
			}
		};
		return { Notice, selected, titleSubmit };
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
					<label class="plunder-names__label" v-for="i in 10">
						<input type="radio" name="title" :value="i" v-model="selected"  />
						<span class="plunder-names__item">角色名稱最多十個文字</span>
					</label>
				</div>
			</div>
			<a href="javascript:;" class="plunder-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default plunder;
