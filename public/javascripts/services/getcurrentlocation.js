var app = angular.module('btnApp', []);
app.service('currentLocationService',[ "$http", "$q", function ($http, $q) {
    var deferred = $q.defer();
    if(navigator.geolocation)
        {
            window.navigator.geolocation.getCurrentPosition(function (sucess, error, opton) {
                deferred.resolve(sucess);
                deferred.reject(error);
            });
        }
    return q.promise;
}])