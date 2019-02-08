// 接口
// 支付接口
interface Person{
    name: string;
    greet();
}

const sayName=(o:Person)=>{
    console.log(o.greet())
}

// 實現接口


// 類實現接口
class Employee implements Person{
    name:string;

    greet(){
        return "Hello greet";
    }
}

class Customer implements Person{
    name:string;
    email:string;
    greet(){
        return "Hello greet";
    }
}

let cu=new Customer();
sayName(cu);

// 支付接口
interface Pay{
    post():void;
}

// 可能會發送 http 請求
// 真正支付的請求
const do_pay=(pay:Pay)=>{
    // 有一些邏輯
    pay.post();
}

// A支付
class WePay implements Pay{
    // 調A支付的接口
    post(){

    }
}

// B支付
class AliPay implements Pay{
    // 調B支付的接口
    post(){

    }
}

let we_pay:Pay=new WePay();
let ali_pay:Pay=new AliPay();

do_pay(we_pay)