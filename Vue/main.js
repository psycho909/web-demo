import * as child from "./Child.js";
console.log(child);
var app = new Vue({
	el: "#app",
	components: { Child1: child.Child1, Child2: child.Child2 },
	data: {
		msg: "Hello",
	},
});
