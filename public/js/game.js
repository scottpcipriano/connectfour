$(function($) {

	var socket = io.connect('http://localhost'),
		$chatInput = $('#chatInput'),
		$chatLog = $('#chatLog');

	window.socket = socket;

	// FRONT END LISTENERS
	socket.on('enterGame', function(data) {

		// set up all the game data here
		// console.log(data, 'game entered');

	});

	socket.on('sendChatMessageToAll', function(message) {
		$chatLog.append('<p><span class="playerTwo">The other player:</span> ' + message + '</p>');
	});

	// FRONT END EMITTERS
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

	socket.emit('playDot', {
		my: 'data'
	});

});