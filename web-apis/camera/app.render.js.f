var APP = (function(app){

	app.insertToFeed = function(el){
		if ( _feed.children.length <= 2 ) {
			_feed.appendChild( el );
		} else {
			var refChild = _feed.children[2];
			_feed.insertBefore(el, refChild);
		}
	};

	app.render = function(videoURL){

		var record = document.createElement('video');

		record.src = videoURL;
		record.controls = true;

		APP.insertToFeed( record );
	};

	return app;
})(APP || {});