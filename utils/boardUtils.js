
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

	checkWinner: function(columns) {

		for (var colIndex = 0; colIndex < columns.length; colIndex ++) {	  		
	  		for (var rowIndex = 0; rowIndex < columns[colIndex].length; rowIndex++) {

	  			// current spot we're looking at
	  			var currentDotColor = columns[colIndex][rowIndex];

	  			// only check for win if spot isn't empty
	  			if (currentDotColor != 0) {

	  				// horizontals
		  			if ((colIndex < 4) && (columns[colIndex + 1][rowIndex] == currentDotColor) && 
		  				(columns[colIndex + 2][rowIndex] == currentDotColor) && 
		  				(columns[colIndex + 3][rowIndex] == currentDotColor)) {
		  					return currentDotColor;
		  			}

		  			// diagonals (backwards)
		  			if ((colIndex < 4) && (columns[colIndex + 1][rowIndex - 1] == currentDotColor) && 
		  				(columns[colIndex + 2][rowIndex - 2] == currentDotColor) && 
		  				(columns[colIndex + 3][rowIndex - 3] == currentDotColor)) {
		  					return currentDotColor;
		  			}

		  			// diagonals (forward)
		  			if ((colIndex < 4) && (columns[colIndex + 1][rowIndex + 1] == currentDotColor) && 
		  				(columns[colIndex + 2][rowIndex + 2] == currentDotColor) && 
		  				(columns[colIndex + 3][rowIndex + 3] == currentDotColor)) {
		  					return currentDotColor;
		  			}

		  			// verticle
		  			if ((colIndex < 4) && (columns[colIndex][rowIndex + 1] == currentDotColor) && 
		  				(columns[colIndex][rowIndex + 2] == currentDotColor) && 
		  				(columns[colIndex][rowIndex + 3] == currentDotColor)) {
		  					return currentDotColor;
		  			}
	  			}
	  		}

	  	}

	  	return null;
	},

	count: function (callback)  {
		User.find({}, function(err, users) {
			var length = users.length;
			callback(length);
		});
	},

}