


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}



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