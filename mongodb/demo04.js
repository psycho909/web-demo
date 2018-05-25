// 第一個 false,當沒有找到就不增加，第二個true找到時，所有的都增加

// db.workmate.update({sex:1},{$set:{money:1000}},false,true)

// var resultMessage=db.runCommand({getLastError:1})
// if(resultMessage.updatedExisting){
//     print('SUCCESS')
// }else{
//     print('ERROR')
// }

// findAndModify
// query:需要查詢的條件
// sort: 排序
// remove:[boolean] 是否刪除查找的文黨
// update: 增加
// new:[boolean] 返回更新前的文黨還是更新後的文黨
// fields: 需要返回的字段
// upsert: 沒有這個值是否增加

var myModify={
    findAndModify:"workmate",
    query:{name:'faker'},
    update:{$set:{age:100}},
    new:true
}

var resultMessage=db.runCommand(myModify)

printjson(resultMessage)