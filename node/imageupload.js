var multer=require('multer');
var upload=multer({dest:'../public/uploads/'})
var createFolder = function(folder){
	try{
		fs.accessSync(folder); 
	}catch(e){
		fs.mkdirSync(folder);
	}  
};

var uploadFolder = '..\/public\/uploads';

createFolder(uploadFolder);
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadFolder)
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})

var upload = multer({ storage: storage })
router.get('/browerServer', function (req, res, next) {
    var callback = req.query.CKEditorFuncNum;
    var imgPath =  "..\/dashboard\/public\/uploads";
	var imgInfols = [];
	r= new Buffer('1');
	fd= fs.openSync(imgPath,'r');
	var files = fs.readdirSync(imgPath);
	console.log('[OPEN:] image')
	console.log('[FS OPEN :]'+files[0])
	for(var item of files){
		var abc={
			"name":item,
			"url":"/uploads/"+item,
			"folder":'/'
		}
		imgInfols.push(abc)
	}

    console.log('[CALLBACK : ]'+callback);
    res.render('adminImgManage', {results:imgInfols, callback:callback});
});
router.get('/adminSelectImg/:name/:callback', function (req, res, next) {
	console.log('[OPEN : adminSelectImg]')
    var name = req.params.name;
    var callback = req.params.callback;
    var str = "<script type=\"text/javascript\">" + "window.opener.CKEDITOR.tools.callFunction("+ callback + ",'" + "/uploads/"+ name + "','');window.close();" + "</script>";
    res.send(str);
});

router.post('/create',upload.single('images'),function(req,res){
    router.post('/create',function(req,res){
        var imgUrl;
        if(req.file){
        	imgUrl=(req.file.path).replace('public\\','')
        }else{
        	imgUrl='';
        }
        Trips({
            cityname:req.body.cityname,
            name:req.body.name,
            descript:req.body.descript,
            money:req.body.money,
            imageUrl:req.body.imagesImgur,
            startoff:req.body.startoff,
            content:req.body.content,
            dataId:new Date().valueOf()
        }).save((err,data)=>{
            // console.log(data)
        })
        res.redirect('/dashboard')
        // console.log(req.body)
    })