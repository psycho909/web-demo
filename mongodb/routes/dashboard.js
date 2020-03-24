var express = require('express')
var mongodb = require('../connections/conDBS')
var fs=require('fs');
var striptags = require('striptags');

var router = express.Router()
var Travels=mongodb.col.Travels;
var Books=mongodb.col.Books;



/* GET home page. */
router.get('/', function(req, res, next) {
	var auth=req.session.email;

	Travels.find({}).limit(2).skip(0).exec((err,data)=>{
		if(err){
			console.log(err)
		}else{
			// console.log(data)
			res.render('dashboard/dashboard', { 
				title:"trip",
				Travels: data,
				auth,
				striptags
			})
		}
	})
})
router.get('/searchpage',(req,res)=>{
	// (2 * 2 )-2= 0
	
	var _skip=parseInt((req.query.skip*req.query.limit) - req.query.limit);
	var _limit=parseInt(req.query.limit);
	var datas=[];
	console.log('[_skip] '+_skip)
	console.log('[_limit] '+_limit)
	var totalResult;
	
	var promise=Travels.find({}).limit(_limit).skip(_skip).exec()
	promise.then((data)=>{
		return data
	}).then((data)=>{
		Travels.count((err,result)=>{
			totalResult=result
			res.json({data,totalResult})
		})
	})
})
router.get('/searchLimit',(req,res)=>{
	// (2 * 2 )-2= 0
	var skip=(req.query.pageNumber*2) - 2;
	Travels.find({}).exec((err,data)=>{
		if(err){
			console.log(err)
		}else{
			res.json(data)
		}
	})
})
router.get('/logout',(req,res,next)=>{
	req.session.destroy(err=>{
		if(err){
			console.log('清除失敗')
		}
		res.redirect('/');
	})
})

router.post('/create',function(req,res){
	var dataId=req.body.country.split('-')[1]+new Date().valueOf()
	var updateTime=Math.ceil(new Date(req.body.setoff).valueOf()/1000)
	Travels({
		dataId:dataId,
		country:req.body.country.split('-')[0],
		countryId:req.body.country.split('-')[1],
		cityName:req.body.cityName.split('-')[1],
		title:req.body.title,
		description:req.body.description,
		content:req.body.content,
		money:req.body.money,
		imageUrl:req.body.imagesImgur,
		setoff:req.body.setoff,
		setofftime:updateTime,
		num:req.body.num,
		
	}).save((err,data)=>{
		if(err){
			console.log(err)
		}
		console.log(data)
	})
	res.redirect('/dashboard')
	// console.log(req.body)
})

router.post('/delete/',(req,res)=>{
	Travels.find({dataId:req.body.dataId}).remove((err,data)=>{
		if(err){
			console.log(err)
		}else{
			console.log('刪除成功')
			res.json(123)
		}
	})
	
})

router.post('/search',(req,res)=>{
	var cityname=req.body.cityname;
	if(cityname.length >　0){
		Travels.find({cityname:cityname},(err,data)=>{
			if(err){
				console.log(err)
			}else{
				res.json(data)
				console.log(data)
			}
		})
	}else{
		Travels.find({},(err,data)=>{
			if(err){
				console.log(err)
			}else{
				res.json(data)
				console.log(data)
			}
		})
	}
})

router.post('/searchDate',(req,res)=>{
	Travels.find({
		'startoff':{"$gte":req.body.startdate},
		'startoff':{"$lte":req.body.enddate},
	},(err,data)=>{
		if(err){
			console.log(err)
		}else{
			res.json(data)
			console.log(data)
		}
	})
})

module.exports = router
