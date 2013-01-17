/**
 * Module dependencies.
 */
var rootDir = process.cwd(),
	express = require('express'),
	app = module.exports = express(),
	config = require(rootDir + '/config'),
	port = config.get('PORT'),
	// version = config.get('VERSION'),
	// nodeEnv = config.get('ENVIRONMENT'),
	mainRoutes = require(rootDir + '/routes/main'),
	http = require('http'),
	path = require('path');

app.configure(function() {
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
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