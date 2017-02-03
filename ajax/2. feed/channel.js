const clients = [];

exports.subscribe = function (out) {
	clients.push(out);
	console.log('active users: ', clients.length);
	out.on('close', function(){
		clients.splice(clients.indexOf(out), 1);
	});
};

setInterval(function(){
	if ( !clients.length ) { return; } // nobody is here
	clients.forEach(function(out){
		clients.splice(clients.indexOf(out), 1);
		out.end('{ "task": "'+Math.floor(Math.random()*100000)+'" }');
	});
}, 2000);