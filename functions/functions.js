var user = require('../model/user');

function Authenticate(username, password, callback){
	console.log("Authenticate: " + username);
	var newUser = new user(username);
	newUser.password = password;
	callback(null, newUser);

}

function CreateResponse(message, shortcode){
	var obj = {
		"message" : message,
		"SHORTCODE" : shortcode
	};
	return obj;
}

module.exports.Authenticate = Authenticate;
module.exports.CreateResponse = CreateResponse;