var APP = (function(app){

	app.online = true;

	app.isOnline = function(){
		return new Promise(function(done, reject){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if ( this.readyState !== 2) { return; }
				if ( this.status === 200 && APP.online ) {
					xhr.abort();
					done();
				} else {
					reject();
				}
			};
			xhr.open('get', document.location.href);
			xhr.send();
		});
	};

	app.save = function(){ /* save to the cloud */ console.log('[ saved to cloud ]', arguments); };

	app.backup = function(){
		console.log('backing up…');
		
		localStorage.setItem('title', title.innerHTML);
		localStorage.setItem('text', text.innerHTML);

		console.log('backed up.');
	};

	app.restore = function(){
		var _title = localStorage.getItem('title', title.innerHTML);
		var _text = localStorage.getItem('text', text.innerHTML);

		if (_title) {
			title.innerHTML = _title;
		}
		if (_text) {
			text.innerHTML = _text;
		}
	};

	app.check = function(battery){
		console.log('Charging is ', battery.charging);
		console.log('Energy level is ', battery.level * 100);
		if ( battery.level * 100 <= 2 && !battery.charging ) {
			this.isOnline()
				.then(this.save)
				.catch(this.backup);
		}
	};

	app.init = function(){
		navigator.getBattery().then(function(battery) {
			
			APP.check(battery);
			
			battery.addEventListener('chargingchange', function(){
				APP.check(battery);
			});
			battery.addEventListener('levelchange', function(){
				APP.check(battery);
			});
		});
		this.restore();

		loader.remove();

		window.addEventListener('beforeunload', function (e) {
			APP.backup();
		});
	};

	return app;
})(APP || {});