var app = angular.module("ConnectionRoutesPage", []);
app.controller('ConnectionRoutesController',  function($scope, $window) {
  $scope.lat_src = null;
  $scope.lon_src = null;
  $scope.lat_dst = null;
  $scope.lon_dst = null;
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
  $scope.MakeTheRequest = function () {
    const x1 = $scope.lat_src
    const y1 = $scope.lon_src
    const x2 = $scope.lat_dst
    const y2 = $scope.lon_dst
    const c = $scope.num
    const s = $scope.service
    if (x1 == null || x2 == null || y1 == null || y2 == null || c == null || s == null) {
      console.log("All parameters are required.");
    }
    else {
      var params = "?x1=" + x1.toString() + "&y1=" + y1.toString() + "&x2=" + x2.toString() + "&y2=" + y2.toString() + "&c=" + c.toString() + "&s=" + s;
      $window.location.href = "../ConnectionRoutesOutput/ConnectionRoutesOutput.html" + params;
    }
  }
  $scope.ClearSlots = function () {
    $scope.lat_src = null;
    $scope.lon_src = null;
    $scope.lat_dst = null;
    $scope.lon_dst = null;
    $scope.num = null;
    $scope.service = null;
  }
});
