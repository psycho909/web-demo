document.addEventListener("DOMContentLoaded", function (event) {
	//判斷是否為行動裝置
    function isMobile () {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
	}
	var winW=window.innerWidth;
	if(winW <= 750 || isMobile ()){
		// init time
		var nowTime=new Date();
		var nowYear=nowTime.getFullYear();
		var mainTarget = document.getElementById('bfm-footer');
		var footerHTML='<div class="bfm-footer">'
					+'<div class="ghq-logo"><a href="https://gamaniagroup.com/" target="_blank"></a></div>'
					+'<div class="copyright">©'+nowYear+' Gamania Digital Entertainment Co., Ltd. All Rights Reserved.</div>'
					'</div>';

		document.body.insertAdjacentHTML('beforeEnd', footerHTML);

	}
});