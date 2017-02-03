const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/assets'));

io.on('connection', function(ws){
	
	console.log('a user connected');

	ws.emit('broadcast', { msg:'Чат подключен и работает 🙌' });
	
	ws.on('chat', function(msg){
		ws.emit('chat', msg);
	});
	ws.on('delete', function(id){
		ws.emit('delete', id);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});