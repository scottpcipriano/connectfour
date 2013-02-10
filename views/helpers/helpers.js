module.exports = function(handlebars) {

	// helper to show who you are playing against (index.handlebars)
	handlebars.registerHelper('opponent', function(user) {
		if (user.email == this.player_1_email && this.player_2_email) { 
	  	return "vs. " + this.player_2_email;
	  } if (user.email == this.player_2_email && this.player_1_email) {
	  	return "vs. " + this.player_1_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<em>waiting on challenger</em>"
	  	);
	  }

	});

	// helper to alert user it is their turn (index.handlebars)
	handlebars.registerHelper('alertMyTurn', function(user) {
		if (user.email == this.turn) { 
	  	return new handlebars.SafeString(
	  		"- <strong>it's my turn</strong>"
	  	);
	  }

	});	
	
	// helper to show if player is playing (index.handlebars)
	handlebars.registerHelper('playerOneExists', function() {
	  if (this.player_1_email) {
	  	return this.player_1_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<em>waiting on challenger</em>"
	  	);
	  }
	});

	// helper to show if player is playing (index.handlebars)
	handlebars.registerHelper('playerTwoExists', function() {
	  if (this.player_2_email) {
	  	return this.player_2_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<em>waiting on challenger</em>"
	  	);
	  }
	});

	// helper to show if a game can be joined (index.handlebars)
	handlebars.registerHelper('join', function() {
	  if (this.player_1_email && this.player_2_email) {
	  	return "";
	  } else {
	  	return new handlebars.SafeString(
	  		"| <a href='/joingame/" + this._id + "'>join</a>"
	  	);
	  }
	});
	
		// helper to show if a game can be joined (main.handlebars)
	handlebars.registerHelper('playerOne', function(game,user) {
		if (game.player_1_email) {
			return game.player_1_email;
		} else {
			// can't join same game twice
			if (game.player_2_email != user.email) {
				return new handlebars.SafeString(
	  			"<a href='/joingame/" + game._id + "'>join</a>"
	  		);
			}
		}
	});

		// helper to show if a game can be joined (main.handlebars)
	handlebars.registerHelper('playerTwo', function(game,user) {
		if (game.player_2_email) {
			return game.player_2_email;
		} else {
			// can't join same game twice
			if (game.player_1_email != user.email) {
				return new handlebars.SafeString(
	  			"<a href='/joingame/" + game._id + "'>join</a>"
	  		);
			}
		}
	});

	// helper to alert user it is their turn (index.handlebars)
	handlebars.registerHelper('drawDot', function(rowIndex, dotColor) {
		if (dotColor == 1) { 
	  		return new handlebars.SafeString(
	  		"<img src='../images/redChip.png' alt='' class='dot row-" + (5 - rowIndex) + "' />");
	  	} else if (dotColor == 2) { 
	  		return new handlebars.SafeString(
	  		"<img src='../images/blueChip.png' alt='' class='dot row-" + (5 - rowIndex) + "' />");
	  	}
	});
	
	handlebars.registerHelper('gameControls', function(user, game) {
		// player1 = redChip, player2 = blueChip
    var chip = "blueChip";
    if (user.email == game.player_1_email) {
      var chip = "redChip";
    }

    // if there is a winner, display notice of winner
    if (game.winner) {
      return new handlebars.SafeString("<h1>" + game.winner + " wins!</h1>");
    }


		// top of the screen chips
    var controls = "";
    for (var i=0;i<7;i++) {
      controls += "<a href='/dropdot/" + game._id + "/" + i +  "'><img src='../images/" + chip +".png' alt='Drop chip into column .' /></a>"
     }

		// not two players yet, no playable chips shown 
		if (!game.player_1_email || !game.player_2_email) {
			return new handlebars.SafeString("<h1>Waiting on challenger!</h1>");
		}
		
		// if it's your turn show the chips and you have two players show chips
		// else you get nothing!
		if (user.email == game.turn) {
    	return new handlebars.SafeString(controls);
    } else {
    	return "";
    } 
  });  

	

}
