$(function($) {

	var socket,
		$chatInput = $('#chatInput'),
		$chatLog = $('#chatLog'),
		$gameGrid = $('#gameGrid'),
		currentUser = $('#me').text();

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


	socket.on('playDotAndRotateUser', function(data) {
		// show that the other player has played, and then change the turn
	});


	// this is a test of animation
	
	// $gameGrid.on('click', '.toggle', function() {
	// 	var dot = $(this);
	// 	dot.removeClass('toggle').addClass('row-0');
	// });





	// this is an outline of some steps / logic:
	// on click of ".controls > a", create a game dot
	$gameGrid.on('click', '.controls a', function() {
		var dropButton = $(this);
		var dropTargetClass = dropButton.attr('class');
		console.log(dropTargetClass);
		// get class (or href) of the control user clicked "$(this)"

		// put game dot at top of column with same class as the control user clicked (e.g., col-0)
		var gameDot = dropButton.children('img').clone();
		console.log(gameDot);

		console.log('.column.' + dropTargetClass);

		gameDot.prependTo('.column.' + dropTargetClass).addClass('dot');
		// hide the control user clicked (so that it appears as if that game dot dropped into row)
		dropButton.children('img').hide();
		// get column's class "count-#"
		if($('.column.' + dropTargetClass).hasClass('count-0')) {
			//gameDot.addClass('row-0');
			setTimeout(function() {
				gameDot.addClass('row-0');
			}, 400);
			console.log(gameDot.attr('class'));
		}
		// use the number after the dash to determine what row the dot should drop into (e.g., if count-0, then no dots in column yet; therefore, dot should drop into row-0)
		// apply 'row-#' class to game dot
		// increment the count on the column class by one (e.g., class changed from count-0 to count-1)
		// update array (use 3-dimensional array to check for four in a row????)

		// if column's count class is count-5, then don't display control for that column.

		socket.emit('playDot', {
			user: currentUser,
			gameid: location.href.split('/game/')[1],
			col: dropTargetClass.replace('col-', '')
		});

		return false;

	});

	
	
	
	
	

});