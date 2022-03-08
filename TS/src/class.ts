interface myAnim {
	gender: string;
	sayName(): void;
}

abstract class Anim {
	age: number;
	readonly name: string;
	constructor(age: number, name: string) {
		this.age = age;
		this.name = name;
	}
	abstract sayHello(): void;

	static sayHi() {
		console.log("hi");
	}
}

class Dog extends Anim implements myAnim {
	gender: string;
	constructor(age: number, name: string, gender: string) {
		super(age, name);
		this.gender = gender;
	}
	sayHello(): void {
		console.log(`${this.name} Hi`);
	}
	sayName(): void {
		console.log(`${this.name} Hi`);
	}
}
let Jack = new Dog(12, "Jack", "male");

console.log(Jack.name);
Jack.sayHello();
Dog.sayHi();
