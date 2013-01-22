var express = require('express'),
	exphbs  = require('express3-handlebars'),
	app = module.exports = express(),
	hbs = exphbs.create({ /* config */ }),
	config = require('./config'),
	port = config.get('PORT'),
	mongoUrl = config.get('MONGO_URL'),
	mongoose = require('mongoose'),
	model = require('./models/model')(app,mongoose),
	mainRoutes = require('./routes/main')(app,model),
	http = require('http'),
	path = require('path');

mongoose.connect(mongoUrl, function(err) {
	if (!err) {
		console.log('Connected to mongodb');
	} else {
		throw err;
	}
});

app.configure(function() {
	app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port: ' + app.get('port'));
});




