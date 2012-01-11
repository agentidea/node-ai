/*
 	Basic Server Side request && response off a node
*/

var PORT = 7337;
var APP_ID = " NODE-AI "
var fwk = require('./core/commandFramework.js');
require('./core/JSextensions.js');  //core JS language extensions ... trim() etc 

var utils = require('./core/utils.js');

var express = require('express');
var app = express.createServer();

app.get('/', function(req, res)
		     {
				res.send(fwk.processRequest(req));
				console.log( "request processed at " + utils.TheUte().getTimestamp() );
		     }
);

app.listen(PORT);

console.log( "Node.js " + APP_ID.trim() + " started and listening on port " + PORT + " at [" + utils.TheUte().getTimestamp() + "]");


















