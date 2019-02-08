interface Person{
    first_name?:string;
    last_name?:string;

    print(callback:PrintCallback):void;
}

interface PrintCallback{
    // 可以簡單理解為匿名函數
    (success:boolean,sname:string):void
}

let printCallback:PrintCallback;
printCallback=(suc:boolean,name:string):void=>{
    if(suc){
        console.log(`Hello ! ${name}`)
    }else{
        console.log("no")
    }
}

printCallback(true,"Chen");

let person:Person={
    first_name:"JD",
    last_name:"BB",
    print:(callback:PrintCallback):void=>{
        callback(true,"KBH")
    }
}

person.print(printCallback)

// class Programmer implements Person{
//     first_name:string;
//     last_name:string;
//     constructor(first_name,last_name){
//         this.first_name=first_name;
//         this.last_name=last_name;
//     }
// }

// var p=new Programmer("ASD","FS");

// const sayName=(o:Person)=>{
//     console.log(`${o.first_name} ${o.last_name}`)
// }

// sayName(person)
// sayName(p)