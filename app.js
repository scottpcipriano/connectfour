/**
 * Module dependencies.
 */
var rootDir = process.cwd(),
	express = require('express'),
	exphbs  = require('express3-handlebars'),
	app = module.exports = express(),
	config = require(rootDir + '/config'),
	port = config.get('PORT'),
	// version = config.get('VERSION'),
	// nodeEnv = config.get('ENVIRONMENT'),
	mainRoutes = require(rootDir + '/routes/main'),
	http = require('http'),
	path = require('path'),
    hbs;

// Create `ExpressHandlebars` instance with a default layout.
hbs = exphbs.create({
    defaultLayout: 'main'
});


app.configure(function() {
	app.engine('handlebars', hbs.engine);
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'handlebars');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

mainRoutes.loadRoutes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port: ' + app.get('port'));
});