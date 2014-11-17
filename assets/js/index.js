var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
        res.sendFile(__dirname + '/real_time.ejs');

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

      	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});

          socket.on('chat message', function(msg){
                io.emit('chat message', msg);
                });
});
});

http.listen(1337, function(){
        console.log('lisening on *:1337');
});
