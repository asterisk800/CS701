angular.module('nearByDirective', [])
.directive('nearBy', function () {
    return {
        //restrict to an element directive
        restrict: 'E',
        scope: {
            //two way binding with the home controller
            stop: '='
        },
        templateUrl:'../templates/directives/near_by.html',
        controller: function ($scope, $log, $q, $http) {
            //$log.info($scope.stop);
            $scope.sotp = stop;
            $scope.mbtaApiKey = 'wX9NwuHnZU2ToO7GmGR9uw';
            $scope.method = 'GET';
            $scope.mbtaBaseUrl = 'http://realtime.mbta.com/developer/api/v2/';
            $scope.mbtaStopUri = '/stopsbylocation';
            $scope.mbtaRouteByStopUri = 'routesbystop'
            $scope.mbtaPredictionsByStopUri = 'predictionsbystop'
            $http.get($scope.mbtaBaseUrl + $scope.mbtaRouteByStopUri + '?api_key=' + $scope.mbtaApiKey + '&stop=' + $scope.stop.stop_id + '&format=json')
                .then(function (response) {
                    $scope.routeByStopMode = response.data;
                   // $log.info($scope.routeByStopMode);

                });

            $scope.getPredictionsByStop = function (stop_id) {
                $http.get($scope.mbtaBaseUrl + $scope.mbtaPredictionsByStopUri + '?api_key=' + $scope.mbtaApiKey + '&stop=' + stop_id + '&format=json')
                    .then(function (response) {
                        $scope.predictionsByStop = response.data;
                        $log.info($scope.predictionsByStop);
                        //show
                        if (angular.isObject($scope.predictionsByStop.mode)){
                            $scope.section_title = 'Prediction By Stop'
                        }

                    });
            }
        }
    }
});