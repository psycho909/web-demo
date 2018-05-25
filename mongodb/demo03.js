var db=connect('company');
// var workmate3={
//     name:'Wade',
//     age:34,
//     sex:0,
//     job:'全端',
//     skill:{
//         skillOne:'PHP',
//         skillTwo:'HTML+CSS',
//         skillThree:'Node'
//     },
//     regeditTime:new Date().getTime()
// }
// db.workmate.update({name:'Wade'},workmate3)

// $set 優雅的更新文件
// db.workmate.update({name:'Wade'},{"$set":{sex:0,age:100}})
// db.workmate.update({name:'Wade'},{$set:{"skill.skillThree":"word"}})

// $unset 刪除 某集合內文件的某個數據
// db.workmate.update({name:'Wade'},{$unset:{age:''}})

// $inc 對於數字計算
// db.workmate.update({name:'Wade'},{$inc:{age:-2}})

// multi 幫所有添加新的屬性
// db.workmate.update({},{$set:{interset:[]}},{multi:true})

// upsert 如果沒有就加上，有的話不修改
// db.workmate.update({name:'faker'},{$set:{age:20}},{upsert:true})

// $push 如同JS push功能
// db.workmate.update({name:'faker'},{$push:{skillFour:'excel'}})

// $ne 查找先，在修改之前先查找，沒有就先進行修改，有則不修改
// db.workmate.update({name:'faker',interset:{$ne:'playgame'}},{$push:{interset:'playgame'}})

// $addToSet $ne升級版
// db.workmate.update({name:'faker'},{$addToSet:{interest:'playGGame'}})

// $each 批量追加
// var newInterests=['sing','code','eat']
// db.workmate.update({name:'faker'},{ $addToSet:{interest:{$each:newInterests}} } )

// $pop  1 => 從數組末端刪除  -1 => 開始位置刪除
// db.workmate.update({name:'faker'},{$pop:{interest:1} })

// 數組定位修改 非應答式操作
// db.workmate.update({name:'faker'},{$set:{"interest.2":"run"}} )

// findAndModify

// db.runCommand()


print('[update]:The data was update success')