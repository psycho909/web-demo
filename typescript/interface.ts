// 接口
// 傳過來的參數必須包含接口定義的屬性和方法
interface Named{
    // 屬性
    name: string;

    // 方法
    // 沒有方法體
    // 具體的對象中實現方法體
    print(name:string):void;
}

// 函數
const sayName=(o:Named)=>{
    o.print(o.name);
    // console.log(o.name)
}

// 對象
const perosn={
    age:27,
    name:"sadfk",
    print:(name)=>{
        console.log(name)
    }
}

class SuperMan{
    name:string;
    constructor(name){
        this.name=name;
    }
    print(name){
        console.log(name)
    }
}

var s=new SuperMan("BATMAN");

sayName(perosn)
sayName(s)