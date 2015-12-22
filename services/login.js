var mongo = require("./mongo");
var bcrypt = require("./bcrypt");
var mongoURL = "mongodb://localhost:27017/fb";

exports.signIn = function(msg, callback) {

	var res = {};
	var email, password;
	email = msg.emailPhone;
	password = msg.password;
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');
		console.log(email + "   " + password);
		coll.findOne({
			email : email
		}, function(err, user) {
			if(err){
				throw err;
			}
			if (user) {
				bcrypt.comparePassword(password,user.password,function(err, isPasswordMatch){
					console.log(isPasswordMatch+"isPasswordMatch");
					if(err){
						throw err;
					}
					else{
						if(isPasswordMatch){
							res.code = "200";
							res.data = user;
							console.log("user is after encryption" + user);
						}
						else {
							res.code = "401";
							res.value = "Failed Login";
						}
						callback(null, res);
					}
				});
			} 
			else{

				res.code = "401";
				res.value = "Failed Login";
				callback(null, res);
			}
		});
	});

};

exports.signUp = function(msg, callback) {
	var res = {};
	var firstName, lastName, email, phoneNo, password, dob;
	firstName = msg.firstName;
	lastName = msg.lastName;
	email = msg.email;
	phoneNo = msg.phoneNo;
	password = msg.password;
	dob = msg.dob;
	/* Encrypting password using bcrypt */
	bcrypt.cryptPassword(password,function(err, hash){
		if(err){
			throw err;
		}
		else{
			console.log("hash"+hash);
			var json_responses;

			mongo.connect(mongoURL, function() {
				console.log('Connected to mongo at: ' + mongoURL);
				var coll = mongo.collection('user');

				coll.insert({
					firstName : firstName,
					lastName : lastName,
					email : email,
					phoneNo : phoneNo,
					password : hash,
					dob : dob
				}, function(err, user) {
					console.log(user);
					res.code = "200";
					res.value = "success";
					callback(null, res);
				});
			});
		}
	});
	
	
	
};
