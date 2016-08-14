'use strict'

//REQUIRES MODULES
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var models = require('./routes/monteDB.js');
var User = models.User;
var Game = models.Game;

//SETTING UP ROUTING
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gameId,
    userId; 

app.get('/', function(req, res, next){
  User.create({
    name: 'Ten Loh Test'
  })
  .then(function(response){
      res.send('Hello, ' + response.name + '.You have reached Monte Hall Web App!');
  })
  .catch(next)

});

app.get('/favicon.ico', function(req, res, next){
  next();
})

app.use(function(err, req, res, next){
  res.send(err);
});


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



