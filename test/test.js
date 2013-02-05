var assert = require("assert")
var boardUtils = require("../utils/boardUtils")

describe('Account API',function(){

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

  it('win condition', function(done) {

  	// create board
  	boardUtils.createNewBoard(function(columns) {

  		// set up a win for player 1
  		columns[0][5] = 1
  		columns[1][5] = 1
  		columns[2][5] = 1
  		columns[3][5] = 1

  		// TODO FINISH
		boardUtils.printBoard(columns, function() {
  			done();
  		});
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

