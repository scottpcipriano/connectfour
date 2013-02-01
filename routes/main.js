module.exports = function(app,model,passport) {

	var users = require('../controllers/users');
	var games = require('../controllers/games');

	

	app.get('/', function(req, res) {
		games.list(function(games) {
			res.render('index', {
				user: req.user, 
				className: 'home',
				title: 'Connect Four',
				games: games
			});
		});
	});

	app.get('/game/:id'	, ensureAuthenticated, function(req,res) { 
		games.get(req.params.id, function(game) {
			res.render('game', {
				user: req.user,
				className: 'game',
				isGame: true,
				game: game
			});
		});
	});


	app.get('/users', ensureAuthenticated, function(req, res) {
		users.list(function(users) {
			res.render('users', {
				user: req.user,
				className: 'users',
				title: 'Users List Page',
				users: users
			});
		});
	});


	app.get('/eastereggz', function(req, res) {
		res.render('eastereggz', {
			className: 'eggz',
			title: 'Easter Eggz, yay!'
		});	});

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
  
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});


	// verifies user is authenticated before visiting page
	// function should probably be moved as it is middleware
	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/')
	}


};