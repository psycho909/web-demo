function getLength(something: string | number): string {
	return something.toString();
}

class Song {
	title: string;
	duration: number;

	constructor(title: string, duration: number) {
		this.title = title;
		this.duration = duration;
	}
}
function sayHello(name: string): void {
	console.log(`${name} Hello`);
}

function sayHello2(name: any): void {
	console.log(`${name} Hello`);
}

function sayHello3<T>(name: T): T {
	return name;
}

function foo<T>(arg: T[]): T[] {
	console.log(arg.length); //Property 'length' does not exist on type 'T'
	return arg;
}

interface Phone2 {
	model: string;
	price?: number;
	[x: string]: any;
}

let myPhone: Phone2 = {
	model: "iphone 11",
	width: 100,
	price: 200
};
