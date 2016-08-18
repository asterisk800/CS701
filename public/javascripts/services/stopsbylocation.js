var app = angular.module('btnApp', []);
app.service('stopsByLocation',[ "$http", "$q", function ($http, $q) {
    var deferred = $q.defer();
    $http.get('http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=lcBCvn-AEUmSvw6iI4zr4A/')
}])



$scope.getNearBy = function() {
    $http({method: $scope.method,
        url: $scope.mbtaBaseUrl + $scope.mbtaStopUri + '?api_key=' + $scope.mbtaApiKey + '&lat=' + $scope.currentPosition.coords.latitude + '&lon=' + $scope.currentPosition.coords.longitude + '&format=json',
        cache: $templateCache}
    )
        .then(function(response) {
            $scope.status = response.status;
            $scope.nearByList = response.data;
            //$log.info("From getNearby: " + $scope.nearByList.stop);
            initMap($scope.nearByList);
        },function(response) {
            $scope.nearByList = response.data || "Request failed";
        });
};
