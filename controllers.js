weatherApp.controller('homeController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
     });

    const apiKey = '56060f822dd4ae99434c3e804158821a';
    $scope.days = $routeParams.days || '1';

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

    $scope.updateWeather = function() {
        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city });
        $scope.weatherResult.$promise.then(function(data) {
            $scope.weatherResult = data;
            console.log($scope.weatherResult);
        }).catch(function(error) {
            console.error(error);
        });
    };
}])