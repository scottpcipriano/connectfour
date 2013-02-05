var mongoose = require('mongoose'),
	Game = mongoose.model('Game'),
	ObjectId = mongoose.Types.ObjectId,
	boardUtils = require('../utils/boardUtils'),
	io;

var self = module.exports = {

	attachSocketLayer: function(socketLayer) {
		// attach scope to this file
		io = socketLayer;

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

	},

	// create a game
	create: function (user,callback) {
		var game = new Game();
		game.turn = user.email;
		game.player_1_email = user.email;
		game.save(function (err) {
			callback(game);
		});
	},

	// join a pre-existing game
	join: function (user,id,callback) {
		Game.findOne({_id: new ObjectId(id)}, function(err, game) {
			if (!game.player_1_email) {
				game.player_1_email = user.email;
				game.save(function (err) {
					callback(game);
				});
			}
			if (!game.player_2_email) {
				game.player_2_email = user.email;
				game.save(function (err) {
					callback(game);
				});
			}
		});
	},

	// retrieve game by _id
	get: function (id,callback) {
		Game.findOne({_id: new ObjectId(id)}, function(err, game) {
			callback(game);
		});
	},

	// return list of all games
	list: function (callback) {
		Game.find({}, function(err, games) {
			callback(games);
		});
	},

	// return list of games associated with a user
	listForUser: function (user, callback) {
		Game.find({$or:[{player_1_email: user.email },{player_2_email: user.email }]}, function(err, games) {
			callback(games);
		});
	},

	// return list of games not associated with the user
	listOtherGames: function (user, callback) {
		Game.find({$nor:[{player_1_email: user.email },{player_2_email: user.email }]}, function(err, games) {
			callback(games);
		});
	},

	dropdot: function (user, gameid, col, callback) {
		Game.findOne({_id: new ObjectId(gameid)}, function(err, game) {
			if (user.email == game.player_1_email) {
				boardUtils.dropPiece(game.board, col, user.email, 1)
				callback(games);
			} else {
				boardUtils.dropPiece(game.board, col, user.email, 2)
				callback(games);
			}
		});
	}

};