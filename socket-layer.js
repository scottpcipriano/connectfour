module.exports = function(app, server) {

	var io = require('socket.io').listen(server);

	// purportedly this works
	// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
	// http://stackoverflow.com/questions/6223867/can-i-set-up-socket-io-chat-on-heroku
	// http://robdodson.me/blog/2012/06/04/deploying-your-first-node-dot-js-and-socket-dot-io-app-to-heroku/
	io.configure(function() {
		io.set("transports", ["xhr-polling"]);
		io.set("polling duration", 10);
	});

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