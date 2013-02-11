var mongoose = require('mongoose'),
	Game = mongoose.model('Game'),
	ObjectId = mongoose.Types.ObjectId,
	boardUtils = require('../utils/boardUtils'),
	currentGameId,
	io;

var chats = require('../controllers/chats');

var self = module.exports = {

	attachSocketLayer: function(socketLayer) {
		// attach scope to this file
		io = socketLayer;

		io.sockets.on('connection', function(socket) {

			console.log('Socket connection...');

      // send chat message
			socket.on('sendChatMessage', function(data) {
				socket.broadcast.emit('sendChatMessageToAll', data);
        chats.create(data.user, data.gameId, data.message, function(data){
          	console.log('Chat message saved to DB');
        });
			});

      // play game piece
			socket.on('playDot', function(data) {
				socket.broadcast.emit('playDotAndRotateUser', {});
				self.dropdot(data.user, data.gameid, data.col, function(game) {
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
