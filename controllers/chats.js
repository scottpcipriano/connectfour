var mongoose = require('mongoose'),
	Chat = mongoose.model('Chat'),
	ObjectId = mongoose.Types.ObjectId;

var self = module.exports = {

	// create a new chat message
	create: function (user, gameId, message, callback) {
		var chat = new Chat();
		chat.user = user;
    chat.gameId = gameId;
		chat.message = message;

    chat.save(function (err) {
		  callback();
		});
	},
 
  // retrieve chat messages by _id
  list: function (gameId,callback) {
		Chat.find({gameId: gameId}, function(err, chats) {
			callback(chats);
		});
	}
};
