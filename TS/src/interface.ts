interface myInterface1 {
	age: number;
	name: string;
}

let my1: myInterface1 = {
	age: 1,
	name: "Chen"
};

interface myFnInterface1 {
	(key: number, value: string): void;
}

function AddKeyValue(key: number, value: string): void {
	console.log("addKeyValue: key = " + key + ", value = " + value);
}

let myFn1: myFnInterface1 = AddKeyValue;

interface NumList {
	[index: number]: number;
}

let numArr: NumList = [1, 2, 3];

interface IStringList {
	[index: string]: string;
}
let strArr: IStringList = {};
strArr["TS"] = "TypeScript";

interface IEmployee {
	empCode: number;
	empName: string;
	emDept?: string;
}

interface IPerson {
	name: string;
	gender: string;
}

interface IEmployee extends IPerson {
	emId: number;
}

let empObj: IEmployee = {
	empName: "AMA",
	empCode: 1,
	emId: 123123,
	name: "Bill",
	gender: "Male"
};

interface IEmployee2 {
	empCode: number;
	name: string;
	getSalary: (emCode: number) => number;
}

class Employee implements IEmployee2 {
	empCode: number;
	name: string;

	constructor(code: number, name: string) {
		this.empCode = code;
		this.name = name;
	}

	getSalary(emCode: number): number {
		return 20000;
	}
}

let emp = new Employee(1, "Steve");
