var app = angular.module("WeatherConditionsPage", []);
app.controller('WeatherConditionsController',  function($scope, $window) {
  $scope.stationtype = null;
  $scope.service = null;
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
  $scope.MakeTheRequest = function () {
    const t = $scope.stationtype
    const s = $scope.service
    if (t == null || s == null) {
      console.log("All parameters are required.");
    }
    else {
      var params = "?t=" + t + "&s=" + s;
      console.log(params);
      var new_window = "../WeatherConditionsOutput/WeatherConditionsOutput.html" + params;
      console.log(new_window);
      $window.location.href = "../WeatherConditionsOutput/WeatherConditionsOutput.html" + params;
    }
  }
  $scope.ClearSlots = function () {
    $scope.stationtype = null;
    $scope.service = null;
  }
});
