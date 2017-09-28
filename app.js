var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
require('dotenv').config()
var port = process.env.PORT || 80;
var functions = require('./functions/functions');

var app = express();
app.use(cookieParser());
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
  }))
app.set('view engine', 'ejs'); // set up ejs for templating

app.get('/', function(req, res){
	//var response = functions.CreateResponse("Welcome to base", "BASE");
	//res.status(200).send(response);
	res.render('index');
});

app.get('/login', function(req, res){
	console.log("Initial Session: " + JSON.stringify(req.session));
	res.render('login', {
		message : ""
	});
});
app.post('/login', function(req, res){
	console.log("Initial Session: " + JSON.stringify(req.session));
	var user = req.body.username;
	var pass = req.body.password;
	console.log("POST Login: User: " + user + " | Password: " + pass);
	functions.Authenticate(user, pass, function(err, foundUser){
		if (err){
			consolo.log(err);
		} else if (foundUser){
			console.log("Old Session: " + JSON.stringify(req.session));
			req.session.regenerate(function() {
                req.session.user = foundUser.name;
				req.session.success = 'Authenticated as ' + foundUser.name;
				console.log("New Session: " + JSON.stringify(req.session));
                res.redirect('/home');
            });
			//res.render('profile');
		}
	});
});

app.get('/home', isAuthenticated, function(req, res){
	res.render('profile');
});
app.get('/logout', function(req, res){
	console.log("Logout Initial: " + JSON.stringify(req.session));
	// req.logout();
	req.session.destroy(function(err){
		if (err){
			console.log(err);
		} else {
			console.log("Logout After: " + JSON.stringify(req.session));
			res.redirect('/login');
		}
	});
	
})


function isAuthenticated(req, res, next){
	console.log("isAuthenticated: " + JSON.stringify(req.session));
	var user = req.session.user;
	console.log(user);
	if (user){
		next()
	} else {
		res.redirect('/login');
	}

}

app.listen(port);
console.log('The magic happens on port ' + port);