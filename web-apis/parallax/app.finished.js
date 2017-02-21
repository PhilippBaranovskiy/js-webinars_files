navigator.getBattery().then(function(battery) {

	// battery.level * 100
	// battery.charging

	console.log(battery.level * 100, battery.charging);

	if ( battery.level * 100 < 30 && !battery.charging ) {
		return;
	}

	APP.parallax.init();
	APP.video.init();

});