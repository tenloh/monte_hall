game.controller('MainCtrl', function ($scope, GameFactory) {
    $scope.carDoor = -1; //Value for which door has the car
    $scope.firstGuess = -1; //Value for what the first guess was
    $scope.switch = false; //Whether they switched or not (This is For Saving Purposes)
    $scope.revealDoor = -1; //Which door was revealed
    $scope.win = null; //True or false, can be used to reveal winner message
    $scope.invalid = false; //True of false, can be used to reveal invalid choice message

    var setCarDoor = function () {
        return Math.ceil(Math.random() * 3);
    };

    var revealDoor = function () {
        for (var i = 1; i <= 3; i++) {
            if ($scope.carDoor !== i && $scope.firstGuess !== i) {
                $scope.revealDoor = i;
                console.log('Revealed Door', $scope.revealDoor);
                break;
            }
        }
    };

    var isWinner = function (choice) {
        console.log('CHOICE', choice);
        return choice === $scope.carDoor;
    };

    $scope.startGame = function () {
        $scope.resetGame();
        $scope.carDoor = setCarDoor();
        console.log('carDoor', $scope.carDoor);
    };

    $scope.guess = function (doorNumber) {
        $scope.invalid = false;
        if ($scope.firstGuess === -1) {
            console.log('doorNumber', doorNumber);
            $scope.firstGuess = doorNumber;
            revealDoor();
        } else {
            //This is second guess
            console.log('Guess #2', doorNumber);
            console.log('Scope of Door', $scope.carDoor);
            if (doorNumber === $scope.revealDoor) {
                console.log('Invalid Choice...somehow');
                return $scope.invalid = true;
            }
            if ($scope.win === true || $scope.win === false) return console.log('Game is over!');
            if ($scope.firstGuess !== doorNumber) {
                $scope.switch = true
            }
            else {
                $scope.switch = false;
            }
            $scope.win = isWinner(doorNumber);
            console.log('$scope.win', $scope.win);
        }
    };

    $scope.saveGame = function () {
        if ($scope.win === null) return;
        console.log('Saving Game...');
        var data = {
            switch: $scope.switch,
            win: $scope.win
        }
        GameFactory.saveGame(data)
            .then(function (response) {
                return response;
            }).catch(console.error.bind(console));
    };

    $scope.resetGame = function () {
        $scope.carDoor = -1;
        $scope.firstGuess = -1;
        $scope.switch = false;
        $scope.revealDoor = -1;
        $scope.win = null;
        $scope.invalid = false;
    };
});