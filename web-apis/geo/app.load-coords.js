var APP = (function(app){

	app.loadCoords = function(){
		return new Promise(function(done, reject){
			var xhr = new XMLHttpRequest();
			xhr.open('get', 'coords.json');
			xhr.addEventListener('load', function(){
				if ( this.status !== 200 ) {
					console.error('data is not loaded');
					reject();
				} else {
					var resp = this.response;
					try {
						resp = JSON.parse( resp );
					
					} catch (err) { console.error(err); }

					done( resp );
				}

			});
			xhr.send();
		});
	};

	return app;
})(APP || {});