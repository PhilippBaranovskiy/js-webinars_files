var APP = {
	getTask: function() {
		var xhr = new XMLHttpRequest();
		
		xhr.open('POST', '/task', true);

		xhr.onreadystatechange = function() {
			if (this.readyState !== 4
				|| this.status !== 200) { return; }

			APP.render( JSON.parse(this.response).task );
		};

		xhr.send();

		return false;
	},
	
	render: function(id){

		id = id.match(/\d/g);

		if ( !id ) { console.error('неверный id'); }

		var li = document.createElement('li');
		li.appendChild(document.createTextNode( 'Задача #' + id.join('') ));
		messages.appendChild(li);
	},

	init: function(){
		get.onclick = this.getTask;
	}
};

APP.init();