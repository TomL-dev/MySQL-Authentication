function User(name){
	this.name = name;
	this.password = "";

	this.SetPassword = function(_password) {
		this.password = _password;
	}
}
module.exports = User;