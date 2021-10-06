import * as child from "./Child.js";
var app = new Vue({
	el: "#app",
	components: { Child1: child.Child1 },
	data: {
		msg: "Hello",
	},
});
