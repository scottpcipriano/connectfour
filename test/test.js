var assert = require("assert")
var boardUtils = require("../utils/boardUtils")

describe('BoardUtils',function(){

  before(function(done){
        done();
    });

  beforeEach(function(done){
        done();
  });

  it('basics', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// assert correct size
  		assert.equal(7, columns.length);
  		assert.equal(6, columns[0].length);
  		done();
  	});
  });


  it('drop dot', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		boardUtils.dropPiece(columns, 2, 1, function () {
  			boardUtils.dropPiece(columns, 2, 2, function () {
  				boardUtils.dropPiece(columns, 0, 2, function () {
  					assert.equal(1, columns[2][5]);
  					assert.equal(2, columns[2][4]);
  					assert.equal(2, columns[0][5]);
  					done();
		  		});	
		  	});	
  		});
  	});
  });

  it('win condition, horizontal to the left', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// no win
  		columns[0][5] = 1
  		columns[1][5] = 1
  		columns[2][5] = 0
  		columns[3][5] = 1
  		assert.equal(null, boardUtils.checkWinner(columns));

  		// plug that hole for a win 
		columns[2][5] = 1
		assert.equal(1, boardUtils.checkWinner(columns));

		// can't have a 2 in there
		columns[1][5] = 2
		assert.equal(null, boardUtils.checkWinner(columns));

		// clear it...
		columns[0][5] = 0
  		columns[1][5] = 0
  		columns[2][5] = 0
  		columns[3][5] = 0
  		assert.equal(null, boardUtils.checkWinner(columns));

  		// shifted over, in another column
  		columns[2][4] = 2
  		columns[3][4] = 2
  		columns[4][4] = 2
  		columns[5][4] = 2
  		assert.equal(2, boardUtils.checkWinner(columns));

  		done();  
  	});
  });

  it('win condition, horizontal to the right', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// no win
  		columns[3][5] = 1
  		columns[4][5] = 1
  		columns[5][5] = 0
  		columns[6][5] = 1
  		assert.equal(null, boardUtils.checkWinner(columns));

  		columns[5][5] = 1 
  		assert.equal(1, boardUtils.checkWinner(columns));

  		done();  		
  	});
  });

  it('win condition, diagonal like forward slash', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// no win
  		columns[3][2] = 1
  		columns[2][3] = 1
  		columns[1][4] = 0
  		columns[0][5] = 1
  		assert.equal(null, boardUtils.checkWinner(columns));

  		columns[1][4] = 1
  		assert.equal(1, boardUtils.checkWinner(columns));

  		done();  		
  	});
  });

  it('win condition, diagonal like back slash', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// no win
  		columns[0][0] = 1
  		columns[1][1] = 1
  		columns[2][2] = 0
  		columns[3][3] = 1
  		assert.equal(null, boardUtils.checkWinner(columns));

  		columns[2][2] = 1
  		assert.equal(1, boardUtils.checkWinner(columns));

  		done();  		
  	});
  });

  it('win condition, verticle', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// no win
  		columns[2][0] = 2
  		columns[2][1] = 2
  		columns[2][2] = 0
  		columns[2][3] = 2
  		assert.equal(null, boardUtils.checkWinner(columns));

  		columns[2][2] = 2
  		assert.equal(2, boardUtils.checkWinner(columns));

  		done();  		
  	});
  });

  	// 		boardUtils.printBoard(columns, function() {
			// 	done(); 
			// });

  it('two dimensional array', function(done) {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      done(); 
  });

});

