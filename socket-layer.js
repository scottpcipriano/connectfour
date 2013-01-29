module.exports = function(app, server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {

		console.log('Socket connection...');

		// ---------------------------------------------> GAME SETUP

		socket.emit('enterGame', {
			hello: 'world'
		});

		// ---------------------------------------------> CHAT

		socket.on('sendChatMessage', function(message) {
			// console.log(message);
			socket.broadcast.emit('sendChatMessageToAll', message);
		});

		// ---------------------------------------------> GAME PLAY

		socket.on('playDot', function(data) {
			// console.log(data);
			socket.broadcast.emit('playDotAndRotateUser', { /* to come */ });
		});

	});

};