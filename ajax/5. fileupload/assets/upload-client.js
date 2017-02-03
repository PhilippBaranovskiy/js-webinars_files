var APP = (function(app){

	app.form = form;
	app.fileInput = form.elements.files;
	app.fileList = fileList;
	app.template = function(){
		return fileItem.content.children[0];
	};



	app.rnd = function(){ return Math.floor(Math.random()*1000000000000000000); };

	app.form.addEventListener('submit', function(submitEvent){

		submitEvent.preventDefault();
		
		[].forEach.call(APP.fileInput.files, function(file){
			file = {
				id: APP.rnd(),
				file: file
			};
			APP.uploader.send( file );
			APP.insertToPage( file );
		});
	}, false);

	app.fileInput.addEventListener('change', function(){
		APP.form.dispatchEvent( new Event('submit', { 'cancelable': true }) );
	}, false);

	app.render = function(instance){

		var file = instance.file;

		this.html = APP.template();

		this.html.querySelector('.file__preview').innerHTML = '';
		if ( file.type.match(/^image\//g) ) {
			var pic = document.createElement('img');
			pic.src = URL.createObjectURL( file );
			pic.onload = function(){
				URL.revokeObjectURL(this.src);
			};
		}
		this.html.querySelector('.file__preview').appendChild(pic);

		this.html.querySelector('.file__name').innerHTML = document.createTextNode( file.name ).textContent;
		this.html.querySelector('.file__size').innerHTML = document.createTextNode( APP.getSize(file) ).textContent;
		this.html.querySelector('.file__progress progress').id = instance.id;

		return document.importNode(this.html, true);
	};

	app.insertToPage = function(instance){

		var html = new this.render(instance);

		this.fileList.appendChild( html );

		html = null;
	};

	app.getPreview = function(file){
		return URL.createObjectURL( file );
	};
	app.getSize = function(file){
		return filesize(file.size);
	};

	return app;
})(APP || {});