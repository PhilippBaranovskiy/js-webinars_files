var APP = (function(app){

	app.savePicture = function(){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		canvas.height = _mirror.videoHeight/2;
		ctx.drawImage(_mirror, 0, 0, canvas.width, canvas.height);

		APP.insertToFeed( canvas );
	};

	return app;
})(APP || {});