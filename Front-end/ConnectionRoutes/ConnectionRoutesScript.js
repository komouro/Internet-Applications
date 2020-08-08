var app = angular.module("ConnectionRoutesPage", []);
app.controller('ConnectionRoutesController',  function($scope, $window) {
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
    const x1 = $scope.lat_src
    const y1 = $scope.lon_src
    const x2 = $scope.lat_dst
    const y2 = $scope.lon_dst
    const c = $scope.num
    const s = $scope.service
    var url_format = "http://localhost:8765/Mouro/api/ConnectionRoutes"
    var url = url_format + "/" + x1.toString() + "/" + y1.toString()
    url = url + "/" + x2.toString() + "/" + y2.toString()
    url = url + "/" + c.toString() + "/" + s
    document.getElementById("submission_format").action = url;
  }
});
