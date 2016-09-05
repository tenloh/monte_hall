'use strict'

//REQUIRES MODULES
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var models = require('./routes/monteDB.js');
var User = models.User;
var Game = models.Game;
var swig = require('swig');
var path = require('path');

//SETTING UP ROUTING
var app = express();

//LOGGING
app.use(morgan('dev'));

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/browser')));

// app.get('/:name', function(req, res, next){
//   setUpGame();
//   User.create({
//     name: req.params.name
//   })
//   .then(function(userResponse){
//     user = userResponse;
//     return Game.create({
//       carDoor: 1
//     }).then(function(gameResponse){
//       game = gameResponse;
//       gameResponse.setPlayer(userResponse.id);
//     });
//   })
//   .then(function(response){
//       //res.send('Hello, ' + user.name + '.You have reached Monte Hall Web App!');
//       res.render('MonteHall');
//   })
//   .catch(next);

//   //res.send('Hello, you've reached the Monte Hall Web App!);
// });
app.get('/', function(req, res, next){
  res.render('MonteHall.html');
});

app.post('/save', function(req, res, next){
});


app.get('/favicon.ico', function(req, res, next){
  next();
})

app.use(function(err, req, res, next){
  res.send(err);
});



//SYNCING DATABASES (OR CLEAR) BEFORE SETTING PORT LIVE
models.db.sync({force: true})
.then(function(content){
  // console.log(content);
  app.listen(1456, function(req, res, next){
    console.log('You\'re live at Port 1456!');
  })
})
.catch(function(err) { 
  console.error(err)
})

module.exports = app;



