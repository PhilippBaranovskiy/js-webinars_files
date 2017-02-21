var APP = (function(app){

	app.recordRun = function(){

		// set needed mode.
		APP.recording = !APP.recording;

		if ( APP.recording ) {
			// is recording...
			
			APP.recordProcessing = APP.recorder.start( APP.stream );
			this.innerText = 'Stop recording';
		
		} else {
			// is not recording.

			APP.recorder.stop();
			this.innerText = 'Record';

			console.log('processing…');
			
			APP.recordProcessing.then(function(){

				APP.render( APP.recorder.get() );
				APP.recorder.flush();
				console.log('record has been processed.');
			});
		}		
	};

	app.init = function(){
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(function(stream) {
				_loader.remove();
				APP.stream = stream;
				_mirror.srcObject = stream;
				_mirror.play();
			})
			.catch(function (err) { console.error(err); });

		_take.addEventListener('click', app.takePicture);
		_save.addEventListener('click', app.savePicture);
		_record.addEventListener('click', app.recordRun);
	};

	return app;
})(APP || {});