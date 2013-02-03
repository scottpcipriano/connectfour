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


}
