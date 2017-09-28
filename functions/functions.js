var user = require('../model/user');
var db = require('../model/database');

module.exports.Authenticate = Authenticate;
module.exports.CreateResponse = CreateResponse;
module.exports.DatabaseSelect = DatabaseSelect;


function Authenticate(username, password, callback){
	console.log("Authenticate: " + username);
	// search database for users with this name
	db.getConnection( (err, conn) => {
		if (err){
			console.log(err);
		} else {
			var query = "";
			this.DatabaseSelect(conn, query).then(function(data){
				if (data.results.length > 0){
					// user found.
				} else {
					// no user found
				}
			}).catch(function(error){

			});
		}
	});
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

function DatabaseSelect(connection, query){
	return new Promise(function(resolve, reject){
		connection.query(query, function(error, results, fields){
			connection.release();
			if (error){
				reject(Error(error));
			} else {
				var obj = {"results" : results, "fields" : fields};
				resolve(obj);
			}
		});
	});
}

