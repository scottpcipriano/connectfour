var mongoose = require('mongoose'),
	User = mongoose.model('User');

var self = module.exports = {

	count: function (callback)  {
		User.find({}, function(err, users) {
			var length = users.length;
			callback(length);
		});
	},

	// return list of all users
	list: function (callback)  {
		User.find({}, function(err, users) {
			callback(users);
		});
	}

};