var startTime=(new Date().getTime());
var db=connect('log');

var tempArray=[];

for(var i=0;i<1000;i++){
    tempArray.push({num:1})
}

db.test.insert(tempArray)

// for(var i=0;i<1000;i++){
//     db.test.insert({num:1})
// }


var runTime=(new Date().getTime())-startTime;
print('[demo]:This run is '+runTime+' ms');