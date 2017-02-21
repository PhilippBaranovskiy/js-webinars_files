var APP = (function(app){

	app.recorder = app.recorder || {};

	app.recorder.start = function(stream){

		return new Promise(function(done, reject){

			var r = APP.recorder;

			r.instance = new MediaRecorder(stream);

			r.instance.start();
			console.log( r.instance.state );

			r.chunks = [];
			r.instance.ondataavailable = function(e) {
				APP.recorder.chunks.push( e.data );
				done();
			};
		});
	};

	app.recorder.stop = function(){
		this.instance.stop();
		console.log(this.instance.state);
	};

	app.recorder.get = function(){

		var type = this.chunks[0].type;

		var data = new Blob(this.chunks, { 'type' : type });

		return window.URL.createObjectURL( data );
	};

	app.recorder.flush = function(url){
		this.chunks = [];
		window.URL.revokeObjectURL(url);
	};

	return app;
})(APP || {});