let message: string = "Hello world";

const names: string[] = ["a", "b", "c"];

names.push("D");

interface Person {
	name: string;
	age: number;
	run(): void;
}

const myInfo: Person = {
	name: "why",
	age: 18,
	run: function () {
		console.log("RUN");
	}
};

console.log(myInfo.name);

function foo(): void {
	console.log("Floo");
}

foo();

function sum(num1: number, num2: number): void {
	console.log(num1 + num2);
}

sum(2, 3);

const info: (string | number)[] = ["wht", 18, 0.23];

const item1 = info[0];

console.log(item1);
