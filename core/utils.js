
exports.TheUte = function()
{
	return UTE;
}

var UTE = (function (utils) {
	
 	var utils = utils || {};



		utils.pack = function(what){
			
			return this.URLEncode(this.encode64(what));
			
		};
		
	    utils.unravel = function(what)
	    {
  			return this.decode64(this.URLDecode(what));
	    
	    };
	    
	    
	    utils.getTimestamp = function()
	    {
	    	var d=new Date();
	    	return d;
	    
	    };


	utils.decode64 = function (input) {
		// Base64 code from Tyler Akins -- http://rumkin.com
		var output = "";
		var lsKeyStr = this.keyStr;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		do {
		  enc1 = lsKeyStr.indexOf(input.charAt(i++));
		  enc2 = lsKeyStr.indexOf(input.charAt(i++));
		  enc3 = lsKeyStr.indexOf(input.charAt(i++));
		  enc4 = lsKeyStr.indexOf(input.charAt(i++));
		
		  chr1 = (enc1 << 2) | (enc2 >> 4);
		  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		  chr3 = ((enc3 & 3) << 6) | enc4;
		
		  output = output + String.fromCharCode(chr1);
		
		  if (enc3 != 64) {
		     output = output + String.fromCharCode(chr2);
		  }
		  if (enc4 != 64) {
		     output = output + String.fromCharCode(chr3);
		  }
		} while (i < input.length);
		
		return output;
}	


	utils.encode64 = function (input) {
		// Base64 code from Tyler Akins -- http://rumkin.com
		var output = "";

		var lsKeyStr = this.keyStr;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		do {
		  chr1 = input.charCodeAt(i++);
		  chr2 = input.charCodeAt(i++);
		  chr3 = input.charCodeAt(i++);
		
		  enc1 = chr1 >> 2;
		  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		  enc4 = chr3 & 63;
		
		  if (isNaN(chr2)) {
		     enc3 = enc4 = 64;
		  } else if (isNaN(chr3)) {
		     enc4 = 64;
		  }
		
		  output = output + lsKeyStr.charAt(enc1) + lsKeyStr.charAt(enc2) + 
		     lsKeyStr.charAt(enc3) + lsKeyStr.charAt(enc4);
		} while (i < input.length);
		

		return output;
	};


    utils.URLDecode = function(encoded){
	   // Replace + with ' '
	   // Replace %xx with equivalent character
	   // Put [ERROR] in output if %xx is invalid.
	   var HEXCHARS = "0123456789ABCDEFabcdef"; 
	   
	   var plaintext = "";
	   
	   var i = 0;
	   while (i < encoded.length) {
	       var ch = encoded.charAt(i);
		   if (ch == "+") {
		       plaintext += " ";
			   i++;
		   } else if (ch == "%") {
				if (i < (encoded.length-2) 
						&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
						&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
					plaintext += unescape( encoded.substr(i,3) );
					i += 3;
				} else {
					alert( 'Bad escape combination near ...' + encoded.substr(i) );
					plaintext += "%[ERROR]";
					i++;
				}
			} else {
			   plaintext += ch;
			   i++;
			}
		} // while
	   
	   return plaintext;
					
		
	};
	
	utils.URLEncode = function(plaintext)
	{
		// The Javascript escape and unescape functions do not correspond
		// with what browsers actually do...
		var SAFECHARS = "0123456789" +					// Numeric
						"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
						"abcdefghijklmnopqrstuvwxyz" +
						"-_.!~*'()";					// RFC2396 Mark characters
		var HEX = "0123456789ABCDEF";
		
		
		var encoded = "";
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
		    if (ch == " ") {
			    encoded += "+";				// x-www-urlencoded, rather than %20
			} else if (SAFECHARS.indexOf(ch) != -1) {
			    encoded += ch;
			} else {
			    var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
				    console.log( "Unicode Character '" 
		                    + ch 
		                    + "' cannot be encoded using standard URL encoding.\n" +
					          "(URL encoding only supports 8-bit characters.)\n" +
							  "A space (+) will be substituted." );
					encoded += "+";
				} else {
					encoded += "%";
					encoded += HEX.charAt((charCode >> 4) & 0xF);
					encoded += HEX.charAt(charCode & 0xF);
				}
			}
		}
		
		return encoded;
	};
	
	
	return utils;

}(UTE || {}));
