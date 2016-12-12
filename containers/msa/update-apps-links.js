const mongodb   = require('mongodb');

var mongoClient = mongodb.MongoClient;
var mongoHost   = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mongo-sites';

mongoClient.connect(mongoHost, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server from environment variable MONGO_URL=' + mongoHost + '. Error:', err);
        setTimeout(function () {
            process.exit();
        }, 5000);
    } else {
        console.log('Connected to mongodb.');

        db.collection('site-' + process.env.SITE_NAME + '-users').find().toArray(function (err, users) {

                var k = JSON.stringify(users);
                k = k.replace(/v2\.siemonster\.local/g, process.env.SITE_DOMAIN);

                users = JSON.parse(k);

                for(var i = 0, l = users.length; i < l; i++) if(users[i].frames) {
                    db.collection('site-' + process.env.SITE_NAME + '-users').update({_id: users[i]._id}, {$set: {frames: users[i].frames}});
                }

                setTimeout(function(){ db.close() }, 5000);
            }
        );
    }
});