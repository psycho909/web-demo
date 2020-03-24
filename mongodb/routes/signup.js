var express=require('express');
var router=express.Router();
var mongodb = require('../connections/conDBS')
var crypto=require('crypto');

var User=mongodb.col.User;

router.get('/',(req,res,next)=>{
    res.render('dashboard/signup',{
        error:req.flash('error')
    })
})

router.post('/',(req,res)=>{
    var _data=req.body;
    var md5=crypto.createHash('md5');
    User.find({email:req.body.email},(err,data)=>{
        if(data.length > 0){
            var errorMessage='註冊重複';
            req.flash('error',errorMessage)
            res.redirect('/signup')
            console.log('註冊重複')
        }else{
            User({
                email:_data.email,
                passwd:md5.update(_data.passwd).digest('hex'),
                nickname:_data.nickname
            }).save((err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log('[註冊成功]')
                res.redirect('/signup/success')
            })
        }
    })
})

router.get('/success',(req,res)=>{
    res.render('dashboard/success')
})

module.exports=router;