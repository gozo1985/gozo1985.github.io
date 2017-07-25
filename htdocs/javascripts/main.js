$(function(){

$.fn.isInViewport = function(toleranceTop = 0, toleranceBottom = 0, toleranceLeft = 0, toleranceRight = 0){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + toleranceRight + win.width();
    viewport.bottom = viewport.top + toleranceBottom + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + toleranceLeft + this.outerWidth();
    bounds.bottom = bounds.top + toleranceTop + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var responsive = {
	init: function() {
		var win = $(window);
		var body = $('body');
		var viewportWidth = win.outerWidth();
		window.device = 'desktop';
	
		win.resize(function(){
			var viewportWidth = win.outerWidth();
		
			switch(true) {
				case (viewportWidth <= 600):
					window.device = 'phone';
					body.attr('data-device', 'phone');
				break;

				case (viewportWidth > 600 && viewportWidth <= 1024):
					window.device = 'tablet';
					body.attr('data-device', 'tablet');
				break;

				default:
					window.device = 'desktop';
					body.attr('data-device', 'desktop');
			}
		});
		body.resize();
	}
};
responsive.init();


var carousel = {
	init: function() {
		var carousel = $('.carousel');

		carousel.slick({
			lazyLoad: 		'ondemand',
			dots: 			true,
			infinite: 		true,
			fade: 			true,
			speed: 			700,
			slidesToShow: 	1,
			adaptiveHeight: true,
			centerMod: 		true,
			adaptiveHeight: true
		}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var data = {'event':'command','func':'pauseVideo','args':''};
			var message = JSON.stringify(data);
			var iframe = $('iframe', slick.$slides[currentSlide])[0];
			if (iframe) {
				iframe.contentWindow.postMessage(message, '*');
			}
		});
	}
};
carousel.init();


var sectionsFadeIn = {
	init: function() {
		var win = $(window);
		var body = $('body');

		$('.page section.content').each(function(index, element){
			var e = $(element);
			win.scroll(function(){
				if(e.isInViewport()) {
					e.addClass('in-view');
				} else {
					e.removeClass('in-view');
				}
			});
		});
		body.scroll();
	}
};
sectionsFadeIn.init();


var mainNav = {
	nav: $('nav#main'),
	navList: $('nav#main').find('ul').first(),

	sticky: () => {
		var nav = mainNav.nav;
		var win = $(window);
		var isSticky = false;
		var toleranceTop = nav.outerHeight() * (-1);

		win.scroll(function(){
			var navNextElement = nav.next();
			var navNextElementBounds = navNextElement.offset();
			var navInitPosTop = navNextElementBounds.top + toleranceTop;

			if (nav.isInViewport(toleranceTop) && !isSticky) {
				nav.removeClass('sticky');
			} else if (win.scrollTop() <= navInitPosTop) {
				nav.removeClass('sticky');
				isSticky = false;
			} else {
				nav.addClass('sticky');
				isSticky = true;
			}
		});
	},

	phone: () => {
		var win = $(window);
		var iconMenu = mainNav.nav.find('div.icon-menu');
		var navMenuSlideDuaration = 300;

		iconMenu.on('click.icon-menu',function(){
			mainNav.navList.slideToggle(navMenuSlideDuaration);
		});

		win.resize(function(){
			(window.device !== 'phone') ? mainNav.navList.removeAttr('style') : false;
		});
	},
}
mainNav.sticky();
mainNav.phone();


});