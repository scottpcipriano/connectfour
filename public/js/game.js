$(function($) {

	var socket,
		$chatInput = $('#chatInput'),
		$chatLog = $('#chatLog');

	if(__DOMAIN__) {
		socket = io.connect('http://' + __DOMAIN__);
	} else {
		// default
		socket = io.connect('http://localhost');
	}

	window.socket = socket;

	// ---------------------------------------------> GAME SETUP

	socket.on('enterGame', function(data) {
		// set up all the game data here
		// console.log(data, 'game entered');
	});

	// ---------------------------------------------> CHAT

	socket.on('sendChatMessageToAll', function(message) {
		$chatLog.append('<p><span class="playerTwo">The other player:</span> ' + message + '</p>');
		$chatLog.scrollTop($chatLog[0].scrollHeight);
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
			$chatLog.scrollTop($chatLog[0].scrollHeight);
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


	// this is a test of animation
	var gameGrid = $('#gameGrid');
	gameGrid.on('click', '.toggle', function() {
		var dot = $(this);
		dot.removeClass('toggle').addClass('spot-0');

	});

});