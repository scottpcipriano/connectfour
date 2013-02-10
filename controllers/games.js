var mongoose = require('mongoose'),
	Game = mongoose.model('Game'),
	Chat = mongoose.model('Chat'),
	ObjectId = mongoose.Types.ObjectId,
	boardUtils = require('../utils/boardUtils'),
	currentGameId,
	io;

var self = module.exports = {

	attachSocketLayer: function(socketLayer) {
		// attach scope to this file
		io = socketLayer;

		io.sockets.on('connection', function(socket) {

			console.log('Socket connection...');

			// ---------------------------------------------> GAME SETUP

			var query = Chat.find({ gameId: currentGameId }, 'user message').limit(200);
			query.execFind(function (err, chats) {
				if(err) {
					// handle errors
				} else {
					socket.emit('enterGame', chats);
				}
			});

			// ---------------------------------------------> CHAT

			socket.on('sendChatMessage', function(data) {
				// console.log(data);
				var ChatObject = new Chat({
					gameId: data.gameId,
					user: data.user,
					message: data.message
				});
				ChatObject.save(function (err, chatObj) {
					if(err) {
						// handle errors
					} else {
						console.log('Chat message saved to DB: ', chatObj);
					}
				});
				socket.broadcast.emit('sendChatMessageToAll', data);
			});

			// ---------------------------------------------> GAME PLAY

			socket.on('playDot', function(data) {
				console.log(data);
				self.dropdot(data.user, data.gameid, data.col, function(game) {
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

  // adds a winner to a game
  winner: function (user,gameid, callback) {
    Game.findOne({_id: new ObjectId(gameid)}, function(err, game) {
      game.winner = user.email;
      game.save(function (err) {
					callback(game);
				});
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

	// return list of games associated with a user, that haven't been completed
	listMyGames: function (user, callback) {
		Game.find({
              $and :
              [
                {$or:[{player_1_email: user.email },{player_2_email: user.email }]},
                {winner: {$exists: false}}
              ]
              }, function(err, games) {
			callback(games);
		});
	},

	// return list of games not associated with the user, that haven't been completed
	listOtherGames: function (user, callback) {
		Game.find({$nor:[{player_1_email: user.email },{player_2_email: user.email },{winner: {$exists: true}}]}, function(err, games) {
			callback(games);
		});
	},
 
	// return list of games completed
	listCompletedGames: function (user, callback) {
		Game.find({winner: {$exists: true}}, function(err, games) {
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
				
				// making an assumption that dropPiece requires two players
				// assumption made let's switch turn 
				if (game.turn == game.player_1_email) {
					game.turn = game.player_2_email;
				} else if (game.turn == game.player_2_email){
					game.turn = game.player_1_email;
				}
				
				boardUtils.printBoard(game.board, function() {
					game.save(function (err) {
						callback(game);
					});
				});
			});
		});
	}

};
