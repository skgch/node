var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');
MongoClient.connect("mongodb://" + settings.host + "/" + settings.db,
    function(err, db) {
        if (err) { return console.dir(err); }
        console.log('connected to db');
        db.collection("users", function(err, collection){
            var docs = [
                {name: 'nobita', score: 25},
                {name: 'shizuka', score: 70},
                {name: 'dekisugi', score: 100},
            ];
            // collection.insert(docs, function(err, result) {
            //     console.dir(result);
            // });
            // collection.find({name: 'dekisugi'}).toArray(function(err, items) {
            //     console.log(items);
            // });
            var stream = collection.find().stream();
            stream.on('data', function(item) {
                console.log(item);
            });
            stream.on('end', function() {
                console.log('finished.')
            });
        });
    });