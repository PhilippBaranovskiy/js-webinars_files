var APP = (function(app){

	app.render = function(me, data){

		var cities = this.distance(me, data);

		var source   = _cities.innerHTML;
		var template = Handlebars.compile(source);
		var html    = template({ cities: cities });
		_citiesHolder.innerHTML = html;

		setTimeout(function(){
			// APP.animateBars( cities );
		}, 100);
	};

	return app;
})(APP || {});