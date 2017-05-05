// JavaScript Document
/*导航显示*/
(function() {
	var sectionlist = $('.sec-list'),
		thiswindow = $(window),
		tab_list = $('#nav').eq(0),
		tab_list_height = tab_list.height();
	var dfH = $('.banner').height();	
	//顯示隱藏 頂部導航欄
	var tab_list_Fn = function() {
		winT = $(document).scrollTop();
		if (winT > dfH) {
			if (!$('#nav').eq(0).hasClass('poFixed')) {
				$('#nav').eq(0).show();
			}
		} else {
			$('#nav').eq(0).hide();
		}
		if (!($('html,body').is(':animated'))) {
			var $section = $('.sec-list'),
				floorNum = $section.length - 1;

			$section.each(function(index, ele) {
				var $this = $(ele),
					$tTop = $this.offset().top,
					$tHeight = $this.height() / 2,
					$scroll = $(document).scrollTop();
				if ($scroll >= $tTop - tab_list_height && $scroll < $tTop + $tHeight - tab_list_height) {
					$('#nav').first().find('li').eq(index).addClass('active').siblings().removeClass('active');
				} else if ((index === 0) && $scroll < $tTop - tab_list_height) {
					$('#nav').first().find('li').eq(index).addClass('active').siblings().removeClass('active');
				} else if ((index === floorNum) && $scroll > $tTop + $tHeight - tab_list_height) {
					$('#nav').first().find('li').eq(index).addClass('active').siblings().removeClass('active');
				}
			});
		}
	};

	document.addEventListener('touchmove', function(e) {
		tab_list_Fn();
	}, false);


	thiswindow.on('scroll', tab_list_Fn);

	$('#nav li').click(function(e) {
		var that = $(this);
		that.addClass('active').siblings().removeClass('active');
		if (that.index() == 0) {
			var height = dfH + tab_list_height;
		} else {
			var height = $('.sec-list').eq(that.index()).offset().top;
		}
		$('html,body').stop().animate({
			'scrollTop': +(height - tab_list_height) + 'px'
		}, 500, tab_list_Fn);
	});
})();