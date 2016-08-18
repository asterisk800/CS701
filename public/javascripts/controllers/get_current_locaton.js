btnApp.factory('currentPositionService', function ($rootScope, $q) {
    return {
        getCurrentPosition: function () {
            var deferred = $q.defer();
            var currentPosition = '';
            if (navigator.geolocation){
                window.navigator.geolocation.getCurrentPosition(function (sucess, error, opton) {
                    $rootScope.$apply(function() {
                        deferred.resolve(sucess);
                        currentPosition = sucess;
                        return currentPosition;
                    });

                });
            }
        }
    }
});
