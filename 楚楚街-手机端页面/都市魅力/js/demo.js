// JavaScript Document
/*导航显示*/
(function() {
	var sectionlist = $('section'),
		thiswindow = $(window),
		tab_list = $('.tab').eq(0),
		tab_list_height = tab_list.height();

	//顯示隱藏 頂部導航欄
	var tab_list_Fn = function() {
		var dfH = $('header').eq(0).height();
		winT = $(document).scrollTop();
		if (winT > dfH) {
			if (!$('.tab').eq(0).hasClass('poFixed')) {
				$('.tab').eq(0).addClass('poFixed').parent().css({
					'padding-top': tab_list_height,
					'background-color': 'RGB(254,233,233)'
				});
			}
		} else {
			$('.tab').eq(0).parent().css({
				'padding-top': 0
			});
			$('.tab').eq(0).removeClass('poFixed');
		}

		if (!($('html,body').is(':animated'))) {
			var $section = $('.list'),
				floorNum = $section.length - 1;

			$section.each(function(index, ele) {
				var $this = $(ele),
					$tTop = $this.offset().top,
					$tHeight = $this.height() / 2,
					$scroll = $(document).scrollTop();
				if ($scroll >= $tTop - tab_list_height && $scroll < $tTop + $tHeight - tab_list_height) {
					$('.tab').first().find('li').eq(index).addClass('cur').siblings().removeClass('cur');
				} else if ((index === 0) && $scroll < $tTop - tab_list_height) {
					$('.tab').first().find('li').eq(index).addClass('cur').siblings().removeClass('cur');
				} else if ((index === floorNum) && $scroll > $tTop + $tHeight - tab_list_height) {
					$('.tab').first().find('li').eq(index).addClass('cur').siblings().removeClass('cur');
				}
			});
		}
	};

	document.addEventListener('touchmove', function(e) {
		tab_list_Fn();
	}, false);


	thiswindow.on('scroll', tab_list_Fn);

	$('.tab li').click(function(e) {
		var that = $(this);
		that.addClass('cur').siblings().removeClass('cur');
		if (that.index() == 0) {
			var height = $('header').eq(0).height() + tab_list_height;
		} else {
			var height = $("#" + that.index()).offset().top;
		}
		$('html,body').stop().animate({
			'scrollTop': +(height - tab_list_height) + 'px'
		}, 500, tab_list_Fn);
	});
})();