var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fb";

exports.getFriend = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log("mongo calling");
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.aggregate([ {
			$unwind : '$friends'
		}, {
			$match : {
				'friends.status' : 'a',
				email : userId
			}
		} ]).toArray(function(err, result) {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					res.code = "200";
					res.data = result;
				}
				console.log(JSON.stringify(result));
				callback(null, res);
			}

		});

	});
};

exports.acceptFriend = function(msg, callback) {
	var res = {};
	var userId = msg.friendId;
	var name = msg.name;
	var loggedInUser = msg.userId;
	var firstNameLoggedIn = msg.firstNameLoggedIn;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log("mongo calling");
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');

		coll.update({
			email : loggedInUser
		}, {
			$pull : {
				friends : {
					friendId : userId
				}
			}
		}, function(err, result) {

			if (err) {
				throw err;
			} else {
				coll.update({
			email : loggedInUser
		}, {
			$push : {
				friends : {
					friendId : userId,
					status : "a",
					name : name
				}
			}
		},function(err, result) {
			if (err) {
				throw err;
			} else {
				coll.update({
					email : userId
				}, {
					$pull : {
						friends : {
							friendId : loggedInUser
						}
					}
				}, function(err, result) {

					if (err) {
						throw err;
					} else {
						coll.update({
					email : userId
				}, {
					$push : {
						friends : {
							friendId : loggedInUser,
							status : "a",
							name : firstNameLoggedIn
						}
					}
				},function(err, result) {
					if (err) {
						throw err;
					} else {
						res.code = "200";
						callback(null, res);
						
						
					}

				});
						
					}

					
				});
				
				
			}

		});
				
			}

			
		});

	});
};

exports.getPending = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log("mongo calling");
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.aggregate([ {
			$unwind : '$friends'
		}, {
			$match : {
				'friends.status' : 'p',
				email : userId
			}
		} ]).toArray(function(err, result) {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					res.code = "200";
					res.data = result;
				}
				console.log(JSON.stringify(result));
				callback(null, res);
			}

		});

	});
};

exports.addFriend = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var firstName = msg.firstName;
	var userIdLoggedIn = msg.userIdLoggedIn;
	var firstNameLoggedIn = msg.firstNameLoggedIn;
	
	console.log(firstNameLoggedIn + "firstNameLoggedIn");
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log("mongo calling");
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.update({
			email : userIdLoggedIn
		}, {
			$push : {
				friends : {
					friendId : userId,
					status : "s",
					name : firstName
				}
			}
		}, function(err, result) {
			if (err) {
				throw err;
			} else {
				var coll = mongo.collection('user');
				coll.update({
					email : userId
				}, {
					$push : {
						friends : {
							friendId : userIdLoggedIn,
							status : "p",
							name : firstNameLoggedIn
						}
					}
				},function(err, result) {
					if (err) {
						throw err;
					} else {
						
						res.code = "200";
						callback(null, res);
					}

				});
			}

		});

	});
};

exports.getFriendStatus = function(msg, callback) {
	var res = {};
	var userId = msg.userId;
	var firstName = msg.firstName;
	var userIdLoggedIn = msg.userIdLoggedIn;
	console.log(userIdLoggedIn + "userIdLoggedIn");
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log("mongo calling");
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		coll.find({
			'friends.friendId' : userId,
			email : userIdLoggedIn
		}, {
			_id : 1,
			friends : {
				$elemMatch : {
					friendId : userId
				}
			}
		}).toArray(function(err, result) {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					res.code = "200";
					res.data = result;
				} else {
					res.code = "100";
				}
				callback(null, res);
			}

		});

	});
};
