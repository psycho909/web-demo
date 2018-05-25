// hasNext
var db=connect('company');
var result=db.workmate.find();

// while(result.hasNext()){
//     printjson(result.next());
// }

result.forEach((result)=>{
    printjson(result);
})