var chai = require('chai');
var chai_expect = chai.expect;
var monte_hall = require('../index.js');
var spies = require('chai-spies');
var monte = require('../index.js');
var monteDB = require('../routes/monteDB.js');

beforeEach('Reset DB', function(done){
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


		it('Creates a User if it doesnt exist', function(done){
			var user = 'Pink Floyd';
			monteDB.User.create({
				name: user
			}).
			then(function(response){
				expect(response.name).to.be.equal('Pink Floyd');
				done();
			}).catch(done);

		});

		it('Cannot take a blank name', function(){
			//Don't know how to test this -- need front end testing
			var name = '';
			monteDB.User.create({
				name: name
			})
			.then(function(response){
				expect(response).to.be.equal(null);
				done();
			}).catch(function(err){
				expect(err).to.be.not.equal(null);
				done();
			});
		})

	});


	describe('Game Play', function(){

		var newGame = monte.startGame();
		var winningDoor = newGame.winningDoor;

		it('Allows a user to click a first door and stores it', function(){
			var input = '1';
			newGame.chooseDoor(input);
			expect(newGame.firstGuess).to.be.equal('1');
		});

		it('opens a non-selected door with a goat and not the chosen door', function(){
			expect(newGame.revealedDoor).to.not.be.equal(winningDoor);
			expect(newGame.revealedDoor).to.not.be.equal(input);
		});

		it('Prompts User If They Want to Switch?', function(){
			// expect(newGame)
		});

		it('Disallows user to click revealed door', function(){
			var click = winningDoor;
			expect(newGame.chooseDoor(winningDoor)).to.throw(Error);
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