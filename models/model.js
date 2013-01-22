module.exports = function(app, mongoose) {
	var RowSchema = new mongoose.Schema({
		c1: Number,
		c2: Number,
		c3: Number,
		c4: Number,
		c5: Number,
		c6: Number,
		c7: Number
	});

	//board is 6 rows, 7 cols
	var BoardSchema = new mongoose.Schema({
		r1: [Row],
		r2: [Row],
		r3: [Row],
		r4: [Row],
		r5: [Row],
		r6: [Row]
	});

	var GameSchema = new mongoose.Schema({
		id: Number,
		player_1_id: Number,
		player_2_id: Number,
		turn: Number,
		board: [Board]
	});

	var UserSchema = new mongoose.Schema({
		first_name: String,
		last_name: String
	});

	var Board = mongoose.model('Board', BoardSchema);
	var Game = mongoose.model('Game', GameSchema);
	var Row = mongoose.model('Row', RowSchema);
	var User = mongoose.model('User', UserSchema);
}	