<?php
//session_start();
$u_agent = $_SERVER['HTTP_USER_AGENT'];
if(preg_match("/Android/i",$u_agent)){
  $equipment="smarty";  
}else if(preg_match("/iPhone/i",$u_agent)){
  $equipment="smarty";  
}else if(preg_match("/iPad/i",$u_agent)){
  $equipment="smarty";
}else{
  $equipment="computer";
}
header('Content-type:text/html;charset=utf-8');
require("_db_conn.php");
require("_db_func.php");
require("/home/httpd/htdocs/home/newportal/sysop/~system.php");
require("/home/httpd/htdocs/home/newportal/sysop/~mcrypt.php");
require("/home/httpd/htdocs/home/newportal/sysop/~function.php");
include "action_paramater.php";
mysql_query("SET NAMES utf8",$link);
$nowdate=date('Y-m-d', mktime(date('H'),date('i'),date('s'),date('m'),date('d'),date('Y')));  
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=1180px" />
<meta property="og:image" content="/images/elife.gif" />
<meta property="og:type" content="website" />
<meta name="google-site-verification" content="WmpzwMKPiV3jgMeriO-2jnrv_7e1Zym97lit1LlLtk8" />
<meta name="google-site-verification" content="T7bVYIkRTr0BKAyVOcdaEke-UcBwSVxqXRSJzattGak" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE" >
<META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
<META NAME="ROBOTS" CONTENT="ALL,NOARCHIVE">
<META name="description" content="全國電子是你「智慧生活的好鄰居」，我們以親切、專業的服務，提供你最新的家電與數位產品。自我期許顧客的需求在哪裡，我們的服務就在哪裡，秉持「在地經營、服務第一」的企業精神，創造「別人不能，我們能；別人不會，我們會；別人不做，我們做」的獨特價值。">
<META name="keywords" content="全國電子,足感心,全國電子專賣店,全國電,6281,全國電子股份有限公司,全國電子 足感心,電子通訊／電腦週邊零售業,elifemall">

<title>歡迎光臨 全國電子</title>
<link rel="stylesheet" href="./css/reset.css">
<link href="css/layout.css?v=<?php echo date("ymdhi")?>" rel="stylesheet" />
<link href="css/slideshow.css?v=<?php echo date("ymdhi")?>" rel="stylesheet" />

<link rel="stylesheet" href="./css/brand-event.css?v=<?php echo time(); ?>">

<script src="./js/jquery-3.1.1.min.js"></script>
<script src="./js/vue.js"></script>

<?php // include "gtmcode_head.php"; ?>
</head>

<body>
	<?php // include "gtmcode_body.php"; ?>
    <?php include "topbanner.php"; ?>
	<?php include "header.php"; ?>
    <div id="app" class="container">
        <div class="select-brand-type">
            <div class="brand-type-box">
                <div class="brand-type-btn" :class="[brandType === ''?'active':'']" @click="checkBrandType()">全部</div>
                <div class="brand-type-btn" :class="[brandType === 'ele'?'active':'']" @click="checkBrandType('ele')">資訊品牌區</div>
                <div class="brand-type-btn" :class="[brandType === 'com'?'active':'']" @click="checkBrandType('com')">通訊品牌區</div>
                <div class="brand-type-btn" :class="[brandType === 'appliance'?'active':'']" @click="checkBrandType('appliance')">家電品牌區</div>
            </div>
        </div>
        <div class="select-brand-logo">
            <div class="brand-logo-box">
                <div class="brand-logo-btn" v-for="brands in computedBrands" :class="[brand === brands.brand ?'active':'']" @click="checkBrand(brands.brand)">
                    <img  class="brand-logo":src="'./images/logo/'+brands.brand+'.png'" alt="">
                </div>
            </div>
        </div>
        <div class="brand-wrap">
            <a class="brand-box" v-for="list in computedList" :href="list.url" target="_blank">
                <dl class="brand-list">
                    <dd class="brand-img">
                        <img :src="'./images/'+list.brand+'/'+list.img" alt="">
                    </dd>
                    <dd class="brand-body">
                        <p class="brand-content">{{list.content}}</p>
                    </dd>
                    <dd class="brand-time">
                        <span class="clock-icon">
                            <svg version="1.1" id="clock" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 980 980" style="enable-background:new 0 0 980 980;" xml:space="preserve">
                                <g>
                                    <path d="M490,0C219.4,0,0,219.4,0,490s219.4,490,490,490s490-219.4,490-490S760.6,0,490,0z M490,894.8
                                   C266.4,894.8,85.2,713.6,85.2,490S266.4,85.2,490,85.2S894.8,266.4,894.8,490S713.6,894.8,490,894.8z"
                                    />
                                    <path d="M511.3,213h-85.2v255.7v85.2H767v-85.2H511.3V213z" />
                                </g>
                            </svg>
                        </span>
                        <span class="starttime">{{list.starttime}}</span>
                        <span class="symbol">~</span>
                        <span class="endtime">{{list.endtime}}</span>
                    </dd>
                </dl>
            </a>
        </div>
    </div>


    <?php include "footer.php"; ?>

	<script src="./js/brand-event.js"></script>
</body>
</html>
