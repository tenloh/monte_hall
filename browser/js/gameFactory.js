game.factory('GameFactory', function($http){
    return {
        saveGame: function(data){
            return $http.post('/save', data)
            .then(function(response){
                return response;
            }).catch(console.error.bind(console));
        }
    };
});