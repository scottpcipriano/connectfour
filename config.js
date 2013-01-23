/*
 * CONFIGURATION OF ENVIRONMENT VARIABLES
 *
 */

var nconf = require('nconf'),
	fs = require('fs'),
	nodeEnv = require('./app').get('env'),
	json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

nconf.argv().env().file({
	file: process.env.configFile || './config.json'
});

nconf.set('VERSION', json.version);
nconf.set('ENVIRONMENT', nodeEnv);

module.exports = nconf;