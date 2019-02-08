// 模板
class Person{
    // 定義數據
    private firstName:string;
    protected lastName:string;
    protected age:number;

    // 靜態屬性
    public static job:string="Progammer";
    private static gender:string="male";
    protected static hobby:string="games";

    protected static setStaticAge(){
        return `my age is ${Person.job}`;
    }
    public static getStaticAge(){
        console.log(Person.setStaticAge())
    }
    public static getGender(){
        console.log(Person.gender)
    }
    // this 指向生成的 Object 本身
    protected constructor(firstName:string,lastName:string,age:number){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }
    
    // 通過此方法 去修改內部private的屬性
    setFirstNmae(firstName):void{
        this.firstName=firstName
    }
    protected getFirstNmae(){
        console.log(`firstName is ${this.firstName}`);
    }

    setLastNmae(lastName):void{
        this.lastName=lastName
    }
    protected getLastNmae(){
        console.log(`lastName is ${this.lastName}`);
    }

    private great(){
        console.log("great!")
    }

    public otherGreat(){
        this.great();
        console.log("otherGreat!")
    }

    public getJob(){
        console.log(Person.job);
    }
}

class Programmer extends Person{
    constructor(firstName:string,lastName:string,age:number){
        super(firstName,lastName,age)
    }
    public getFullName():string{
        console.log(this.getLastNmae())
        console.log(this.age)
        return `My name is ${this.getFirstNmae()} ${this.getLastNmae()}`;
    }
    public getGreat(){
        super.getLastNmae()
    }
    public getExtendsJob(){
        console.log(Programmer.job)
    }
    public getExtendsHobby(){
        console.log(Programmer.hobby)
    }
}

// let p=new Person("LB","James",33);
console.log(Person.getStaticAge());
console.log(Person.getGender());
let p1=new Programmer("LB","James",33);
console.log(Programmer.job)
console.log(Programmer.getStaticAge())
console.log(Programmer.getGender())
console.log(p1.getExtendsJob())
console.log(p1.getExtendsHobby())
// p1.setFirstNmae("Harris");
// p1.setLastNmae("Tobis");
// console.log(p1.getLastNmae())
// console.log(p1.getFullName())
// console.log(p1.otherGreat())
// console.log(p1.getJob())