var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//localStorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

//users
var users = {
	"paco": "noni",
	"oscar": "noni",
	"kevin": "12345",
};

//muestro formulario login
app.get('/login', function (req, res) {
  res.render('loginform');
});

//proceso los inputs del usuario
app.post('/login', function (req, res) {
  var user = "";
  var inputUser = req.body.username;
  //check username
  if( inputUser in users ) {
  	//check password
  	if ( req.body.password == users[inputUser] ) {
  		user = inputUser;
  	}
  }

  res.render('loginformPost', {user:user})
});

//muestro formulario register
app.get('/register', function (req, res) {
  res.render('registerform');
});

//proceso los inputs del usuario
app.post('/register', function (req, res) {
  var user = "";
  var inputUser = req.body.username;
  //check username
  if( inputUser in users ) {
  	//comprobamos que el usar no exista
  }else{
  	//check password
  	if ( req.body.password1 == req.body.password2 ) {
  		user = inputUser;
  	}
  }

  res.render('registerformPost', {user:user})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
