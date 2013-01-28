module.exports = function(app,model) {

	var users = require('../controllers/users');

	app.get('/', function(req, res) {
		res.render('index', {
			className: 'home',
			title: 'Connect Four'
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

	app.get('/game/:id'	, function(req,res) {
		res.render('game', {
			className: 'game',
			isGame: true,
			gameId: req.params.id
		});
	});

	app.get('/eastereggz', function(req, res) {
		res.render('eastereggz', {
			className: 'eggz',
			title: 'Easter Eggz, yay!'
		});	});

};