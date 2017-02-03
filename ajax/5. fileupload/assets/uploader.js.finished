var APP = (function(app){

	var up = app.uploader = app.uploader || {};

	up.send = function(instance){

		APP.notifier.update(instance.id, 0);

		var data = new FormData();

		data.append( 'file_'+instance.id, instance.file );

		var request = new XMLHttpRequest();
		request.open('POST', APP.form.action);

		request.onprogress = function(pe) {
			if (pe.lengthComputable) {
				APP.notifier.update(instance.id, pe.loaded);
			}
		};
		request.onloadend = function(pe) {
			APP.notifier.update(instance.id, 100);
		};

		request.send(data);
	};

	return app;
})(APP || {});