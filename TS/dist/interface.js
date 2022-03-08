"use strict";
let my1 = {
    age: 1,
    name: "Chen"
};
function AddKeyValue(key, value) {
    console.log("addKeyValue: key = " + key + ", value = " + value);
}
let myFn1 = AddKeyValue;
let numArr = [1, 2, 3];
let strArr = {};
strArr["TS"] = "TypeScript";
let empObj = {
    empName: "AMA",
    empCode: 1,
    emId: 123123,
    name: "Bill",
    gender: "Male"
};
class Employee {
    constructor(code, name) {
        this.empCode = code;
        this.name = name;
    }
    getSalary(emCode) {
        return 20000;
    }
}
let emp = new Employee(1, "Steve");
