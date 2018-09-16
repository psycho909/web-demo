	/*------------------------
		lineup
	------------------------*/
	var articles = $('#lineup .title_lineup li a article.sp_non .inner_box'),
		lightingRgb = '255,255,255';
	
	articles.mousemove(function(e) {
		var current = $(this),
			x = current.width() - e.offsetX * 2,
			y = current.height() - e.offsetY * 2,
			rx = -x / 30,
			ry = y / 24,
			deg = Math.atan2(y, x) * (180 / Math.PI) + 45;
		current.css({"transform":"scale(1.05) rotateY("+rx+"deg) rotateX("+ry+"deg)"});
		$('.lighting',this).css('background','linear-gradient('+deg+'deg, rgba('+lightingRgb+',0.32) 0%, rgba('+lightingRgb+',0) 100%)');
	});
	
	articles.on({
		'mouseenter':function() {
			var current = $(this);
			current.addClass('enter ease').removeClass("leave");
			setTimeout(function(){
				current.removeClass('ease');
			}, 400);
		},
		'mouseleave':function() {
			var current = $(this);
			current.css({"transform":"rotate(0)"});
			current.removeClass('enter').addClass("leave");
			$('.lighting',this).removeAttr('style');
		}}
	);