var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.count = function (callback)  {

  User.find({}, function(err, users) {
      var length = users.length;      
      callback(length);
  });
}

//
exports.findByIdOrCreate = function (externalid, callback) {
	User.findOne({}, function (err, users) {
		if (users.length > 0) {
			callback(user);
		} else {
			 var user = new User();
			 user.externalid = externalid;
			 user.save(function (err) {callback(user)});
		}
	});
}

// return list of all users
exports.list = function (callback)  {
  User.find({}, function(err, users) {
      callback(users);
  });
}