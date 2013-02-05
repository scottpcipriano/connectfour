var colors = require('colors'),
	express = require('express'),
	handlebars = require('handlebars'),
	hbsHelpers = require('./views/helpers/helpers')(handlebars),	
	exphbs  = require('express3-handlebars'),
	stylus = require('stylus'),
	nib = require('nib'),
	passport = require('passport'),
	util = require('util'),
	GoogleStrategy = require('passport-google').Strategy,
	socketLayer = require('socket.io'),
	app = exports.app = express(),
	config = require('./config'),
	port = config.get('PORT'),
	domain = config.get('DOMAIN'),
	authReturnHost = config.get('AUTH_RETURN_HOST') || domain + ":" + port,
	mongoUrl = config.get('MONGO_URL'),
	mongoose = require('mongoose'),
	model = require('./models/model')(app,mongoose),
	User = mongoose.model('User'),
	http = require('http'),
	path = require('path'),
	server;

// Generic error handler...for isolating bugs early on
// Remove when app matures, or manually exit, which is commented out for now.
process.on('uncaughtException', function (err) {
	console.error('Uncaught Exception:'.red.inverse, String(err).red);
	// process.exit(1);
});

mongoose.connect(mongoUrl, function(err) {
	if (!err) {
		console.log('Connected to mongodb');
	} else {
		throw err;
	}
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://' + authReturnHost + '/auth/google/return',
    realm: 'http://' + authReturnHost + '/'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      var query = User.findOne({ 'email': profile.emails[0].value });
      query.exec(function (err, oldUser) {
        if(oldUser) {
          done(null, oldUser);
        } else {
          var newUser = new User();
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.save(function(err) {
            if(err) {throw err;}
            done(null, newUser);
          }); 
        }
      });
    });
  }
));

function compile(str,path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib());
};

app.configure(function() {
	app.engine('handlebars', exphbs({handlebars:handlebars, defaultLayout: 'main'}));
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'handlebars');
	app.use(express.favicon());
	// using short format instead of dev because it doesn't log colors
	app.use(express.logger('short'));
  app.use(express.cookieParser());
	app.use(express.bodyParser());
	// must be before passport.session()
	app.use(express.session({ secret: 'SBO' }));
	app.use(express.methodOverride());	
	app.use(passport.initialize());
	app.use(passport.session());	
	app.use(stylus.middleware({src:__dirname + '/public', compile: compile}));
	app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

// routes have to be defined after passport is defined
var	mainRoutes = require('./routes/main')(app, model, passport);

app.configure('development', function() {
	app.use(express.errorHandler());
});

server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port: ' + app.get('port'));

	// hook up the sockets
	var io = exports.io = socketLayer.listen(server);
	// making it work with long polling for Heroku
	// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
	// http://stackoverflow.com/questions/6223867/can-i-set-up-socket-io-chat-on-heroku
	// http://robdodson.me/blog/2012/06/04/deploying-your-first-node-dot-js-and-socket-dot-io-app-to-heroku/
	io.configure(function() {
		io.set("transports", ["xhr-polling"]);
		io.set("polling duration", 10);
	});
	// when sockets are running, pass the variable along to controllers
	require('./controllers/games').attachSocketLayer(io);

});