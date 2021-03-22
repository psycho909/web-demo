// 執行loadingProgress()這個方法會在頁面載入時在網頁上疊一個半透明的loading畫面（append一個div）
// 它會偵測網頁裡所有使用的圖檔及影片，在圖檔完全載入及影片載入目前的影格後那個半透明的loading畫面消失
// 如果你的網頁有用到大量圖檔就很適合使用
// 預設影片是不做偵測，可以在參數中做改變！

// 使用方法：
// 載入jQuery及loadingProgress.js
// 在網頁結尾（或是jQuery dom ready的function內）執行loadingProgress()就會自動運作
// 它有兩個function參數，一個是圖片/影片載入進度的function，另一個是結束時執行的function
// 另外還有一個預設為false的detectVideo參數，改成true的話就會偵測影片
// 其中載入進度的function可以pass一個參數，該參數會傳回目前載入的圖片/影片張數
// 使用上述兩個function就可以自己做一個自訂的載入畫面，例如有進度條的載入畫面

// DEMO（直接使用，什麼都不用做）
// loadingProgress();

// DEMO（頁面載入時console圖片/影片載入進度，全部載入後console 100）
// loadingProgress({
// 	countFN: function(count, length){
// 		console.log(Math.round(count / length * 100));
// 	},
// 	loadedFN: function(){
// 		console.log(100);
// 	},
// 	detectVideo: true
// });

// 註：
// 為避免未知錯誤，這個半透明的loading畫面預設在15秒後會自動消失，如果你有設置loadedFN也會在這時候執行

var isFunctionCalled = 0;
var head = document.getElementsByTagName("head")[0];
var body = document.getElementsByTagName("body")[0];

var _link = document.createElement("link");
_link.type = "text/css";
_link.rel = "stylesheet";
_link.href = "./js/loadingProgress.css";
document.head.appendChild(_link);

