module.exports = function(app,model) {

	var users = require('../controllers/users');
	var games = require('../controllers/games');

	app.get('/', function(req, res) {
		games.list(function(games) {
			res.render('index', {
				className: 'home',
				title: 'Connect Four',
				games: games
			});
		});
	});

	app.get('/game/:id'	, function(req,res) { 
		games.get(req.params.id, function(game) {
			res.render('game', {
				className: 'game',
				isGame: true,
				game: game
			});
		});
	});


	app.get('/users', function(req, res) {
		users.create(function() {
			users.count(function(length) {
				res.render('users', {
					className: 'users',
					title: 'Users List Page',
					userTotal: length
				});
			});
		});
	});


	app.get('/eastereggz', function(req, res) {
		res.render('eastereggz', {
			className: 'eggz',
			title: 'Easter Eggz, yay!'
		});	});

};