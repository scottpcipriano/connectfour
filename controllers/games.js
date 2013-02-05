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
				console.log(data);
				self.dropdot(data.user, data.gameid, data.col, function() {
					socket.broadcast.emit('playDotAndRotateUser', { /* to come */ });
				});
			});

		});

	},

	// create a game
	create: function (user,callback) {
		var game = new Game();
		game.turn = user.email;
		game.player_1_email = user.email;

		// create a new game board
		boardUtils.createNewBoard(function(columns) {

			// REMOVE THIS BEFORE COMITTING

			// columns[0][5] = 2
			// columns[1][5] = 1
			// columns[1][4] = 1
			// columns[2][5] = 2
			// columns[3][5] = 1


			game.board = columns;
			game.save(function (err) {
				callback(game);
			});
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

			// figure out what dot number (think color) to use
			var dotNumber = 2;
			if (user.email == game.player_1_email) {
				dotNumber = 1;
			}

			// db.games.findOne({_id: new ObjectId('51106449315dad0000000001')}

			// drop the piece
			boardUtils.dropPiece(game.board, col, dotNumber, function() {
				game.markModified('board');
				boardUtils.printBoard(game.board, function() {

					game.save(function (err) {
						callback(game);
					});
				});
			});
		});
	}

};