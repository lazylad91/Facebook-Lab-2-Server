var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fb";





exports.getEvent = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
	var coll = mongo.collection('user');
		coll.findOne({
			email : userId
		}, function(err, result) {
			console.log(result);
			res.code = "200";
			res.value = result;
			callback(null, res);
		});
	
	
	});
};


exports.getEmp = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
	var coll = mongo.collection('user');
		coll.findOne({
			email : userId
		}, function(err, result) {
			console.log(result);
			res.code = "200";
			res.value = result;
			callback(null, res);
		});
	
	
	});
};


exports.saveEvent = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var event = msg.event;
	var to = msg.to;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.update({
			email : userId
		}, {
			$push : {
				event : {event:event,to:to}
			}
		}, function(err, result) {

			var coll = mongo.collection('user');
			coll.findOne({
				email : userId
			}, function(err, result) {
				console.log(result);
				res.code = "200";
				res.value = result;
				callback(null, res);
			});
		
		});

	});
};
exports.saveEdu = function(msg, callback) {
	var res = {};
	var empOrEdu = msg.empOrEdu;
	var userId = msg.userId;
	var name = msg.name;
	var from = msg.from;
	var to = msg.to;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.update({
			email : userId
		}, {
			$push : {
				edu : {empOrEdu:empOrEdu,name:name,from:from,to:to}
			}
		}, function(err, result) {

			var coll = mongo.collection('user');
			coll.findOne({
				email : userId
			}, function(err, result) {
				console.log(result);
				res.code = "200";
				res.value = result;
				callback(null, res);
			});
		
		});

	});
};