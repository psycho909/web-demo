type Direction = "left" | "right" | "up" | "down";

const move = (direction: Direction) => {
	switch (direction) {
		case "left":
			console.log("left");
			break;
		case "right":
			console.log("right");
			break;
		default:
			console.log("up");
	}
};

interface User {
	name: string;
	age: number;
	email?: string;
}

type Dictionary<T> = {
	[key: string]: T;
};

const myDictionary: Dictionary<string> = {
	a: "value1",
	b: "value2"
};

console.log(myDictionary["a"]);

type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 23];

type IsMyArray = IsArray<typeof myArray>;
