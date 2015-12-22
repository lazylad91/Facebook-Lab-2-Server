var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fb";

exports.del = function(msg, callback) {
	var res = {};
	var grpName = msg.grpName;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('groups');
		console.log(grpName);
		coll.remove({
			grpName : grpName
		}, function(err, result) {
			var coll = mongo.collection('user');
			coll.update({}, {
				$pull : {
					groups : grpName
				}
			},{ multi: true }, function(err, result) {
                 console.log(result);
				res.code = "200";
				res.value = "success";
				callback(null, res);
			
			});
		});

	});
};

exports.delMember = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var grpName = msg.grpName;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('groups');
		console.log(grpName);
		coll.update({
			grpName : grpName
		}, {
			$pull : {
				members : userId
			}
		}, function(err, result) {
			var coll = mongo.collection('user');
			coll.update({
				email : userId
			}, {
				$pull : {
					groups : grpName
				}
			}, function(err, result) {
				var coll = mongo.collection('groups');
				console.log(grpName);
				coll.findOne({
					grpName : grpName
				}, function(err, result) {
					console.log(result);
					res.code = "200";
					res.value = result;
					callback(null, res);
				});
			});
		});

	});
};

exports.addMember = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var grpName = msg.grpName;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('groups');
		console.log(grpName);
		coll.update({
			grpName : grpName
		}, {
			$push : {
				members : userId
			}
		}, function(err, result) {
			var coll = mongo.collection('user');
			coll.update({
				email : userId
			}, {
				$push : {
					groups : grpName
				}
			}, function(err, result) {
				var coll = mongo.collection('groups');
				console.log(grpName);
				coll.findOne({
					grpName : grpName
				}, function(err, result) {
					console.log(result);
					res.code = "200";
					res.value = result;
					callback(null, res);
				});
			});
		});

	});
};
exports.getGroupDesc = function(msg, callback) {
	var res = {};
	var grpName = msg.grpName;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('groups');
		console.log(grpName);
		coll.findOne({
			grpName : grpName
		}, function(err, result) {
			console.log(result);
			res.code = "200";
			res.value = result;
			callback(null, res);
		});

	});
};
exports.getGroup = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.findOne({
			email : userId
		}, function(err, result) {
			coll.find({
				email : userId
			});
			console.log(result);
			res.code = "200";
			res.value = result;
			callback(null, res);
		});

	});
};

exports.createGroup = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	console.log("adminId" + userId);
	var grpName = msg.grpName;
	var grpDesc = msg.grpDesc;
	var adminName = msg.adminName;
	var members = [];
	members.push(adminName);
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('groups');

		coll.insert({
			adminId : userId,
			grpName : grpName,
			grpDesc : grpDesc,
			adminName : adminName,
			members : members
		}, function(err, user) {
			console.log(user);
			var coll = mongo.collection('user');
			coll.update({
				email : userId
			}, {
				$push : {
					"groups" : grpName
				}
			}, function(err, result) {
				var coll = mongo.collection('user');
				coll.findOne({
					email : userId
				}, function(err, result) {
					coll.find({
						email : userId
					})
					console.log(user);
					res.code = "200";
					res.value = result;
					callback(null, res);
				});
			});
		});
	});
};

exports.getPost = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('post')

		coll.find({}).toArray(function(error, result) {

			console.log(result);
			res.value = 200;
			console.log("in server results is " + result);
			console.log("in server results is " + JSON.stringify(res));
			res.post = result;
			callback(null, res.post);

		});
	});
};
