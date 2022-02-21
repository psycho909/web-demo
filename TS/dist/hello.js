"use strict";
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    sayHello() {
        console.log("hello~");
    }
}
function fn(a) {
    return a;
}
let result = fn(10); // 不指定泛型，TS可以自動類型自動推斷
let result2 = fn("Hello"); // 指定泛型
function fn2(a, b) {
    console.log(b);
    return a;
}
fn2(123, "Hello");
class MyClass {
    constructor(name) {
        this.name = name;
    }
}
const Person2 = new MyClass("Jack");
function fn3(a) {
    return a.length;
}
