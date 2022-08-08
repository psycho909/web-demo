import store from "../store/index.js";
import components from "./components.js";
import control from "./control.js";
import edit from "./edit.js";
edit();
control();
var vm = new Vue({
	el: "#app",
	components,
	store,
	computed: {
		menu() {
			return Object.keys(components);
		}
	},
	mounted() {},
	data() {
		return {
			fixed: {
				top: true,
				left: true
			}
		};
	},
	methods: {
		add(cpt) {
			var data = {
				cpt,
				content: this.fixed
			};
			this.$store.commit("ADD", data);
		}
	}
});
