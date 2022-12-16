var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
// player.playVideo()
// player.pauseVideo()
// player.stopVideo()
// player.seekTo(20) 指定秒數
// player.destroy();
// player.mute()
function onYouTubeIframeAPIReady() {
	player = new YT.Player("video", {
		playerVars: {
			controls: 0,
			modestbranding: 0,
			showinfo: 0,
			rel: 0,
			loop: 1,
			fs: 0, // 顯示全螢幕按鈕
			cc_load_policty: 0, // 隱藏字幕
			iv_load_policy: 3, // 隱藏影片註解
			autohide: 0, // 播放影片時隱藏影片控制列
		},
		events: {
			onReady: function (e) {
				e.target.playVideo();
				e.target.mute();
				$(".gbox-close").show();
			},
			onStateChange: function (e) {
				// 0 (end)
				// 1 (play)
				// 3 (buffer)
				if (e.data === 0) {
					player.playVideo();
				}
			},
		},
	});
}

// 需要加上
// enablejsapi=1
var videoHTML = '<div class="video-box"><iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/0D0CSOjE8oU?playsinline=1&amp;autoplay=1&amp;mute=1&amp;rel=0;enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
var videoObj = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: false,
	afterClose: function () {
		$.gbox.close();
		player.destroy();
	},
	afterOpen: function () {
		$(".gbox-close").hide();
		if (player) {
			if (player.h == null) {
				onYouTubeIframeAPIReady();
			}
		}
	},
};
