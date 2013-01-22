var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.create = function (callback) {
  
  var user = new User()
  user.first_name = 'FName';
  user.last_name = 'LName';

  // inserts one record
  user.save(function (err) {callback()});

}

exports.count = function (callback)  {

  User.find({}, function(err, users) {
      var length = users.length;      
      console.log("counting: " + users.length);
      callback(length);
  });

}