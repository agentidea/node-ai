// 
// AgentIdea commandFramework Peer for JavaScript  UTF-8
//


exports.ping = function(){
	
	return "reply from ... Agent Idea peer"
};

exports.processRequest = function( req, res ){


	var timestamp = new Date();
	console.log(" processing HTTP request");
			
	//normally a request would be passed here
	//req would be base64 urlencoded request
	//bypass that for now
				
	var reqMacro = FWK.newMacro("reportOnRequest");
	FWK.addParam(reqMacro,"datetime",timestamp);
	FWK.addParam(reqMacro,"request",req);

	var itinerary = FWK.newItinerary(reqMacro);

	FWK.processItinerary( itinerary );
	FWK.debugItinerary( itinerary );

	var returnDiv = itinerary.outCommands[0].parameters["message"].value;
	var good = itinerary.outCommands[0].parameters["good"].value;
	
	returnDiv += "<div style='color:green;font-size:22pt;'> Life is very " + good + "</div>";
	
	console.log(itinerary.outCommands[0].parameters);

	return  returnDiv;

};


var FWK;	
if (!FWK) {
	FWK = {
		
		processItinerary: function ( itinerary ){
			
			for(var inputCommand in itinerary.inCommands){
				var localCommand = itinerary.inCommands[inputCommand];
				FWK.processLocalCommand( this, localCommand ,itinerary);
			}
			
		},
		
		processLocalCommand: function(scope,macro,itinerary){

			    var functionSignature = "CMDS." + macro.name;
 				var fnPtr = eval(functionSignature);
				FWK.__runCommand(scope, fnPtr(macro,itinerary));

		},

		__runCommand : function (scope, method, overrideArguments){
			return function(){
				var args = (overrideArguments)?overrideArguments:arguments;
				 method.apply(scope, args);
			}
		},

		newItinerary : function(startCommand)
		{
			return { inCommands:[startCommand],outCommands:[] };
		},
		
		debugItinerary : function(itinerary)
		{
			console.log(" * ------ begin ------ * ");
			console.log(" ");
			console.log(" ");
			
			console.log(" ITINERARY ")
			FWK.debugCommandList(itinerary.inCommands , "INPUT");
			FWK.debugCommandList(itinerary.outCommands, "OUTPUT");
			
			console.log(" ");
			console.log(" ");
			console.log(" * ------ end ------ * ");
		

			
		},
		
		debugCommandList: function (commandList ,label){
			
			console.log("  " + label);
			
			for( var commandIndex in commandList)
			{
				var tmpCommand = commandList[commandIndex];
				
				console.log("   COMMAND: " + tmpCommand.name);
				
				
			}
		},
		
		
		
		newMacro: function(aName){
			return {
				name: aName,
				parameters: {}
			};
			
		},
		
		addParam: function(m, aName, aVal){
			
			m["parameters"][aName] = {
				"value":aVal
			};
			
			
			/*var paramString = "var _param = {'" + aName + "':aVal };";
			eval(paramString);
			if(_param){
				m.parameters.push(_param);	
			}
			*/
		}
		
	};
}


var CMDS = (function (commands) {
 	var commands = commands || {};

    commands.reportOnRequest = function(macro, itinerary){
		
				var dateTime = macro.parameters["datetime"]["value"];
				
				msg = " <div style='background-color:yellow;color:red;'> " + dateTime + "</div>";
				
				//
				// prepare return command
				//
				var good = "善";
				var PassData = FWK.newMacro("PassData");
				FWK.addParam(PassData,"message",msg);
				FWK.addParam(PassData,"good",good);
				
				itinerary.outCommands.push( PassData );

	};

	return commands;

}(CMDS || {}));







