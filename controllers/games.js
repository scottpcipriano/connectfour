var mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  ObjectId = mongoose.Types.ObjectId; 

// create a game
exports.create = function (user,callback) {
  var game = new Game();
  game.turn = 1;
  game.player_1_id = user.email;
  game.save(function (err) {
  	callback(game);
  });

}

// retrieve game by _id
exports.get = function (id,callback)  {
  Game.findOne({_id: new ObjectId(id)}, function(err, game) {
      callback(game);
  });
}

// return list of all games
exports.list = function (callback)  {
  Game.find({}, function(err, games) {
      callback(games);
  });
}

// return list of games associated with a user
exports.listForUser = function (user, callback)  {
  Game.find({$or:[{player_1_id: user.email },{player_2_id: user.email }]}, function(err, games) {
      callback(games);
  });
}

// return list of games not associated with the user
exports.listOtherGames = function (user, callback)  {
  Game.find({$nor:[{player_1_id: user.email },{player_2_id: user.email }]}, function(err, games) {
      callback(games);
  });
}