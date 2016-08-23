var chai = require('chai');
var chai_expect = chai.expect;
var monte_hall = require('../index.js');
var spies = require('chai-spies');
var monte = require('../index.js');
var monteDB = require('../routes/monteDB.js');

beforeEach('Reset DB and Add Pink Floyd User', function(done){
	monteDB.db.sync({force: true})
	.then(function(){
		done();
	}).catch(done);
});



describe('Monte Hall Game Play Tests', function(){
	var game;

	beforeEach('Start Game', function(){
		game = monte.startGame();
	})

	describe('Start of Game', function(){

		it('Has Everything Set to Defaults', function(){

			expect(typeof game).to.be.equal('object');

			//At the beginning of the game there is no guess for the current game
			expect(game.firstGuess).to.be.equal(null);
			expect(game.secondGuess).to.be.equal(null);

			//Car should not be in a door that doesn't exit
			expect(game.carDoor > 3).to.be.equal(false);
			expect(game.carDoor < 1).to.be.equal(false);
		});


		it('Creates a User if it doesnt exist', function(){
			var user = 'Pink Floyd';

		});

		it('Asks users to enter name in the beginning', function(){

		})

	});


	describe('Game Play', function(){

		it('Allows a user to click a first door', function(){

		});

		it('opens the non-selected door with a goat', function(){

		});

		it('Disallows user to click revealed door', function(){

		});

		it('Allows a non-open door to be clicked as second door', function(){

		});

		it('Displays result if winner', function(){

		});

		it('Displays result if loser', function(){

		});

		it('Allows game to be played again', function(){

		});


	});

	describe('Saving Data', function(){

		it('Saves the Game to the Database when result is winner or loser', function(){

		});

		it('Saves the Game to the Database with the user associated', function(){

		});

		it('Loads data for user', function(){

		});

		it('Loads data for everyone if requested', function(){

		});


	})
});