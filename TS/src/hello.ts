interface myInterface {
	name: string;
	sayHello(): void;
}

class Person implements myInterface {
	name: string;
	age: number;
	gender: string;
	constructor(name: string, age: number, gender: string) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}

	sayHello(): void {
		console.log("hello~");
	}
}

function fn<T>(a: T): T {
	return a;
}

let result = fn(10); // 不指定泛型，TS可以自動類型自動推斷
let result2 = fn<string>("Hello"); // 指定泛型

function fn2<T, K>(a: T, b: K): T {
	console.log(b);
	return a;
}

fn2<number, string>(123, "Hello");

class MyClass<T> {
	name: T;
	constructor(name: T) {
		this.name = name;
	}
}

const Person2 = new MyClass<string>("Jack");

interface Inter {
	length: number;
}

function fn3<T extends Inter>(a: T): number {
	return a.length;
}
