var app = angular.module("WeatherConditionsPage", []);
app.controller('WeatherConditionsController',  function($scope, $window) {
  $scope.stationtype = "both"
  $scope.service_options = ["local", "web"]
  $scope.station_options = ["source", "destination", "both"]
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
    const t = $scope.stationtype
    const s = $scope.service
    var url_format = "http://localhost:8765/Mouro/api/WeatherConditions"
    console.log(url_format);
    var url = url_format + "/" + t + "/" + s
    document.getElementById("submission_format").action = url;
  }
});
