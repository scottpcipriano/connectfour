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
		player_1_id: String,
		player_2_id: String,
		turn: Number,
		board: [Board]
	});

	var UserSchema = new mongoose.Schema({
		externalid: String,
		name: String,
		email: String
	});

	var Board = mongoose.model('Board', BoardSchema);
	var Game = mongoose.model('Game', GameSchema);
	var User = mongoose.model('User', UserSchema);
}	