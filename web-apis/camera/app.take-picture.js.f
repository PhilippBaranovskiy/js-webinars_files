var APP = (function(app){

	app.takePicture = function(){
		var ctx = _canvas.getContext('2d');

		_canvas.height = _mirror.videoHeight/2;
		ctx.drawImage(_mirror, 0, 0, _canvas.width, _canvas.height);
	};

	return app;
})(APP || {});