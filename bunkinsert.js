var _  = require('cloneextend');
var mongo = require('mongodb');
var BSON = mongo.BSONPure; 
var fs = require('fs'); 

var mongodb = require('./modules/mongoops.js'); 

var insertOriginalQuery = "insert into surfgraphstides (s_code, dt, vl) values ('60250', '{0}', {1});\n";

var start = new Date(2015, 3, 1, 0, 0, 0);
var end = new Date(2015, 3, 31, 23, 59, 0); 

console.log (start);
console.log (end); 

var docs = []; 

mongodb.blindInitialize(function (dbx) {

	var query = {dt: {$gte: start, $lte: end}};
	var fieldList = { _id : false, dt : true, vl : true };

	dbx.collection("tides").find(query).count(function (e, count) {

		var countDown = count; 

		var cursor = dbx.collection("tides").find(query, fieldList).sort({dt : 1});

		cursor.each(function (err, item) {
			if (err) {
				console.log(err); 
				dbx.close(); 
			} else {
				if (item !== null) {
					docs.push(item); 

					if (0===--countDown) {
						createBulkFile(dbx); 
					}
				}
			} 
		});
	});
});

function createBulkFile(dbx) {

	var bulk = []; 

	var file = writeStream(function () {
		dbx.close(); 
	});

	for (var i = 0; i < docs.length; i++) {
		var tide = docs[i]; 

		var insertQuery = _.clone(insertOriginalQuery); 

		var strDate = new Date(tide.dt); 

		 file.write(insertQuery.format(strDate.getFullYear() + '-' + (parseInt(strDate.getMonth())) + '-' + strDate.getDate() + ' ' + strDate.getHours() + ':' + strDate.getMinutes(), tide.vl)); 
	};

	file.end(); 
}

function writeStream(callback) {

	var loadFilePath = __dirname + '/sql/bulktides.sql'; 

	var file = fs.createWriteStream(loadFilePath); 

	file.on('error', function (err) {
		console.log('following error ocurred on writting stream to file :' + loadFilePath); 
		console.log(err); 
		if (callback) callback(); 
	});

	file.on('finish', function(){
  		console.log('file succesfully saved to ', loadFilePath);
		if (callback) callback(); 
	});

	return file; 
}


String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

