var APP = {
	keys: document.querySelectorAll('.key'),
	audios: document.querySelectorAll('audio'),

	checkCode: function(element, type, code){
		return element.classList.contains('js_' + type + '-' + code);
	},

	removeTransition: function(key) {
		if ( key.propertyName !== 'transform' ) { return; }
		key.target.classList.remove('playing');
	},
	playSound: function(keyEvent){
		var key = [].filter.call(APP.keys, function(key){
			return APP.checkCode(key, 'key', keyEvent.keyCode);
		});
		key = key[0] || false;
		if ( !key ) { return; }
		
		var audio = [].filter.call(APP.audios, function(audio){
			return APP.checkCode(audio, 'audio', keyEvent.keyCode);
		});
		audio = audio[0];

		if ( !audio && !key ) { return; }

		try {
			key.classList.add('playing');
		} catch (err) { console.log(err); }
		
		try {
			audio.currentTime = 0;
			audio.play();
		} catch (err) { console.log(err); }
	}
};

[].forEach.call(APP.keys, function(key){
	key.addEventListener('transitionend', APP.removeTransition);
});

document.addEventListener('keydown', APP.playSound);