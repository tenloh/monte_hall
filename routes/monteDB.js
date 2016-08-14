'use strict';

var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/MonteHallDB');



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
  switched: {
    type: Sequelize.INTEGER
  },
  carDoor: {
    type: Sequelize.INTEGER
  },
  won: {
    type: Sequelize.BOOLEAN
  }
});

Game.belongsTo(User, {as: 'player'});

module.exports = {
  User: User,
  Game: Game,
  db: db
}
