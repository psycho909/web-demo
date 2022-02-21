"use strict";
function getLength(something) {
    return something.toString();
}
class Song {
    constructor(title, duration) {
        this.title = title;
        this.duration = duration;
    }
}
function sayHello(name) {
    console.log(`${name} Hello`);
}
function sayHello2(name) {
    console.log(`${name} Hello`);
}
function sayHello3(name) {
    return name;
}
function foo(arg) {
    console.log(arg.length); //Property 'length' does not exist on type 'T'
    return arg;
}
let myPhone = {
    model: "iphone 11",
    width: 100,
    price: 200
};
