var APP = (function(app){
	app.animateBars = function(cities){
		[].forEach.call(document.querySelectorAll('.bar'), function(bar){
			bar.style.width = _.find(cities, function(city){ return bar.id == city.id }).bar + '%';
		});
	};

	return app;
})(APP || {});