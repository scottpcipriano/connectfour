var mongoose = require('mongoose'),
	User = mongoose.model('User');

var self = module.exports = {

	// return list of all users
	list: function (callback)  {
		User.find({}, function(err, users) {
			callback(users);
		});
	}

};
