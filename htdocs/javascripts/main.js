$(function(){


//jQuery function for checking if an element is in viewport or not
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


// Responsive breakpoints, data-attributes on body and global scope vars
var responsive = {
	init: function() {
		var win = $(window);
		var body = $('body');
		var viewportWidth = win.outerWidth();
		window.device = 'desktop';
	
		win.on('resize scroll', function(){
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
		}).resize().scroll();
	}
};
responsive.init();


// jQuery slick plugin for a simple carousel (selector: '.carousel')
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


// Sections fade in/out when in viewport. Comment out init function call to remove effect. (selector: 'section.content')
var sectionsFadeIn = {
	init: function() {
		var win = $(window);

		$('.page section.content').each(function(index, element){
			var e = $(element);

			e.addClass('opacity-0');

			win.on('resize scroll', function(){
				if(e.isInViewport()) {
					e.addClass('in-view');
					e.removeClass('opacity-0');
				} else {
					e.removeClass('in-view');
					e.addClass('opacity-0');
				}
			}).resize().scroll();
		});
	}
};
sectionsFadeIn.init();


// Main navigation with sub sticky, responsive with burger icon on smartphones
var mainNav = {
	nav: $('nav#main'),
	navList: $('nav#main').find('ul').first(),

	sticky: () => {
		var nav = mainNav.nav;
		var win = $(window);
		var isSticky = false;
		var toleranceTop = nav.outerHeight() * (-1);

		win.on('resize scroll', function(){
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
		var navSlideDuaration = 300;

		iconMenu.on('click.icon-menu',function(){
			mainNav.navList.slideToggle(navSlideDuaration);
		});

		win.on('resize scroll', function(){
			(window.device !== 'phone') ? mainNav.navList.removeAttr('style') : false;
		});
	},

	subnav: () => {
		var subnav = mainNav.nav.find('#sub');
		var mainNavLinks = mainNav.nav.find('a');
		var subnavSlideDuaration = 300;
		var iconUp = subnav.find('.icon-circle-up');

		subnav.addClass('hidden');

		mainNavLinks.each(function(index, element){
			var e = $(element);

			e.on('click.subnav', function(event){
				event.preventDefault();

				subnav.slideDown(subnavSlideDuaration, function(){
					subnav.removeClass('hidden').addClass('box-shadow');
					iconUp.show();
				});
			});
		});

		iconUp.on('click.close', function(event){
			
			iconUp.hide();
			
			subnav.slideUp(subnavSlideDuaration, function(){
				subnav.addClass('hidden').removeClass('box-shadow');
			});
		});
	}
}
mainNav.sticky();
mainNav.phone();
mainNav.subnav();


// Sections with respnsive video as background (selector: 'section.video-bg')
var videoBg = {
	init: function() {
		var win = $(window);
		var videoSection = $('section.video-bg');
		var videoWrapper =  videoSection.find('.video-wrapper');
		var video = videoWrapper.find('video');

		var videoResponsive = function() {
			if (window.device !== 'desktop') {
				videoSection.height(video.css('min-height'));
				videoMargin = (win.width() - video.outerWidth()) / 2;
				video.css('margin-left', videoMargin);
			} else {
				videoSection.height(video.outerHeight());
				video.css('margin-left', 0);
			}
		};

		video.bind('load resize', function(){
			videoResponsive();
		});
		win.on('resize scroll', function(){
			videoResponsive();
		});
	}
}
videoBg.init();


});