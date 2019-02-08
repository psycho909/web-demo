// 定義類別別名 type alias
// 以後可以用 Name 來代替 string 類型
type Name=string;

type User={
    name:string;
    age:number;
}

const user:User={
    name:"LBJ",
    age:23
}

interface iUser{
    name:string;
    age:number
}