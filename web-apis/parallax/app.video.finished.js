var APP = (function(app){

	app.video = app.video || {};

	app.video.init = function(){
		$('video')[0].play();
	};

	return app;
})(APP || {});