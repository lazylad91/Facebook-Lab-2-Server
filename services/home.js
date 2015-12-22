
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fb";

exports.savePost = function(msg, callback){
	var res = {};
    var	userId = msg.userId;
	var firstName = msg.firstName;
	var post = msg.post;
		var json_responses;

		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('post');

			coll.insert({userId: userId, firstName:firstName,post:post,time:Date()}, function(err, user){
				console.log(user);
			    res.code = "200";
			    res.value="success";
			    callback(null, res);
			});
		});	  
};

exports.getPost = function(msg, callback){
	var res = {};
    var	userId = msg.userId;
		var json_responses;

		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('post');

			coll.find({userId:{ $in: userId }}).toArray(function(error, result) {
			   
				console.log(result);
			    res.value=200;
			    console.log("in server results is "+result);
			    console.log("in server results is "+JSON.stringify(res));
			    res.post=result;
			    callback(null,res.post);
			
			});
		});	  
};

