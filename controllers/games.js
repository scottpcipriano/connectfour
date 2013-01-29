var mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  ObjectId = mongoose.Types.ObjectId; 

// create a game
exports.create = function (callback) {
  var game = new Game()
  	game.turn = 1;
  game.save(function (err) {callback()});

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
