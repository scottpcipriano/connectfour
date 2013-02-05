
var self = module.exports = {

	createNewBoard: function(callback) {
		var columns = new Array(7);
	  	for (var i = 0; i < columns.length; i++) {
	  		columns[i] = new Array(6);
	  		for (var j = 0; j < columns[i].length; j++) {
	  			columns[i][j] = 0;
	  		};
	  	};
	  	callback(columns);
	},

	printBoard: function(columns, callback) {
	  	for (var i = 0; i < columns.length; i++) {
	  		console.log(columns[i]);	  		
	  	};
	  	callback();
	},

	dropPiece: function(columns, columnIndex, playerNumber, callback) {
		var column = columns[columnIndex];
		var emptyRow = 0;
		for (var i = 0; i < column.length; i++) {
			if (column[i] == 0) {
				emptyRow = i;
			}
		}
		column[emptyRow] = playerNumber;
		callback();
	},

	count: function (callback)  {
		User.find({}, function(err, users) {
			var length = users.length;
			callback(length);
		});
	},

}