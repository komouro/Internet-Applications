var current_results;


function AfterUpdate ($scope) {
  $scope.$apply(function() {
    $scope.Updated = "Information has been updated. Press 'Show' to see the results.";
  });
  console.log("Communication with back - end was a success.");
}


function Http_Request (params, $scope) {
  var url_init = "http://localhost:8765/Mouro/api/NearestStations"
  var url = url_init + "/" + params[0] + "/" + params[1] + "/" + params[2] + "/" + params[3]
  method = "GET"
  async_flag = true;
  var xhttp = new XMLHttpRequest();
  console.log(url);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var tmp = JSON.parse(this.responseText);
        var size = tmp.length;
        console.log(size);
        for (var i = 0; i < size; i++){
          var h = new Array(4);
          h[0] = tmp[i]["Station id"];
          h[1] = tmp[i]["Station name"];
          h[2] = tmp[i]["Station lat"];
          h[3] = tmp[i]["Station lon"];
          current_results.push(h);
        }
        //console.log(current_results);
        AfterUpdate($scope);
     }
  };
  xhttp.open(method, url, async_flag);
  xhttp.send();
}


function Get_Parameters_And_Send_Request (our_loc, $scope) {
  var tmp_A = our_loc.split("?");
  var tmp_B = tmp_A[1];
  var tmp_C = tmp_B.split("&");
  var params = new Array();
  for (var j = 0; j < 4; j++){
    var tmp_D = tmp_C[j].split("=");
    params.push(tmp_D[1]);
  }
  console.log(params);
  Http_Request(params, $scope);
}


var app_output = angular.module("NearestStationsOutputPage", []);
app_output.controller('NearestStationsOutputController',  function($scope, $window) {
  const our_loc = $window.location.href;
  $scope.result = new Array();
  current_results = new Array();
  $scope.hidden_flag = true;
  $scope.Updated = "Please wait. Loading updated information...";
  Get_Parameters_And_Send_Request(our_loc, $scope);
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
    $scope.result = new Array();
    current_results = new Array();
    $scope.hidden_flag = true;
    $scope.Updated = "Please wait. Loading updated information...";
    Get_Parameters_And_Send_Request(our_loc, $scope);
  }
  $scope.ShowTable = function () {
    $scope.hidden_flag = false;
    $scope.result = current_results;
    $scope.Updated = "";
  }
  $scope.HideTable = function () {
    $scope.result = new Array();
    $scope.hidden_flag = true;
    $scope.Updated = "Information has been hidden. Press 'Show' to reveal the results.";
  }
});
