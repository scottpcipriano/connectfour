var rootDir = process.cwd();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// dev connection
//var db = mongoose.connect('mongodb://localhost/testdb');

// live db config
var db = mongoose.connect('mongodb://connectfour:hipster@linus.mongohq.com:10060/app11007030');
var User = new Schema({
	first_name: String,
	last_name: String
});
var UserModel = mongoose.model('User', User);

module.exports = {

	loadRoutes: function(app) {

		app.get('/', function(req, res) {
			res.render('index', { title: 'Connect Four' });
		});

		app.get('/users', function(req, res) {

			// sets up record to be inserted
			var record = new UserModel();
			record.first_name = 'FName';
			record.last_name = 'LName';

			// inserts one record
			record.save(function (err) {});

			// sends server response of report count
			UserModel.find({}, function(err, users) {
				var length = users.length;

				res.render('users', { title: 'Users list page', userTotal: users.length, firstUser: users[0].last_name });

			});

		});

		app.get('/eastereggz', function(req, res) {
			res.render('index', { title: 'Easter Eggz, yay!' });
		});




		// app.use(function(req, res, next) {

		// 	// res.render(rootDir + '/client/views/app.jade', {
		// 	// 	title: '404 - Page Not Found'
		// 	// });
		// 	// if(req.path === '/404') {
		// 	// }
		// });



	}

};