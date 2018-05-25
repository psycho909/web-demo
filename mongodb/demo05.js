// db.workmate.find(
//     {"skill.skillOne":"HTML+CSS"},
//     {name:true,"skill.skillOne":true,_id:false}
// )
// db.workmate.find(
//     {age:{$lte:30,$gte:25}},
//     {name:true,"skill.skillOne":true,age:true,_id:false}
// )

// var startDate=new Date('01/01/2018');
// db.workmate.find(
//     {regeditTime:{$gt:startDate}},
//     {name:true,"skill.skillOne":true,age:true,_id:false}
// )
// $in 一個key 多value
db.workmate.find(
    {age:{$in:[25,33]}},
    {name:true,"skill.skillOne":true,age:true,_id:false}
)
// $nin $in的相反
db.workmate.find(
    {age:{$nin:[25,33]}},
    {name:true,"skill.skillOne":true,age:true,_id:false}
)
// $or
db.workmate.find(
    {$or:[
        {age:{$gte:30}},
        {'skill.skillThree':'PHP'}
    ]},
    {name:true,"skill.skillThree":true,age:true,_id:false}
)
// $and
db.workmate.find(
    {$and:[
        {age:{$gte:30}},
        {'skill.skillThree':'PHP'}
    ]},
    {name:true,"skill.skillThree":true,age:true,_id:false}
)
// $not
db.workmate.find(
    {age:{
        $not:{
            $lt:30,
            $gte:20
        }
    }},
    {name:true,"skill.skillThree":true,age:true,_id:false}
)

// db.workmate.find(
//     {interest:"玩游戏"},
//     {name:true,interest:true,age:true,_id:false}
// )

// $all 查找多個數組資料，如同 &&
db.workmate.find(
    {interest:{$all:['玩游戏','篮球']}},
    {name:true,interest:true,age:true,_id:false}
)

// $in 查找多個數組資料，如同  ||
db.workmate.find(
    {interest:{$in:['玩游戏','篮球']}},
    {name:true,interest:true,age:true,_id:false}
)

// $size 查找個數
db.workmate.find(
    {interest:{$size:5}},
    {name:true,interest:true,age:true,_id:false}
)

// $slice 有时候我并不需要显示出数组中的所有值，而是只显示前两项，比如我们现在想显示每个人兴趣的前两项，而不是把每个人所有的兴趣都显示出来。
db.workmate.find(
    {interest:{$size:3}},
    {name:true,interest:{$slice:1},age:true,_id:false}
)


// 分頁顯示2 年齡從小到大
// limit：返回的数量，后边跟数字，控制每次查询返回的结果数量
// skip:跳过多少个显示，和limit结合可以实现分页。
// sort：排序方式，从小到大排序使用1，从大到小排序使用-1。
db.workmate.find(
    {},
    {name:true,age:true,_id:false}
).limit(2).skip(2).sort({age:1})

// $where 它是一个非常强大的修饰符，但强大的背后也意味着有风险存在。它可以让我们在条件里使用javascript的方法来进行复杂查询。我们先来看一个最简单的例子，现在要查询年龄大于30岁的人员。
// age > 30 程式員
db.workmate.find(
    {$where:"this.age > 30"},
    {name:true,age:true,_id:false}
)