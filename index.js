var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//localStorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

//app hello world
app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

//app formulario
app.get('/form', (req, res) => {
  res.render('form', {name: 'name', pass: 'pass'});
});

//resultado entrada formulario
app.post('/resultado', function(req, res) {
  var name = req.body.name;
  var pass = req.body.pass;
  res.render('msj', {name: name, pass: pass});
});

//muestro formulario login
app.get('/login', function (req, res) {
  res.render('loginform');
});

//proceso los inputs del usuario
app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //check usuario en localstorage
  if (localStorage.getItem(username)) {
    //check password en localstorage
    if (password == localStorage.getItem(username)) {
      user = username;
    } else {
      user = "";
    }
  } else {
    user = "";
  }

  res.render('loginformPost', {user:user})
});

//muestro formulario register
app.get('/register', function (req, res) {
  res.render('registerform');
});

//proceso los inputs del usuario
app.post('/register', function (req, res) {
  var user = req.body.username;
  var pass1 = req.body.password1;
  var pass2 = req.body.password2;

  //check passwords iguales
  if (pass1==pass2) {
    password ="YES";
  }else{
    password ="NO";
  }
  //check user existente en localstorage
  if (localStorage.getItem(user)) {
    username = "NO";
  }else{
    username = "YES";
  }
  //check usuario y contraseña, lo creamos en el localstorage
  if (username == "YES" && password == "YES") {
    localStorage.setItem(user, pass1)
  }
  res.render('registerformPost', {password:password,username:username})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
