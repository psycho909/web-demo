import * as child from "./Child.js";
import Name from "./Name.js";
var app = new Vue({
	el: "#app",
	components: { Child1: child.Child1 },
	data: {
		msg: "Hello"
	},
	methods: {
		getRef() {
			console.log(this.$refs.child.data);
		}
	}
});

console.log(Name);
