var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 模板
var Person = /** @class */ (function () {
    // this 指向生成的 Object 本身
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    Person.setStaticAge = function () {
        return "my age is " + Person.job;
    };
    Person.getStaticAge = function () {
        console.log(Person.setStaticAge());
    };
    Person.getGender = function () {
        console.log(Person.gender);
    };
    // 通過此方法 去修改內部private的屬性
    Person.prototype.setFirstNmae = function (firstName) {
        this.firstName = firstName;
    };
    Person.prototype.getFirstNmae = function () {
        console.log("firstName is " + this.firstName);
    };
    Person.prototype.setLastNmae = function (lastName) {
        this.lastName = lastName;
    };
    Person.prototype.getLastNmae = function () {
        console.log("lastName is " + this.lastName);
    };
    Person.prototype.great = function () {
        console.log("great!");
    };
    Person.prototype.otherGreat = function () {
        this.great();
        console.log("otherGreat!");
    };
    Person.prototype.getJob = function () {
        console.log(Person.job);
    };
    // 靜態屬性
    Person.job = "Progammer";
    Person.gender = "male";
    Person.hobby = "games";
    return Person;
}());
var Programmer = /** @class */ (function (_super) {
    __extends(Programmer, _super);
    function Programmer(firstName, lastName, age) {
        return _super.call(this, firstName, lastName, age) || this;
    }
    Programmer.prototype.getFullName = function () {
        console.log(this.getLastNmae());
        console.log(this.age);
        return "My name is " + this.getFirstNmae() + " " + this.getLastNmae();
    };
    Programmer.prototype.getExtendsJob = function () {
        console.log(Programmer.job);
    };
    Programmer.prototype.getExtendsHobby = function () {
        console.log(Programmer.hobby);
    };
    return Programmer;
}(Person));
// let p=new Person("LB","James",33);
console.log(Person.getStaticAge());
console.log(Person.getGender());
var p1 = new Programmer("LB", "James", 33);
console.log(Programmer.job);
console.log(Programmer.getStaticAge());
console.log(Programmer.getGender());
console.log(p1.getExtendsJob());
console.log(p1.getExtendsHobby());
// p1.setFirstNmae("Harris");
// p1.setLastNmae("Tobis");
// console.log(p1.getLastNmae())
// console.log(p1.getFullName())
// console.log(p1.otherGreat())
// console.log(p1.getJob())
