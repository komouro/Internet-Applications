var app = angular.module("NearestStationsPage", []);
app.controller('NearestStationsController',  function($scope, $window, $http) {
  $scope.service_options = ["local", "web"]
  $scope.EnterHomePage = function () {
    $window.location.href = "../MouroAppHome/Home.html";
  }
  $scope.EnterNearestStationsPage = function () {
    $window.location.href = "../NearestStations/NearestStations.html";
  }
  $scope.EnterCommonPathPage = function () {
    $window.location.href = "../ConnectionRoutes/ConnectionRoutes.html";
  }
  $scope.EnterWeatherConditionsPage = function () {
    $window.location.href = "../WeatherConditions/WeatherConditions.html";
  }
  $scope.RequestReadyForSubmission = function () {
    const x = $scope.lat
    const y = $scope.lon
    const c = $scope.num
    const s = $scope.service
    var url_format = "http://localhost:8765/Mouro/api/NearestStations"
    var url = url_format + "/" + x.toString() + "/" + y.toString()
    url = url + "/" + c.toString() + "/" + s
    document.getElementById("submission_format").action = url;
  }
});
