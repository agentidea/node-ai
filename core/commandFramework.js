// 
// AgentIdea commandFramework Peer for JavaScript 
//


exports.ping = function(){
	
	return "reply from ... Agent Idea peer"
};

exports.processRequest = function( req, res ){


	var timestamp = new Date();
	console.log(" processing HTTP request @ ");
	console.log( "                     " + timestamp );
				
	//normally a request would be passed here
	//req would be base64 urlencoded request
	//bypass that for now
				
	var reqMacro = FWK.newMacro("reportOnRequest");
	FWK.addParam(reqMacro,"datetime",timestamp);
	FWK.addParam(reqMacro,"request",req);

	var itinerary = FWK.newItinerary();
	itinerary.inCommands.push( reqMacro );

	FWK.processItinerary( itinerary );

	FWK.debugItinerary( itinerary );

	return   " ai processed the request @" + timestamp;

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

		newItinerary : function()
		{
			return { inCommands:[],outCommands:[] };
		},
		
		debugItinerary : function(itinerary)
		{
			console.log(" * ------------ * ");
			console.log(" ");
			console.log(" ");
			
			console.log(" COMMAND ITINERARY ")
			FWK.debugCommandList(itinerary.inCommands , "INPUT");
			FWK.debugCommandList(itinerary.outCommands, "OUTPUT");
			
			console.log(" ");
			console.log(" ");
			console.log(" * ------------ * ");
		

			
		},
		
		debugCommandList: function (commandList ,label){
			
			console.log("  " + label);
			
			for( var commandIndex in commandList)
			{
				var tmpCommand = commandList[commandIndex];
				
				console.log("   " + tmpCommand.name);
				
				for ( var paramIndex in tmpCommand.parameters)
				{
					var tmpParam = tmpCommand.parameters[paramIndex];
					
					console.log( "              " + tmpParam.name + " :: " + tmpParam.value);
		
				}
			}
		},
		
		
		
		newMacro: function(aName){
			return {
				name: aName,
				parameters: []
			};
			
		},
		
		addParam: function(m, aName, aVal){
			m.parameters.push(
			
			{name: aName,value: aVal}
			
			);
		}
		
	};
}


var CMDS = (function (commands) {
 	var commands = commands || {};

    commands.reportOnRequest = function(macro, itinerary){
		
				var arg0 = macro.parameters[0].value;
				msg = " first Command !!!!! ";
				console.log(msg);
		
				var PassData = FWK.newMacro("PassData");
				FWK.addParam(PassData,"message",msg);
				FWK.addParam(PassData,"param2","777");
				
				itinerary.outCommands.push( PassData );

	};

	return commands;

}(CMDS || {}));







