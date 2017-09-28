const crypto = require('crypto');
require('dotenv').config();

var HMAC;

function User(name){
	this.name = name;
	this.password = "";
	this.hashedPassword = "";
	
	//const bytes = GetBytes()
	this.bytes;
	GetBytes();
	this.SetPassword = function(_password) {
		this.password = _password;
		this.hashedPassword = HashPassword(_password);

	}
	this.CheckPassword = function(passToCheck){
		console.log('checking: ' + passToCheck);
		var passedPasswordHash = HashPassword(passToCheck);
		var currentPasswordHash = this.hashedPassword;
		//console.log('passed hash  : ' + passedPasswordHash);
		//console.log('current hash : ' + currentPasswordHash);
		if (currentPasswordHash == passedPasswordHash){
			console.log("Correct!");
			return true;
		}
		console.log("Incorrect");
		return false;
	}
	function GetBytes(){
		var bytes = crypto.randomBytes(256).toString('hex');
		//console.log('bytes: ' + bytes);
		this.bytes = bytes;
	}
	
	function HashPassword(password){
		//var hmac = this.salt;
		//hmac.read().toString
		var hmac = crypto.createHmac('sha256', this.bytes);
		
		hmac.update(password);
		var hash = hmac.digest('hex');
		//console.log('hashedPassword: ' + hash);
		return hash;
	}
}
module.exports = User;