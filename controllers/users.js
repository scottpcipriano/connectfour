var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.create = function (callback) {
  
  var user = new User()
  user.name = 'NAME';

  // inserts one record
  user.save(function (err) {callback()});

}

exports.count = function (callback)  {

  User.find({}, function(err, users) {
      var length = users.length;      
      callback(length);
  });

}