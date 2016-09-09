'use strict';

var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/MonteHallDB', {
  logging: false
});



//User 
 //-Sequential Index
 //-Name
var User = db.define('user', {
  name: {
    type: Sequelize.STRING
  }
});



//Game 
  //- First guess
  //- Door Shown
  //- Second guess
  //- Where Car
  //- Won 

var Game = db.define('game', {
  firstGuess: {
    type: Sequelize.INTEGER
  },
  doorShown: {
    type: Sequelize.INTEGER
  },
  switch: {
    type: Sequelize.BOOLEAN
  },
  carDoor: {
    type: Sequelize.INTEGER
  },
  win: {
    type: Sequelize.BOOLEAN
  }
});

Game.belongsTo(User, {as: 'player'});

module.exports = {
  User: User,
  Game: Game,
  db: db
}
