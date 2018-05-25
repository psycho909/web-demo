var starTime= +new Date();

var db=connect('company');
var rs=db.randomInfo.find(
    {username:'ctnszzdh'}
);

rs.forEach(rs=>{printjson(rs)})

var runTime= (+new Date()) - starTime;

print('[Demo] this run time is '+runTime+' ms');


// 查找索引
// db.randomInfo.getIndexes()
// 建立索引
// db.randomInfo.ensureIndex({username:1})