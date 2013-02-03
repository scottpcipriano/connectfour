module.exports = function(handlebars) {

	// helper to show who you are playing against (index.js)
	handlebars.registerHelper('opponent', function(user) {
		if (user.email == this.player_1_email && this.player_2_email) { 
	  	return "vs. " + this.player_2_email;
	  } if (user.email == this.player_2_email && this.player_1_email) {
	  	return "vs. " + this.player_1_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<strong>waiting on challenger</strong>"
	  	);
	  }

	});
	
	// helper to show if player is playing (index.js)
	handlebars.registerHelper('playerOneExists', function() {
	  if (this.player_1_email) {
	  	return this.player_1_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<strong>waiting on challenger</strong>"
	  	);
	  }
	});

	// helper to show if player is playing (index.js)
	handlebars.registerHelper('playerTwoExists', function() {
	  if (this.player_2_email) {
	  	return this.player_2_email;
	  } else {
	  	return new handlebars.SafeString(
	  		"<strong>waiting on challenger</strong>"
	  	);
	  }
	});

	// helper to show if a game can be joined (index.js)
	handlebars.registerHelper('join', function() {
		console.log("P1:" + this.player_1_email);
		console.log("P2:" + this.player_2_email);	
	  if (this.player_1_email && this.player_2_email) {
	  	return "";
	  } else {
	  	return new handlebars.SafeString(
	  		"| <a href=''>join</a>"
	  	);
	  }
	});


}
