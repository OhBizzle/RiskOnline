$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on("users", function(event){console.log(event);});

io.socket.get("/database", function(reData, jwres){
		console.log(reData);
});
