module.exports = function(handlebars) {

	// helper to show who you are playing against (index.js)
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
	
	// helper to alert user it is their turn (index.js)
	handlebars.registerHelper('alertMyTurn', function(user) {
		//console.log("MY:" + user.email);
		//console.log("TURN:" + this.turn);		
		if (user.email == this.turn) { 
	  	return new handlebars.SafeString(
	  		"- <strong>it's my turn</strong>"
	  	);
	  }

	});	
	
	// helper to show if player is playing (index.js)
	handlebars.registerHelper('playerOneExists', function() {
	  if (this.player_1_email) {
	  	return this.player_1_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<em>waiting on challenger</em>"
	  	);
	  }
	});

	// helper to show if player is playing (index.js)
	handlebars.registerHelper('playerTwoExists', function() {
	  if (this.player_2_email) {
	  	return this.player_2_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<em>waiting on challenger</em>"
	  	);
	  }
	});

	// helper to show if a game can be joined (index.js)
	handlebars.registerHelper('join', function() {
	  if (this.player_1_email && this.player_2_email) {
	  	return "";
	  } else {
	  	return new handlebars.SafeString(
	  		"| <a href=''>join</a>"
	  	);
	  }
	});


}
