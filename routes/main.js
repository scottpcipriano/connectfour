module.exports = function(app,model) {

	app.get('/', function(req, res) {
		res.render('index', { title: 'Connect Four' });
	});


	var users = require('../controllers/users');
	app.get('/users', function(req, res) {

		users.create(function() {users.count( function(length) {
			res.render('users', { title: 'Users List Page', userTotal: length   });
		}
		)});
	});

	app.get('/game/:id'	, function(req,res) {
		res.send('You are playing game:' + req.params.id);
	});

	app.get('/eastereggz', function(req, res) {
		res.render('eastereggz', { title: 'Easter Eggz, yay!' });
	});

};