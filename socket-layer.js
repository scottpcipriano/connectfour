module.exports = function(app, server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {

		console.log('Socket connection...');

		// BACK END EMITTERS
		socket.emit('enterGame', {
			hello: 'world'
		});

		// BACK END LISTENERS

		socket.on('sendChatMessage', function(message) {
			// console.log(message);
			socket.broadcast.emit('sendChatMessageToAll', message);
		});




		socket.on('playDot', function(data) {
			console.log(data);
		});

	});

};