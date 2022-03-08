"use strict";
class Anim {
    constructor(age, name) {
        this.age = age;
        this.name = name;
    }
    static sayHi() {
        console.log("hi");
    }
}
class Dog extends Anim {
    constructor(age, name, gender) {
        super(age, name);
        this.gender = gender;
    }
    sayHello() {
        console.log(`${this.name} Hi`);
    }
    sayName() {
        console.log(`${this.name} Hi`);
    }
}
let Jack = new Dog(12, "Jack", "male");
console.log(Jack.name);
Jack.sayHello();
Dog.sayHi();
