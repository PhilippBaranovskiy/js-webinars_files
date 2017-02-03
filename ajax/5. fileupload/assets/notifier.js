var APP = (function(app){

	var ntf = app.notifier = app.notifier || {};

	ntf.update = function(id, amount){
		var target = document.getElementById(id);
		if ( !target ) { return; }
		target.value = amount;
	};

	return app;
})(APP || {});