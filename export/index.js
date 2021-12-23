import A from "./a.js";

let SayName = (name) => {
	console.log(`Hello ${name}`);
};
let arr = [1, 2, 3];
let Say = () => {
	console.log("hello");
};
export let obj = {
	name: "OBJ"
};

export default {
	SayName,
	Say,
	arr,
	A
};
