var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fb";

exports.searchUser = function(msg, callback) {
	var res = {};
	var searchText = msg.searchText;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		console.log(searchText);
		coll.find({
			firstName : new RegExp(searchText)
		}).toArray(function(err, result) {

            console.log(result);
			res.code = "200";
			res.value = result;
			console.log(result);
			callback(null, res);
		
		
		});

	});
};

