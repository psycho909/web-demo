$(function(){
	var flag_pc=1;
	var $_window=$(window);
	var $main_visual = $('#main_visual');
	//var $item_bg = $('.moving_item_bg');
	// var $item_chocobo_01 = $('.moving_item_chocobo_01');
	// var $item_chocobo_02 = $('.moving_item_chocobo_02');
	// var $item_chocobo_03 = $('.moving_item_chocobo_03');
	// var $item_chocobo_04 = $('.moving_item_chocobo_04');
	//var $item_grass = $('.moving_item_grass');
	var itemLi =$main_visual.find('.move_item');

	var visualWidth = $main_visual.width();


	$main_visual.mousemove(function(e){
		if(flag_pc){
			var cursorX = e.clientX - $main_visual.offset().left;
			var cursorY = e.clientY - $main_visual.offset().top;
			var i=0.5;
			// $(this).find('.move_item').each(function(){
			// 	// =====
			// 	var imgCentetX=$(this).offset().left+($(this).width()/2);
			// 	var imgCentetY=$(this).offset().top+($(this).height()/2);
			// 	var distX=(cursorX-imgCentetX)*i/50;
			// 	var distY=(cursorY-imgCentetY)*i/50;
			// 	// =====
			// 	// var item_width = $(this).width();
			// 	// var wrapperWidth =$_window.width();
			// 	// var wrapperHeight =(wrapperWidth-0)/1.26;
			// 	// var centerX = wrapperWidth / 2;
			// 	// var centerY = wrapperHeight / 2;
			// 	// var newLeft = ((cursorX - centerX) * (i) / 100) * (-1);
			// 	// var newTop = (cursorY - centerY) * (i) / 100 * (-1);
			//	//	===========
			// 	$(this).css({'transform':'translate3d('+distX+'px,'+ distY+'px, 0)'});
			// 	i= i*2;
			// });
			var a_imgCentetX=$('.m02').offset().left+($('.m02').width()/2);
			var a_imgCentetY=$('.m02').offset().top+($('.m02').height()/2)
			var a_distX=(cursorX-a_imgCentetX)*i/20
			var a_distY=(cursorY-a_imgCentetY)*i/20
			var b_imgCentetX=$('.m03').offset().left+($('.m03').width()/2);
			var b_imgCentetY=$('.m03').offset().top+($('.m03').height()/2)
			var b_distX=-(cursorX-b_imgCentetX)*i/20
			var b_distY=-(cursorY-b_imgCentetY)*i/20
			$('.m02').css({'transform':'translate3d('+a_distX+'px,'+ a_distY+'px, 0)'})
			$('.m03').css({'transform':'translate3d('+b_distX+'px,'+ b_distY+'px, 0)'})
		}
	});
})