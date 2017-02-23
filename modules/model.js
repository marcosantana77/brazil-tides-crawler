var moment = require('moment'); 
var _  = require('cloneextend');
var mongo = require('mongodb');
var BSON = mongo.BSONPure; 

var mongodb = require('./mongoops.js'); 

var spotsCollName = "tideSpots"; 
var tidesCollName = "tides"; 

var ensuredIndexes = false; 

var endCallback; 

exports.saveTides = beginExecution;

function beginExecution(spot, tides, callback) {

	endCallback = callback; 

	console.log("entering saving data"); 
	console.log(spot); 
	console.log(tides[0]); 

	mongodb.blindInitialize(function (dbx) {

		if (!ensuredIndexes) {
			initializeSpotsModel(dbx, function() {
				initializeTidesModel(dbx, function () {
					console.log("ensured indexes"); 
					saveData(dbx, spot, tides, function () {
						endExecution();
					}); 
				});
			});
		} else {
			saveData(dbx, spot, tides, function () {
				endExecution();
			}); 
		}
	}); 
}

function saveData(dbx, spot, tides, callback, callbackparam) {
	console.log("entering saving data"); 

	saveSpot(dbx, spot, function (jobDone, spot_id) {
		console.log('spot id for spot : ' + spot.name); 
		console.log(spot_id);

		if (jobDone) {
			saveTides( dbx, spot, spot_id, tides, function () {
				callback(callbackparam);
			});
		}
	}); 
}

function saveSpot(dbx, spot, callback) {

	console.log("entering saving spot"); 
	console.log(spot.name); 

	dbx.collection(spotsCollName).findOne({'code' : spot.code}, function (err, doc) {
		if (err) {
			console.log("critical error spotting spot : " + spot.name);
			throw err; 
		} else if (doc != null) {
			console.log("spot already saved"); 
			var bsonId = new BSON.ObjectID(doc._id);
			if (callback) callback(true, bsonId);
		} else if (doc == null) {
			console.log("......saving spot"); 

			dbx.collection(spotsCollName).insert(spot, function(err, doc) {
				console.log("inserting spot "); 

				if (err) { 
					console.log("critical error inserting new spot : " + spot.name);
					saveSpot(dbx, spot, callback); 
					//throw err;
				} else if (doc != null) {
					var bsonId = new BSON.ObjectID(doc._id);
					if (callback) callback(true, bsonId); 
				} else if (doc == null) {
					throw new Error("critical error of second level on inserting spot : " + spot.name); 
				}
			});
		}
	});
}

function saveTides(dbx, spot, spot_id, tides, callback) {

	for (var i = 0; i < tides.length; i++) {
		var tide = tides[i];
		tide.s_id = spot_id;
	};

	dbx.collection(tidesCollName).insert(tides, function(err, docs) {
		if (err) { 
			console.log("critical error inserting tides on spot : " + spot.name);
			throw err;
		} else { 
			if (callback) callback(); 
		}
	});
}


function initializeSpotsModel (dbx, callback) {
	//console.log("ensuring spot"); 

	ensureIndex(dbx, spotsCollName, {code : 1}, true, false, function () {
		//console.log("ensured spot"); 

		if (callback) callback();
	});
}

function initializeTidesModel (dbx, callback) {
	//console.log("ensuring tides"); 

	ensureIndex(dbx, tidesCollName, {spot_id : 1, dt : 1}, false, true, function () {
		//console.log("ensured tides"); 

		if (callback) callback();
	});
}

function ensureIndex (dbx, collectionName, fieldSet, isUnique, lastToEnsure, callback) {
	//console.log("ensuring " + collectionName); 

	dbx.collection(collectionName).ensureIndex(fieldSet, {unique : isUnique}, function (err, result) {
		if (err) {
			throw err; 
		} else {
			//console.log("ensured " + collectionName); 
			ensuredIndexes = lastToEnsure; 
			if (callback) callback(); 
		}
	});
}

function endExecution() {
	endCallback();
}

