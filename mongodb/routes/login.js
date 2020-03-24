var express=require('express');
var router=express.Router();
var crypto=require('crypto');

var mongodb = require('../connections/conDBS')
var UserCheck=mongodb.col.UserCheck;

router.get('/',(req,res,next)=>{
    res.render('dashboard/login',{
        error:req.flash('error')
    })
})
router.post('/',(req,res,next)=>{
    var md5=crypto.createHash('md5');
    var pwd_md5=md5.update(req.body.passwd).digest('hex');
    UserCheck.find({email:req.body.email},(err,data)=>{
        if(data.length === 0){
            var errorMessage='此帳號尚未註冊';
            req.flash('error',errorMessage)
            res.redirect('/login')
            console.log('此帳號尚未註冊')
        }else{
            if( pwd_md5 !== data[0].passwd){
                var errorMessage='密碼輸入錯誤';
                req.flash('error',errorMessage)
                res.redirect('/login')
            }else{
                console.log('[登入成功]')
                req.session.email=data[0]['_id'];
                res.redirect('/dashboard/')
            }
        }
    })
})
module.exports=router;