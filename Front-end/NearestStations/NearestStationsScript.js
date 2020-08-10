var app = angular.module("NearestStationsPage", []);
app.controller('NearestStationsController',  function($scope, $window) {
  $scope.lat = null;
  $scope.lon = null;
  $scope.num = null;
  $scope.service = null;
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
  $scope.SubmissionReady = function () {
    const x = $scope.lat
    const y = $scope.lon
    const c = $scope.num
    const s = $scope.service
    if (x == null || y == null || c == null || s == null) {
      console.log("All parameters are required.");
    }
    else {
      var params = "?x=" + x.toString() + "&y=" + y.toString() + "&c=" + c.toString() + "&s=" + s;
      $window.location.href = "../NearestStationsOutput/NearestStationsOutput.html" + params;
    }
  }
  $scope.ClearSlots = function () {
    $scope.lat = null;
    $scope.lon = null;
    $scope.num = null;
    $scope.service = null;
  }
});
