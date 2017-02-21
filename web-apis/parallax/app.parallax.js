var APP = (function(app){

	app.parallax = app.parallax || {};

	app.parallax.run = function(){
		var scrolled = $(window).scrollTop();
		$('.bg').css('top', -(scrolled*0.2)+'px');
		$('video').css('bottom', (scrolled*0.5)+'px');
	};
	
	$(window).scroll(function(e){
		APP.parallax.run();
	});
	app.parallax.run();

	return app;
})(APP || {});