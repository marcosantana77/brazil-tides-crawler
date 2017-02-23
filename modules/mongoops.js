var mongo = require('mongodb'),
    mongoClient = mongo.MongoClient, 
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    db = false;

var config = require('../config.js');

exports.blindInitialize = function (callback) {
    if (db) {
        console.log("connection pooling used...")
        if (callback) callback(db); 
    } else { 
        mongoClient.connect(config.mongo.connectionString, function(err, dbx) {
            console.log("connection pooling initialized...")
            if (err) {
                console.log(err); 
                throw err; 
            } else {
                db = dbx; 
                if (callback) {
                    callback (dbx); 
                }
            }
        });

    }
}


//probably not going to work
exports.getDb = function() {
    this.blindInitialize(function (dbx) {
        return dbx; 
    });
}

var closeDb = function () {
    db.close(function (err, result) {
        if (err) {
          console.log(err); 
        } else {
          console.log(result); 
        }

    });
}

