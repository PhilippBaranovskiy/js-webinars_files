const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function(from, out){
	const urlParsed = url.parse(from.url);
	out.setHeader('Content-Type', 'application/json');

	switch (urlParsed.pathname) {
		
		case '/':
			out.setHeader('Content-Type', 'text/html');
			render('index.html', out);
			break;
		case '/channel-client.js':
			out.setHeader('Content-Type', 'application/javascript');
			render('channel-client.js', out);
			break;

		case '/task':
			out.end('{ "task": "'+Math.floor(Math.random()*100000)+'" }');
			break;

		default:
			out.statusCode = 404;
			out.end('{ "status": "Not Found" }');
	}
}).listen(3000);

function render(fileName, out) {
	var fileStream = fs.createReadStream(fileName);
	fileStream
		.on('error', function() {
			out.statusCode = 500;
			out.end('{ "status": "Server error" }');
		})
		.pipe(out)
		.on('close', function() {
			fileStream.destroy();
		});
}