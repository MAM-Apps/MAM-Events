const MongoClient = require('mongodb').MongoClient;
require('env2')('./config.env');

var url = process.env.MONGODB_URI;
MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log("Connected correctly to server.");
    db.close();
  }
});
