	var innerBox=document.getElementById("inner_box")
	innerBox.addEventListener("mousemove",function(e){
		var s=30;
		var current=this;
		var x=current.offsetWidth - e.offsetX*2;
		var y=current.offsetHeight - e.offsetY*2;
		var rx=-x/s;
		var ry=y/s;
		current.style.transform="scale(1) rotateY("+rx+"deg) rotateX("+ry+"deg)";
	})
	innerBox.addEventListener('mouseenter',function(){
		console.log("mouseenter")
		var current=this;
		current.classList.add('enter','ease');
		current.classList.remove('leave')
		setTimeout(function(){
			current.classList.remove('ease')
		},400)
	})
	innerBox.addEventListener('mouseleave',function(){
		var current=this;
		current.style.transform="rotate(0)"
		current.classList.remove('enter')
		current.classList.add('leave')
	})
	
	/*------------------------
		lineup
	------------------------*/
	// var articles = $('.inner_box'),
	// 	lightingRgb = '255,255,255';
	
	// articles.mousemove(function(e) {
	// 	var current = $(this),
	// 		x = current.width() - e.offsetX * 2,
	// 		y = current.height() - e.offsetY * 2,
	// 		rx = -x / 30,
	// 		ry = y / 30
	// 		// ry = y / 24

	// 	current.css({"transform":"scale(1.05) rotateY("+rx+"deg) rotateX("+ry+"deg)"});
	// 	// $('.lighting',this).css('background','linear-gradient('+deg+'deg, rgba('+lightingRgb+',0.32) 0%, rgba('+lightingRgb+',0) 100%)');
	// });
	
	// articles.on({
	// 	'mouseenter':function() {
	// 		var current = $(this);
	// 		current.addClass('enter ease').removeClass("leave");
	// 		setTimeout(function(){
	// 			current.removeClass('ease');
	// 		}, 400);
	// 	},
	// 	'mouseleave':function() {
	// 		var current = $(this);
	// 		current.css({"transform":"rotate(0)"});
	// 		current.removeClass('enter').addClass("leave");
	// 		$('.lighting',this).removeAttr('style');
	// 	}}
	// );