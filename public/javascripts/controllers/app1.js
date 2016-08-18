var btnApp = angular.module('btnApp', ['ngRoute']);

btnApp.controller('LocationController', ['$scope', '$route','$window', '$http','$templateCache', 'currentPositionService', function ($scope, $route, $window, $http, $templateCache, currentPositionService) {
    $scope.currentPosition = currentPositionService.getCurrentPosition();
    console.log(currentPositionService);
    $scope.mbtaFreeApiKey = 'lcBCvn-AEUmSvw6iI4zr4A';
    $scope.method = 'GET';
    $scope.mbtaBaseUrl = 'http://realtime.mbta.com/developer/api/v2/';
    $scope.mbtaStopUri = '/stopsbylocation';

    $scope.initMap = function() {
        var myLatLng = {lat: $scope.currentPosition.coords.latitude, lng: $scope.currentPosition.coords.longitude};

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }

}]);



btnApp.controller('MBTAController', ['$sope', '$route', 'http','$window', function ($scope, $route, $http, $window) {


}]);

