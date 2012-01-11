/*
 	Basic Server Side request && response off a node
*/

var PORT = 7337;
var fwk = require('./core/commandFramework.js');
var utils = require('./core/utils.js');

var express = require('express');
var app = express.createServer();

app.get('/', function(req, res)
		     {
				res.send(fwk.processRequest(req));
		     }
);

app.listen(PORT);

console.log("Node-AI Peer started and listening on port " + PORT + " at [" + utils.TheUte().getTimestamp() + "]");


