if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
	body.insertAdjacentHTML("afterbegin", '<div id="loadingProgress" class="loadingProgress"></div>');
} else {
	body.insertAdjacentHTML("afterbegin", '<div id="loadingProgress" class="loadingProgress loadingio-spinner-spinner-vtomc4kx3wi"><div class="ldio-x8u79v579re"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
}
$(function () {
	setTimeout(function () {
		if (!isFunctionCalled) {
			$(".loadingProgress").fadeOut();
		}
	});
});

loadingProgress = function (arg) {
	isFunctionCalled = 1;
	var theArg = arg || null;
	$(function () {
		/* if(navigator.appVersion.indexOf('MSIE 9.') != -1){
			$('body').append('<div id="loadingProgress" class="loadingProgress"></div><style>.loadingProgress{width:100%;height:100%;background:url(https://tw.hicdn.beanfun.com/beanfun/beanfun/common_assets/images/loading/type1.gif) 50% 50% rgba(0,0,0,.75) no-repeat;position:fixed;left:0;top:0;z-index:9999999;}</style>');
		}else{
			$('body').append('<div id="loadingProgress" class="loadingProgress loadingio-spinner-spinner-vtomc4kx3wi"><div class="ldio-x8u79v579re"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><style type="text/css">@keyframes ldio-x8u79v579re{0%{background:#404040;}100%{background:#fff;}}.ldio-x8u79v579re div{left:44px;top:2px;position:absolute;animation:ldio-x8u79v579re linear 1s infinite;background:#fff;width:14px;height:14px;border-radius:100px;transform-origin:6px 48px;}.ldio-x8u79v579re div:nth-child(1){transform:rotate(0deg);animation-delay:-0.9s;background:#fff;}.ldio-x8u79v579re div:nth-child(2){transform:rotate(36deg);animation-delay:-0.8s;background:#fff;}.ldio-x8u79v579re div:nth-child(3){transform:rotate(72deg);animation-delay:-0.7s;background:#fff;}.ldio-x8u79v579re div:nth-child(4){transform:rotate(108deg);animation-delay:-0.6s;background:#fff;}.ldio-x8u79v579re div:nth-child(5){transform:rotate(144deg);animation-delay:-0.5s;background:#fff;}.ldio-x8u79v579re div:nth-child(6){transform:rotate(180deg);animation-delay:-0.4s;background:#fff;}.ldio-x8u79v579re div:nth-child(7){transform:rotate(216deg);animation-delay:-0.3s;background:#fff;}.ldio-x8u79v579re div:nth-child(8){transform:rotate(252deg);animation-delay:-0.2s;background:#fff;}.ldio-x8u79v579re div:nth-child(9){transform:rotate(288deg);animation-delay:-0.1s;background:#fff;}.ldio-x8u79v579re div:nth-child(10){transform:rotate(324deg);animation-delay:0s;background:#fff;}.loadingio-spinner-spinner-vtomc4kx3wi{width:100%;height:100%;display:inline-block;overflow:hidden;background:rgba(0,0,0,0.75);position:fixed;left:0;top:0;z-index:999999;}.ldio-x8u79v579re{width:100px;height:100px;position:absolute;left:50%;top:50%;transform:translateZ(0) scale(0.64) translate(-50%,-50%);backface-visibility:hidden;transform-origin:0 0;}.ldio-x8u79v579re div{box-sizing:content-box;}</style>');
		} */
		var urlList = [];
		var assetList = [];
		var count = 0;
		var flag = true;
		/* if(theArg !== null){
			detectVideo = theArg.detectVideo
		}else{
			detectVideo = false;
		} */
		try {
			arg.detectVideo;
			detectVideo = arg.detectVideo;
		} catch (e) {
			detectVideo = false;
		}
		$("*").each(function () {
			if ($(this).css("background-image") != "none" && $(this).css("background-image").indexOf(",") == -1) {
				var bgUrl = $(this)
					.css("background-image")
					.replace(/"/g, "")
					.replace(/url\(|\)$/gi, "");
				if (urlList.indexOf(bgUrl) == -1) {
					urlList.push(bgUrl);
				}
			}
		});
		$("img").each(function () {
			var imgUrl = $(this)[0].src;
			if (urlList.indexOf(imgUrl) == -1) {
				urlList.push(imgUrl);
			}
		});
		if (detectVideo) {
			$("video").each(function () {
				if ($("source", this).length) {
					var vdoUrl = $("source", this)[0].src;
				} else {
					var vdoUrl = $(this)[0].src;
				}
				if (urlList.indexOf(vdoUrl) == -1) {
					urlList.push(vdoUrl);
				}
			});
		}
		$.each(urlList, function (i, v) {
			if (v.indexOf("mp4") != -1 || v.indexOf("mpg") != -1 || v.indexOf("mpeg") != -1 || v.indexOf("ogg") != -1 || (v.indexOf("avi") != -1 && detectVideo)) {
				assetList[i] = document.createElement("video");
				assetList[i].setAttribute("src", v);
			} else {
				assetList[i] = new Image();
				assetList[i].src = v;
			}
		});
		for (var i = 0; i < assetList.length; i++) {
			$(assetList[i]).on("load loadeddata error", function () {
				//current asset count
				/* if(theArg !== null){
					theArg.countFN(count, assetList.length);
				} */
				try {
					arg.countFN(count, assetList.length);
				} catch (e) {}
				count++;
				if (count == i) {
					//all assets loaded
					if (flag) {
						$(".loadingProgress").fadeOut();
						/* if(theArg !== null){
							theArg.loadedFN();
						} */
						try {
							arg.loadedFN();
						} catch (e) {}
					}
					flag = false;
				}
			});
		}
		//in case something goes wrong
		setTimeout(function () {
			if (flag) {
				$(".loadingProgress").fadeOut();
				/* theArg.loadedFN(); */
				try {
					arg.loadedFN();
				} catch (e) {}
			}
			flag = false;
		}, 15000);
	});
};
