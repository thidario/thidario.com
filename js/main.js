var $ = jQuery.noConflict();
var fadeLock = false;


function changePage(page)
{
	if (fadeLock) {
		return;
	}

	fadeLock = true;
	$('.section').removeClass('show');
	setTimeout(function() {
		window.location = page;

		fadeLock = false;
	}, 400);
}

function setupScratch()
{
	$('#menu span.masked').wScratchPad({
		size        : 50,
		bg          : '#ffffff',
		fg          : '#9a9a99',
		realtime    : true,
		scratchDown : null,
		scratchUp   : null,
		scratchMove : function(e, percent) {
			if (percent > 80) {
				$(e.target).parent().addClass('unmasked');
			}
		},
		cursor      : 'crosshair'
	});


	$('.pageContent .masked').wScratchPad({
		size        : 10,
		bg          : '#ffffff',
		fg          : '#9a9a99',
		realtime    : true,
		scratchDown : null,
		scratchUp   : null,
		scratchMove : null,
		cursor      : 'crosshair'
	});


	$('.imgMasked').wScratchPad({
		size        : 35,
		bg          : '#ffffff',
		fg          : '#9a9a99',
		realtime    : true,
		scratchDown : null,
		scratchUp   : null,
		scratchMove : null,
		cursor      : 'crosshair'
	});

	$('.pageContent .contactMasked').wScratchPad({
		size        : 35,
		bg          : '#ffffff',
		fg          : '#9a9a99',
		realtime    : true,
		scratchDown : null,
		scratchUp   : null,
		scratchMove : function(e, percent) {
			if (percent > 85) {
				$(e.target).parent().addClass('unmasked');
			}
		},
		cursor      : 'crosshair'
	});
}

/*
window.onpageshow = function(event) {
  if (event.persisted) {
      window.location.reload(); 
  }
};
*/

$(document).ready(function() {

	setupScratch();

	if (!isMobile) {
		$(window).resize(function() {
			$('#menu span.masked').wScratchPad('reset');
			$('.pageContent .masked').wScratchPad('reset');
			$('.imgMasked').wScratchPad('reset');
			$('.pageContent .contactMasked').wScratchPad('reset');
			setupScratch();
		});
	}

	if ($('#portfolio').length || $('#about').length) {
		$('body').imagesLoaded( function() {
			$(window).resize();
			$('body').addClass('loaded');
			setupScratch();
		});

		setTimeout(function() {
			$(window).resize();
			setupScratch();
		}, 200);
	} else {
		
		$('body').addClass('loaded');
	}


	$('#menu canvas').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
	});

	if (!isMobile) {
		$('#menu .row1 span').click(function() {
			changePage('about.html');
		});

		$('#menu .row2 span').click(function() {
			changePage('portfolio.html');
		});

		$('#menu .row3 span').click(function() {
			changePage('contact.html');
		});
	} else {
		$('#menu .row1 span').click(function() {
			changePage('about.html');
		});

		$('#menu .row2 span').click(function() {
			changePage('portfolio.html');
		});

		$('#menu .row3 span').click(function() {
			changePage('contact.html');
		});
	}

	$('.back').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.section').removeClass('show');
		setTimeout(function() {
			window.location = 'index.html';
		}, 400);
	});

	if (!isMobile) {
		$('#menu span').mouseenter(function() {
			if ($(this).hasClass('masked') && !$(this).hasClass('unmasked')) {
				return;
			}
			$(this).parent().addClass('hover');
		});

		$('#menu span').mouseleave(function() {
			$('#menu .row').removeClass('hover');
		});
	}
});