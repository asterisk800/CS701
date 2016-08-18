var btnApp = angular.module('btnApp', ['ngRoute', 'nearByDirective'])

    .config(function ($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl : '../../templates/index.html',
                controller: 'LocationController'
            })
            .when('/near_by', {
                templateUrl : '../../templates/directives/near_by.html',
                controller: 'LocationController'
            })
            .when('/predictions_by_stop', {
                templateUrl : '../../templates/directives/predictions_by_stop.html',
                controller: 'LocationController'
            })
            .when("/trips", {
                templateUrl : '../../templates/directives/trips',
                controller: 'LocationController'
            })
            .when("/direction", {
                templateUrl : '../../templates/directives/direction',
                controller: 'LocationController'
            })

            .when('/about_us', {
                templateUrl : '../../templates/directives/about_us.html',
                controller: 'LocationController'
            })
            .otherwise({
                redirectTo: '/'
            })
    })

    //service to get current location using geolocation service
    .service('currentLocationService',["$q", function ($q) {
        var deferred = $q.defer();
        if(navigator.geolocation)
        {
            window.navigator.geolocation.getCurrentPosition(function (sucess, error, opton) {
                deferred.resolve(sucess);
                deferred.reject(error);
            });

            this.getCurrentLocation = function () {
                return deferred.promise;
            }
        }
    }])

    .controller('LocationController', ['$rootScope','$scope', '$log', '$route','$window', '$http','$templateCache', '$q', '$filter', 'currentLocationService', function ($rootScope, $scope, $log, $route, $window, $http, $templateCache, $q, $filter, currentLocationService) {
        $rootScope.mbtaApiKey = 'wX9NwuHnZU2ToO7GmGR9uw';
        $rootScope.method = 'GET';
        $rootScope.mbtaBaseUrl = 'http://realtime.mbta.com/developer/api/v2/';
        $rootScope.mbtaStopUri = '/stopsbylocation';
        $rootScope.mbtaRouteByStopUri = 'routesbystop'


        ////calling the getNearby function after the getCurrentPosition is called using promise
        currentLocationService.getCurrentLocation().then(function (data) {
            $scope.currentPosition = data;
           $log.info($scope.currentPosition);

        }).then(function () {
           $scope.getNearBy();
               $log.info($scope.nearByList +  $scope.status);
        })


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



            var initMap = function(nearByList) {
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 17,
                    center: new google.maps.LatLng($scope.currentPosition.coords.latitude, $scope.currentPosition.coords.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var GeoMarker = new GeolocationMarker(map);

                var infowindow = new google.maps.InfoWindow();
                var marker;


                marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.currentPosition.coords.latitude, $scope.currentPosition.coords.longitude),
                    label: "S",
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        infowindow.setContent("Your current location");
                        infowindow.open(map, marker);
                    }
                })(marker));




                nearByList.stop.forEach(function (stop) {

                    //$log.info("From initMap: " + stop.stop_lat + stop.stop_lon);

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(stop.stop_lat, stop.stop_lon),
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infowindow.setContent("Stop " + stop.stop_name +  "\n + Distance: " + $filter('number')(stop.distance, 2));
                            infowindow.open(map, marker);
                        }
                    })(marker));

                })

        }

    }]);





