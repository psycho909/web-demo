var starTime= +new Date();

var db=connect('company');
var rs=db.randomInfo.find({username:'mcx98uuf8v',randNum0:650805}).hint({ranNum0:1})

rs.forEach(rs=>{printjson(rs)})

var runTime= (+new Date()) - starTime;

print('[Demo] this run time is '+runTime+' ms');
