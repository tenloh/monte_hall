game.controller('MainCtrl', function ($scope, GameFactory) {
    $scope.carDoor = -1;
    $scope.firstGuess = -1;
    $scope.switch = false;
    $scope.revealDoor = -1;

    var setCarDoor = function () {
        return Math.ceil(Math.random() * 3);
    }

    var revealDoor = function () {
        for (var i = 1; i <= 3; i++) {
            if ($scope.carDoor !== i && $scope.firstGuess !== i) {
                $scope.revealDoor = i;
                break;
            }
        }

    }

    var isWinner = function (choice) {
        return choice === $scope.carDoor;
    }

    $scope.startGame = function () {
        $scope.resetGame();
        $scope.carDoor = setCarDoor();
    }

    $scope.guess = function (doorNumber) {
        if ($scope.firstGuess === -1) {
            $scope.firstGuess = doorNumber;
            revealDoor();
        } else {
            //This is second guess
            isWinner(doorNumber);
        }
    }

    $scope.saveGame = function () {
        var data = {
            switch: $scope.switch,
            winner: $scope.winner,
            user: $scope.user
        }
        GameFactory.save(data)
        .then(function(response){
            return response;
        }).catch(console.error.bind(console));
    }

    $scope.resetGame = function () {
        $scope.carDoor = -1;
        $scope.firstGuess = -1;
        $scope.switch = false;
        $scope.revealDoor = -1;
    }
});