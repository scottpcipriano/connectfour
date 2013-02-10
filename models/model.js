module.exports = function(app, mongoose) {

	//board is 6 rows, 7 cols
	var BoardSchema = new mongoose.Schema({
		"r1.$": Number,
		"r2.$": Number,
		"r3.$": Number,
		"r4.$": Number,
		"r5.$": Number,
		"r6.$": Number
	});

	var GameSchema = new mongoose.Schema({
		player_1_email: String,
		player_2_email: String,
		turn: String,
		board: [Board],
    winner: String
	});

	var UserSchema = new mongoose.Schema({
		name: String,
		email: String
	});

	var ChatSchema = new mongoose.Schema({
		// orderId: Number,
		// date: Date,
		gameId: String,
		user: String,
		message: String
	});

	var Board = mongoose.model('Board', BoardSchema);
	var Game = mongoose.model('Game', GameSchema);
	var User = mongoose.model('User', UserSchema);
	var Chat = mongoose.model('Chat', ChatSchema);

};
