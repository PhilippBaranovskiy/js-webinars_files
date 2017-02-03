var APP = {
	subscribe: function() {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', '/channel', true);

		xhr.onreadystatechange = function() {
			if (this.readyState != 4
				|| this.status !== 200) { return; }

			APP.render( JSON.parse(this.response).task );
			setTimeout(APP.subscribe, 500);
		};

		xhr.send();
	},

	render: function(id){

		id = id.match(/\d/g);

		if ( !id ) { console.error('неверный id'); }

		var li = document.createElement('li');
		li.appendChild(document.createTextNode( 'Очередь #' + id.join('') ));
		messages.appendChild(li);
	},

	init: function(){
		this.subscribe();
	}
};

APP.init();