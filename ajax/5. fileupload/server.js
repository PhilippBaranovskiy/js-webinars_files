const http = require('http');
const fs = require('fs');
const url = require('url');

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();



app.use(express.static(__dirname + '/assets'));
app.use(fileUpload());



app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.post('/upload', function(req, res) {

	for (var id in req.files) {
		if( req.files.hasOwnProperty(id) ) {
			console.log(req.files[id].name + ':', req.files[id].mimetype);
		} 
	}

	res.setHeader('Content-Type', 'application/json');
	res.send('{ "status": "Uploaded!" }');
});



http.Server(app).listen(3000, function(){
	console.log('listening on *:3000');
});