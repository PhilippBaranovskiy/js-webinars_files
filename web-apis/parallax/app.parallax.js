var APP = (function(app){

	app.parallax = app.parallax || {};

	app.parallax.run = function(){
		var scrolled = $(window).scrollTop();
		$('.bg').css('top', -(scrolled*0.2)+'px');
		$('video').css('bottom', (scrolled*0.5)+'px');
	};
	app.parallax.init = function(){
		$(window).scroll(function(e){
			APP.parallax.run();
		});
		this.run();
	};

	return app;
})(APP || {});