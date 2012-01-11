


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

if ("function" != typeof "".format) 
// add format() if one does not exist already
//http://stackoverflow.com/questions/1038746/equivalent-of-string-format-in-jquery
  String.prototype.format = (function() {
    var rx1 = /\{(\d|\d\d)\}/g, rx2 = /\d+/ ;
    return function() {
        var args = arguments;
        return this.replace(rx1, function($0) {
            var idx = 1 * $0.match(rx2)[0];
            return args[idx] !== undefined ? args[idx] : (args[idx] === "" ? "" : $0);
        });
    }
}());




/*
 * 
 Object.prototype.iterateSorted = function(worker)
{
    var keys = [];
    for (var key in this)
    {
        if (this.hasOwnProperty(key))
            keys.push(key);
    }
    keys.sort();

    for (var i = 0; i < keys.length; i++)
    {
        worker(this[key]);
    }
}

and the usage:

var myObj = { a:1, b:2 };
myObj.iterateSorted(function(value)
{
    alert(value);
} 

 */