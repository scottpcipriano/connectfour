var express = require('express'),
	exphbs  = require('express3-handlebars'),
	passport = require('passport'),
	util = require('util'),
	GoogleStrategy = require('passport-google').Strategy,
	socketLayer = require('./socket-layer'),
	app = module.exports = express(),
	hbs = exphbs.create({ /* config */ }),
	config = require('./config'),
	port = config.get('PORT'),
	mongoUrl = config.get('MONGO_URL'),
	mongoose = require('mongoose'),
	model = require('./models/model')(app,mongoose),
	http = require('http'),
	path = require('path'),
	server;

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

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.configure(function() {
	app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

// routes have to be defined after passport is defined
var	mainRoutes = require('./routes/main')(app,model,passport);

app.configure('development', function() {
	app.use(express.errorHandler());
});

server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port: ' + app.get('port'));
	socketLayer(app, server);
});