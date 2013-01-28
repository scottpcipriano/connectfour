module.exports = function(app, server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log('Socket connection...');
		socket.emit('news', {
			hello: 'world'
		});
		socket.on('my other event', function(data) {
			console.log(data);
		});
	});

};