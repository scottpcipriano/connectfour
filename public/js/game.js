$(function($) {

	var socket = io.connect('http://localhost'),
		$chatInput = $('#chatInput'),
		$chatLog = $('#chatLog');

	window.socket = socket;

	// ---------------------------------------------> GAME SETUP

	socket.on('enterGame', function(data) {
		// set up all the game data here
		// console.log(data, 'game entered');
	});

	// ---------------------------------------------> CHAT

	socket.on('sendChatMessageToAll', function(message) {
		$chatLog.append('<p><span class="playerTwo">The other player:</span> ' + message + '</p>');
	});

	$chatInput.on('keyup', function(event) {
		var code = (event.keyCode ? event.keyCode : event.which),
			inputValue;
		//Enter keycode
		if(code == 13) {
			inputValue = $chatInput.val();
			$chatInput.val('');
			$chatLog.append('<p><span class="playerOne">Me:</span> ' + inputValue + '</p>');
			// console.log(socket.broadcast);
			socket.emit('sendChatMessage', inputValue);
		}
	});

	// ---------------------------------------------> GAME PLAY

	socket.emit('playDot', {
		my: 'data'
	});

	socket.on('playDotAndRotateUser', function(data) {
		// show that the other player has played, and then change the turn
	});

});