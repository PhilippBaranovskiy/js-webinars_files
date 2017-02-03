var clients = [];

exports.subscribe = function (out) {
	clients.push(out);
	console.log('active users: ', clients.length);
	out.on('close', function(){
		clients.splice(clients.indexOf(out), 1);
	});
};
exports.post = function (msg) {
	clients.forEach(function(out){
		out.end(msg);
	});
	clients = [];
};