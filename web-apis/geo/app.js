var APP = (function(app){

	app.farest = 0;

	app.distance = function(me, data){
		var cities = [];
		data.cities.forEach(function(city){
			var d = distance({
				lat: me[0],
				lon: me[1]
			}, {
				lat: city.coords[0],
				lon: city.coords[1]
			});
			d = Math.round( d / 1000 );

			APP.farest = d > APP.farest ? d : APP.farest;
			
			cities.push({
				name: city.name,
				distance: d,
				coords: city.coords
			});
		});
		cities = _.sortBy(cities, function(city) {
			city.bar = 10 / ( APP.farest / city.distance ) * 10;
			city.id = Math.floor(Math.random()*1000000000000000000);
			return city.distance;
		});
		// cities = _.each(cities, function(city) {
		// 	city.bar = 10 / ( APP.farest / city.distance ) * 10;
		// 	city.id = Math.floor(Math.random()*1000000000000000000);
		// });
		return cities;
	};

	app.getCurrentGEO = function(){
		return new Promise(function(done, reject){
			navigator.geolocation.getCurrentPosition(function(position) {
				done([ position.coords.latitude, position.coords.longitude ]);
			});
		});
	};

	app.init = function(){

		var me;
		var requestedUri = uQuery('uri'); // get a param value from url, ?get=value&

		if ( requestedUri && requestedUri.indexOf('geo:') !== -1 ) {
			me = new Promise(function(done, reject){
				done( requestedUri.split(':')[1].split(',') );
			});
		} else {
			me = this.getCurrentGEO();
		}
		
		var coords = this.loadCoords();
		Promise.all([ me, coords ])
			.then(function(ans){
				APP.render(ans[0], ans[1]);
				loader.remove();
			});
	};

	return app;
})(APP || {});