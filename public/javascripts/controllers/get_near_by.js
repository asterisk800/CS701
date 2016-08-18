btnApp.factory('getNearBy', function () {
    var code = null;
    var response = null;
    $http({method: 'GET',
        url: $scope.mbtaBaseUrl + $scope.mbtaStopUri + '?api_key=' + $scope.mbtaFreeApiKey + '&lat=' + lat + '&lon=' + long + '&format=json',
        cache: $templateCache}
    )
        .then(function(response) {
            var status = response.status;
            var data = response.data;
        }, function(response) {
            data = response.data || "Request failed";
        });

});