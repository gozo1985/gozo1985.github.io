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

});