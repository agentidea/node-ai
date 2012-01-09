/*
 	Basic Server Side request && response off a node
*/

var PORT = 7337;
var fwk = require('./core/commandFramework.js');
var cmds = require('./core/commands.js').CMDS;
var utils = require('./core/utils.js');

var express = require('express');
var app = express.createServer();

app.get('/', function(req, res)
		     {
				var result = fwk.processRequest(req);
				var msg = result;
				
				res.send(msg);
		     }
);

app.listen(PORT);

console.log("Node Peer started and listening on port " + PORT + " at [" + utils.TheUte().getTimestamp() + "]");


















