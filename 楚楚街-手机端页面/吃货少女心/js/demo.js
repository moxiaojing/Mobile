// JavaScript Document
/*页面基础*/
$(function(){
	var  arrzzy = [],
	allwidth = 0;
	$('#drag').one('width',function(){
		/*设置导航栏宽度，用自定义事件执行一次，在导航栏显示的时候出发事件，设置宽度*/
		var lentab= 0;
		$('#drag li').each(function(i,e){
			var liwidth = $(e)[0].getBoundingClientRect().width;
			lentab+= liwidth;
			arrzzy.push(liwidth);
		});
		allwidth = lentab+20;
		$('#drag').width(allwidth);	
	});
	function startWidth(i){
		var width = 0;
		var r= 0;
		var tbbcon = $('.tab_1_con').width()-51;
		$.each(arrzzy,function(index, e) {
			if(index<=i){
				width += e;
			}
		});
		if(width<tbbcon){
			r = 10;
		}else{
			r = (tbbcon-width);
		}
		return r;
	}
	/*tab栏悬浮*/
	$(window).scroll(function(e) {
		var winH = $(window).height(),	
			winT = $(document).scrollTop();		
		if(winT > winH){
			$('#fhtop').show();		
		}else{
			$('#fhtop').hide();		
		}
		/*以上判断屏幕滚动一定位置时出现返回按钮*/
		
		var $pack = $('.pack'),
		$tab_1_con = $pack.find('.tab_1_con'),
		$section = $('div.list'),
		win = $(window),
		wH = win.height(),
		wX = $tab_1_con.width()-51,
		$li_len = $section.length;
		$pack.css('z-index',100);
		$('#zhe').hide();
		if($(window).scrollTop() > $('#img_height').height()-1.5*$tab_1_con.height()){
			$pack.addClass('poFixed').show();
			$('#drag').trigger('width');
		}else {
			$pack.removeClass('poFixed').hide();
		}
		$section.each(function(index, element) {
			var $this = $(element),
			$position = $this[0].getBoundingClientRect();
			if($position.top <wH/5 && ($position.top+$position.height) >= wH/5){
				var $tab_li = $tab_1_con.find('li').eq(index),
				li_p = $tab_li[0].getBoundingClientRect();
				$tab_li.addClass('cur').siblings().removeClass('cur');
				$('.pack div:eq(0) li:eq('+index+')').addClass('cur').siblings().removeClass('cur');
				var yidong = wX-(li_p.left+li_p.width),
				$s_left = 0;
				try{
					var strTrans = $('#drag')[0].style.transform,
					f_trans = parseFloat(strTrans.replace(/[translate3d|\(|\)]/g,'').split(',')[0])||0;
					$s_left = f_trans;
				}catch(err){
					console.log(err);
				}
				$('#drag')[0].style.webkitTransform = 'translate3d('+(startWidth(index+1))+'px,0px,0px)';
			}
			if(index === ($li_len-1) && $position.top<wH/2){
				$tab_1_con.find('li').eq(index).addClass('cur').siblings('.cur').removeClass('cur');
				$('.pack div:eq(0) li:eq('+(index)+')').addClass('cur').siblings('.cur').removeClass('cur');
				$('#drag')[0].style.webkitTransform = 'translate3d('+($tab_1_con.width()-51-allwidth)+'px,0px,0px)';
			}
		});
	});
	/*楼层跳转*/
	$('#floorImg p').click(floorClick(1));
	$('.tab li,#drag li').click(floorClick(0));
	function floorClick(n){
  	    return function(){
  	    	var $this = $(this),
			$index;
  	    	if(n===0){
  	    		$index = $this.index()
  	    	}else{
				$index = $this.attr('lc');
  	    	}
			$('.tab_1_con').show().siblings().hide();
			$('.pack').css('z-index',100);
			$('#zhe').hide();
			var floors = $('.list'),
			eq_floors = floors.eq($index);
			if(eq_floors.length){
				var height = eq_floors.offset().top,
				tab_height = $('.tab_1_con').height();
				$('body,html').stop().animate({'scrollTop':+(height-tab_height-10)+'px'},500);	
			}
  	    }		
	}

	var $drag = $('#drag'),
	$pack = $('.pack');
	$('p.dw').on('touchstart',function(){
		var $this = $(this),
		index = $this.data('index');
		$pack.children('div:eq('+index+')').hide().siblings().show(),
		$fixed = $this.parents('.poFixed');
		if(index){
			$('#zhe').show();
			$fixed.css('z-index',230);
		}else{
			$('#zhe').hide();
			$fixed.css('z-index',100);
		}
	});
	$drag.on('touchstart',function(e){
		var $this = $(this),
		$ev = e,
		$s_x = $ev.originalEvent.changedTouches[0].pageX,
		$s_left = $this.position().left,
		l_width = $this.parent().width(),
		ul_width = $this.width(),
		li_width = $this.find('li').eq(0).width(),
		fanwei = l_width - ul_width-li_width/2,
		$m_left = 0;
		try{
			var strTrans = $this[0].style.transform,
			f_trans = parseFloat(strTrans.replace(/[translate3d|\(|\)]/g,'').split(',')[0])||0;
			$s_left = f_trans;
		}catch(err){
			console.log(err);
		}
		$this.on('touchmove',function(a){
			$this.css({'transition':''});
			var $ea = a,
			$m_x = $ea.originalEvent.changedTouches[0].pageX,
			$m_offset_x = $m_x-$s_x;
			$m_left = $m_offset_x+$s_left;
			$this[0].style.webkitTransform = 'translate3d('+$m_left+'px,0px,0px)';
		});
		$this.on('touchend',function(){
			if($m_left>=10){
				$this[0].style.webkitTransform = 'translate3d(0px,0px,0px)';
			}
			if($m_left<=fanwei){
				$this[0].style.webkitTransform = 'translate3d('+fanwei+'px,0px,0px)';
			}
			$this.css({'transition':'transform 0.5s cubic-bezier(0.40, 0.85, 0.25, 1) 0s'});
			$this.off('touchmove');
			$this.off('touchend');
		});
		e.stopPropagation();
		//return false;
	});
	$('.top').on('click',function(){
		var pop = $('.popuplayer');
		pop.show();
		pop.find('.layer_box').animate({'bottom':0},200);
		pop.find('.layer,.close').on('click',function(){
			pop.find('.layer_box').animate({'bottom':-134},200).end().hide();
		});	
	})	
	
})