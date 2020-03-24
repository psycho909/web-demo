var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://bootaka123:89855991@ds239009.mlab.com:39009/todos");
var mongodb=mongoose.connect(
	'mongodb://bootaka123:89855991@ds239009.mlab.com:39009/todos',
	err => {
		if (err) {
		console.log('連接失敗')
		} else {
		console.log('連接成功')
		}
	}
)
var Schema=mongoose.Schema;
autoIncrement.initialize(connection);

var travelSchema = new Schema(
	{
		dataId:String,
		country:String,
		countryId:String,
		cityName:String,
		title: String,
		description: String,
		content:String,
		money:Number,
		imageUrl:String,
		setoff:Date,
		setofftime:Number,
		num:Number
		
	}
)

var Travels = mongoose.model('Travels', travelSchema)
Travels.find({}, (err, data) => {
	if (err) {
		console.log('獲取資料錯誤')
	}else{
		// console.log(data)
	}
})

var userSchema=new Schema({
    email:String,
    passwd:String,
    nickname:String
})

mongodb.col={};
mongodb.col.Travels=mongoose.model('Travels', travelSchema)
mongodb.col.User=mongoose.model('User',userSchema)
mongodb.col.UserCheck=mongoose.model('User',userSchema)

module.exports=mongodb;