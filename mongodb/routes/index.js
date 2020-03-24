var express = require('express')
var mongodb = require('../connections/conDBS')
var fs=require('fs');
var striptags = require('striptags');
var moment = require('moment');
var router = express.Router()
var Travels=mongodb.col.Travels;

/* GET home page. */
router.get('/', function(req, res, next) {
	var country=[{
		'TW':['台北-TPE','新竹-TXG','台中-TXG','台南-TNN','高雄-KHH','宜蘭-ILA','花蓮-HUA','台東-TTT','其他-TLE'],
		'JP':['北海道-HOKK','関東-KANTO','東京-TOKY','近畿-KINKI','九州-KYUSHU']
	}]
	Travels.find({},(err,data)=>{
		res.render('index', { 
			data,
			striptags,
			moment,
			country
		})
	})
})
router.get('/projectlist', function(req, res, next) {
	var country=req.query.country;
	Travels.find({'countryId':country},(err,data)=>{
		res.render('projectlist', { 
			data,
			striptags,
			moment
		})
	})
})
router.get('/project/:dataId', function(req, res, next) {
	var dataId=req.params.dataId;
	Travels.find({'dataId':dataId},(err,data)=>{
		res.render('project', { 
			data,
			striptags,
			moment
		})
	})
})

router.get('/error',function(req,res,next){
	res.render('error')
})

router.post('/projectlist', function(req, res, next) {

	if(req.body.header_search_bar){
		var description=req.body.header_search_bar;
		Travels.find({'description':{$regex:description}},(err,data)=>{
			console.log(data)
			res.render('projectlist', { 
				data,
				striptags,
				moment
			})
		})
	}
	if(req.body.search_form_cityname){
		var cityName=req.body.search_form_cityname.split('-')[1];
		var departure_time=Math.ceil(new Date(req.body.departure_time).valueOf()/1000)
		console.log(departure_time)
		Travels.find({
			'cityName':cityName,
			'setofftime':{'$lte':departure_time},
		},(err,data)=>{
			console.log(data)
			res.render('projectlist', { 
				data,
				striptags,
				moment
			})
		})
	}
})
module.exports = router
