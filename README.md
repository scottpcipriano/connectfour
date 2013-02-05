# Connectfour

## Introduction
You remember old school ConnectFour.  That was pre-hipster.  This is ConnectFour post-hipster.

## Technologies at play
 * Node - JavaScript platform - http://nodejs.org/ 
 * Nodemon - watches for file saves and restarts webserver - https://github.com/remy/nodemon
 * Express - Node web framework - http://expressjs.com/guide.html
 * Handlebars - html templating for Node - http://handlebarsjs.com/
 * Stylus - CSS framework for Node - http://learnboost.github.com/stylus/
 * Mongodb - NoSQL database - http://docs.mongodb.org/manual/contents/
 * Mongoose - ORM framework for Mongodb - http://mongoosejs.com/
 * nconf - configuration management - https://github.com/flatiron/nconf
 * node-inspector - node debugger - https://github.com/dannycoates/node-inspector
 * passport - Auth library - http://passportjs.org/
 * passport-google - Google specific auth using passport - https://github.com/jaredhanson/passport-google
 * Mocha - javascript test framework running on node for asynchronous testings

## Installed software
 * Brew on mac (ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)")
 * Mongodb (brew install mongodb)
 * Mongohub-Mac - GUI for Mongo administration (https://github.com/downloads/fotonauts/MongoHub-Mac/MongoHub.zip)
 * Node (http://nodejs.org/)
 * Various Sublime Text 2 plugins
    * Stylus
    * Handlebars
    * Markdown
 * Custom sublime text build (optional)

	{
	"shell": true,
	"cmd": ["nodemon app.js "],
	"path":"/usr/local/bin/:/usr/bin/:/bin",
	"selector": "source.js"
	}


## Local dev
To get the project running:

 * Clone project
 * Install dependencies
 * You EITHER need to start a local mongodb instance or connect to the LIVE mongodb (ask Scott for connection string)
 * Create a configuration file 
 * Then start the webapp

### Clone project
	git clone git@github.com:spcip82/connectfour.git

### Install dependencies
	sudo npm install nodemon -g
	sudo npm install -g node-inspector
	npm install

### Start a local mongodb?
	mongod --config mongo/mongod-dev.conf

#### How do you test to see if your mongo db is up 
	mongo
	use testdb;
	db.testdb.save( { id: 1, name: 'scott' } )
	db.testdb.find()
	db.testdb.remove({})


### Create a configuration file
	cp config-sample.json config.json	
		
(```config.json``` is in .gitignore so you can change your local configurations w/out worrying about accidentally committing your own development configuration.)

```nconf``` essentially takes the ```config.json``` file and creates a pseudo set of process.env.* variables. Note, however, that for every used local "environment" variable in ```config.json``` there must be an actual production environment variable set up.

### Start the webapp
	nodemon app.js

### Testing the webapp
	mocha

## Deployment at Heroku

App currently deployed at: [http://connectfour-hipster.herokuapp.com](http://connectfour-hipster.herokuapp.com)
	
Heroku dashboard (to see app Scott needs to set you up as a collaborator): [https://dashboard.heroku.com](https://dashboard.heroku.com)

Install Heroku toolbelt: https://toolbelt.heroku.com/

### Initial deployment setup

#### Changes to app 
Instructions from [here](http://javascriptplayground.com/blog/2012/10/hosting-a-node-app-on-heroku) 
 
 * Created Procfile in database
 * Add engines to package.json
 
##### Heroku provisioning
	heroku login
	heroku create
	heroku addons:add mongohq
	git push heroku master
	heroku ps:scale web=1	
	heroku config:add NODE_ENV=production --app connectfour-hipster
	heroku config:add MONGO_URL=mongodb://**REDACTED**
	heroku config:add DOMAIN=connectfour-hipster.herokuapp.com --app connectfour-hipster
	heroku config:add AUTH_RETURN_HOST=connectfour-hipster.herokuapp.com --app connectfour-hipster
	
Also please note in Heroku dashboard the application was renamed after it was created

### Deploy for the first time
	git remote add heroku git@heroku.com:connectfour-hipster.git
	git push heroku master

### Deploy update
	git push heroku master

### View logs
	heroku logs -t --app connectfour-hipster
