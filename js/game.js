var models = require('../routes/monteDB.js');
var User = models.User;
var Game = models.Game;

//Variables Needed
var Game = new function () {
    this.username; //STRING
    this.firstGuess = -1; //INTEGER
    this.carDoor; //INTEGER
    this.stay; //BOOLEAN
}

//RESET Variables
Game.prototype.reset = function () {
    this.username = "";
    this.firstGuess = -1 ;
    this.carDoor = 0;
    this.stay = null;

};

var createWinningDoor = function () {
    return Math.ceil(Math.random() * 3);
};

var chooseDoorToReveal = function (carDoor, firstGuess) {
    for (var i = 1; i <= 3; i++) {
        if (carDoor !== i && firstGuess !== i) return i;
    };
    return -1; //Something went wrong
};

var winner = function(finalPick, winningDoor){
    return finalPick === winningDoor;
}

Game.prototype.setFirstGuess = function(guess){
    this.firstGuess = guess;
}

Game.prototype.setUser = function (name) {
    this.username = name;
};

Game.prototype.guess = function(guess){
    if(this.firstGuess === -1){
        this.firstGuess = guess;
        return 'First Guess';
    } else if (guess === this.carDoor){
        //SAVE GAME IN DATABASE
        return 'Winner';
    } else {
        //SAVE GAME IN DATABASE
        return 'Loser';
    }

}


Game.prototype.startGame = function (username) {
    this.reset();
    this.setUser(name);
    this.carDoor = createWinningDoor();   
}

let saveIntoDatabase = function(game){
    Game.create({
        firstGuess: game.firstGuess,
        carDoor: game.carDoor,
        switched: game.switched,
        won: game.won
    })
    .then(function(response){
        return;
    })
    .catch(console.error.bind(console));
}
