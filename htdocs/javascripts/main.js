$(function(){

$.fn.isInViewport = function() {

	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};


var carousel = {
	init: function() {
		var carousel = $('.carousel');
		carousel.slick({
			dots: 			true,
			infinite: 		true,
			speed: 			300,
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


var lazyFadeIn = {
	init: function() {
		var duration = 500;
		var fadeInDuration = 500;
		$('.page section').each(function(index, element){
			var e = $(element);
			e.css('opacity', 0);
			window.lazyFadeInTimeout = window.setTimeout(function(){
				e.stop(true).animate({
					opacity: 1
				}, fadeInDuration);
			}, duration);
			duration = duration + duration/2;
		});
	}
};
lazyFadeIn.init();


var contentSectionControl = {
	sections: $('.page section.content'),
	lazyFadeIn: function() {
		$(window).scroll(() => {
			window.clearTimeout(window.lazyFadeInTimeout);
			this.sections.each((index, element) => {
				var e = $(element);
				if(e.isInViewport()) {
					e.stop(true).animate({
						opacity: 1
					}, 500);
				} else {
					e.css('opacity', 0.1);
				}
			});
		});
	}
};
contentSectionControl.lazyFadeIn();


});