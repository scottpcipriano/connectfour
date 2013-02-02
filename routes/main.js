var rootDir = process.cwd(),
	config = require(rootDir + '/config'),
	domain = config.get('DOMAIN');

module.exports = function(app,model,passport) {

	var users = require('../controllers/users');
	var games = require('../controllers/games');

	//homepage
	app.get('/', ensureAuthenticated, function(req, res) {
		games.listForUser(req.user,function(myGames) {
			games.listOtherGames(req.user,function(otherGames) {
				res.render('index', {
					domain: domain,
					user: req.user,
					className: 'home',
					title: 'Connect Four',
					myGames: myGames,
					otherGames: otherGames
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