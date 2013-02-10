var rootDir = process.cwd(),
	config = require(rootDir + '/config'),
	boardUtils = require('../utils/boardUtils'),
	domain = config.get('DOMAIN');

module.exports = function(app,model,passport) {

	var users = require('../controllers/users');
	var games = require('../controllers/games');

	//homepage
	app.get('/', ensureAuthenticated, function(req, res) {
		games.listMyGames(req.user,function(myGames) {
			games.listOtherGames(req.user,function(otherGames) {
        games.listCompletedGames(req.user,function(completedGames) {
				  res.render('index', {
					  domain: domain,
					  user: req.user,
					  className: 'home',
					  title: 'Connect Four',
					  myGames: myGames,
					  otherGames: otherGames,
            completedGames: completedGames
          });
				});
			});
		});
	});

	// create a new game and redirect to it
	app.get('/creategame', ensureAuthenticated, function(req, res){
		games.create(req.user, function(game) {
			res.redirect('/game/' + game._id);
		});
	});

	// join game and redirect to it
	app.get('/joingame/:id', ensureAuthenticated, function(req, res){
		games.join(req.user, req.params.id, function(game) {
			res.redirect('/game/' + game._id);
		});
	});

	// view a specific game
	app.get('/game/:id'	, ensureAuthenticated, function(req,res) {
		games.get(req.params.id, function(game) {
			res.render('game', {
				domain: domain,
				user: req.user,
				className: 'game',
				isGame: true,
				game: game
			});
		});
	});

	// place a piece
	app.get('/dropdot/:gameid/:col'	, ensureAuthenticated, function(req,res) {
		games.dropdot(req.user, req.params.gameid, req.params.col, function(game) {

      // check win conditions after piece was dropped
			var winner = boardUtils.checkWinner(game.board);
			if (winner) {
        console.log ("We have a winner!!!!!!!!");
        games.winner(req.user, req.params.gameid, function(game) {
			    res.redirect('/game/' + game._id);
        });
			} else {
			  res.redirect('/game/' + game._id);
      }
		});
	});

	//view all users
	app.get('/users', ensureAuthenticated, function(req, res) {
		users.list(function(users) {
			res.render('users', {
				domain: domain,
				user: req.user,
				className: 'users',
				title: 'Users List Page',
				users: users
			});
		});
	});

  // every good app needs an easter egg
	app.get('/eastereggz', function(req, res) {
		res.render('eastereggz', {
			domain: domain,
			className: 'eggz',
			title: 'Easter Eggz, yay!'
		});	
	});

	app.get('/auth/google',
	  passport.authenticate('google'),
	  function(req, res){
	    // The request will be redirected to Google for authentication, so
	    // this function will not be called.
	  });
	
	app.get('/auth/google/return', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  });
  

	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'Login'
		});	
	});  
  
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});


	// verifies user is authenticated before visiting page
	// function should probably be moved as it is middleware
	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}


};
