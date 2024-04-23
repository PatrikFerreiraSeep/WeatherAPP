var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

weatherApp.service('cityService', function() {
    this.city = "Lisbon";
})

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
       cityService.city = $scope.city;
    });

}]);
// forecastController
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    $scope.city = cityService.city;

    const apiKey = '56060f822dd4ae99434c3e804158821a';

    $scope.weatherAPI = $resource(
        "http://api.openweathermap.org/data/2.5/weather",
        {
            callback: "JSON_CALLBACK",
            appid: apiKey
        },
        {
            get: { method: "JSONP" }
        }
    );

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city });


    $scope.weatherResult.$promise.then(function(data) {
        $scope.weatherResult = data;
        console.log($scope.weatherResult);
    }).catch(function(error) {
        console.error(error);
    });

    $scope.converteToCelsius = function(temp) {
        return (temp - 273.15).toFixed(2);
    }
}]);


