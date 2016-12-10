(function () {
	
	if (window.windowScroller) {
		console.log('[ window.windowScroller has been already initialized ]');
		return;
	}
	
	var scroller = window.windowScroller || {};

	scroller.queue = (new function(){
		var storage = [];
		this.checkID = function (id) {
			var result = false;
			storage.forEach(function(el){
				if (!el) return;
				if (el.id === id && !result) {
					result = true;
				}
			});
			return result;
		};

		this.remove = function(id) {
			var result = false;
			storage.forEach(function(el, index, arr){
				if (!el) return;
				if (el.id === id) {
					arr.splice(index, 1);
					result = true;
				}
			});
			return result;
		};

		this.add = function (func, force) {

			var funcID;

			do {
				funcID = Math.floor(Math.random()*8917349726576234785);
			} while ( this.checkID(funcID) );

			storage.push({
				id: funcID,
				func: func
			});

			if ( force ) {
				setTimeout(func, 10);
			}

			return funcID;
		};

		this.run = function() {
			storage.forEach(function(el){
				setTimeout(el.func, 0);
			});
		};
	}());

	scroller.timerID = 0;

	window.windowScroller = scroller;

	window.addEventListener('scroll', function() {
		clearTimeout( windowScroller.timerID );
		windowScroller.timerID = setTimeout(function() {
			windowScroller.queue.run();
		}, 200);
	}, false);

})();
