interface User {
	name: string;
	age: number;
}

let jane: User = {
	name: "JANE",
	age: 18
};

type User2 = {
	name: string;
	age: number;
};

let jane2: User2 = {
	name: "JANE2",
	age: 18
};

type StringType = string;
let s: StringType = "Hello";

type paramType = number | string;
let param: paramType = 1;

type arrType = [string, string, number];
let arr: arrType = ["Hi", "Type", 123];

let someValue: any = "This is a string";
// let strLength:number=(<string>someValue).length

// let strLength:number=(someValue as string).length
