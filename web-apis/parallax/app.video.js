var APP = (function(app){

	app.video = app.video || {};

	app.video.init = function(){
		$('video')[0].play();
	};

	app.video.init();

	return app;
})(APP || {});