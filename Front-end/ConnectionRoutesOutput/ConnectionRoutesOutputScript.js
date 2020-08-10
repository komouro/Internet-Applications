var current_results;
var current_result_flags;


function AfterUpdate ($scope) {
  $scope.$apply(function() {
    $scope.Updated = "Information has been updated. Press 'Show' to see the results.";
  });
  console.log("Communication with back - end was a success.");
}


function PrepareResultsForOutput(tmp, $scope){
  const best_route_length = tmp[0]["Best route length"];
  const source = tmp[0]["Nearest Station (Src)"];
  const destination = tmp[0]["Nearest Station (Dst)"];
  if (best_route_length == "0"){
    console.log("source == destination so one route found");
    var msg = "Source and Destination are too close to each other and to station " + tmp[0]["Path by name"] + " with ID " + source;
    msg = msg + ". You are advised not to use any bus lines."
    empty_array = new Array();
    current_results = new Array();
    current_result_flags = new Array();
    current_results.push(msg);
    current_results.push(empty_array);
    current_results.push(empty_array);
    current_result_flags.push(false);
    current_result_flags.push(true);
    current_result_flags.push(true);
  }
  else if (best_route_length == "-"){
    console.log("source != destination and no routes found");
    var msg = "No routes found. Source is close to station with ID " + source;
    msg = msg + ". Destination is close to station with ID " + destination;
    msg = msg + ". You are advised not to use any bus lines."
    empty_array = new Array();
    current_results = new Array();
    current_result_flags = new Array();
    current_results.push(msg);
    current_results.push(empty_array);
    current_results.push(empty_array);
    current_result_flags.push(false);
    current_result_flags.push(true);
    current_result_flags.push(true);
  }
  else{
    console.log("source and destination have at least one connection route")
    var best_route = new Array();
    best_route.push(best_route_length);
    best_route.push(tmp[0]["Path by station id"]);
    best_route.push(tmp[0]["Path by name"]);
    best_route.push(tmp[0]["Path by coordinates"]);
    const total_alternative_routes = tmp[1]["Number of routes"];
    var alternative_routes = tmp[1]["Routes"];
    const size = Number(total_alternative_routes);
    var alter_res = new Array();
    for (var i = 0; i < size; i++){
      var h = new Array(3);
      h[0] = alternative_routes[i]["Path by station id"];
      h[1] = alternative_routes[i]["Path by name"];
      h[2] = alternative_routes[i]["Path by coordinates"];
      alter_res.push(h);
    }
    var msg = "Between the source and the destination " + total_alternative_routes + " routes were found.";
    msg = msg + " The route with the minimum number of intermediate stopping points is also provided.";
    current_results = new Array();
    current_result_flags = new Array();
    current_results.push(msg);
    current_results.push(best_route);
    current_results.push(alter_res);
    current_result_flags.push(false);
    current_result_flags.push(false);
    current_result_flags.push(false);
  }
  AfterUpdate($scope);
}


function Http_Request (params, $scope) {
  var url_init = "http://localhost:8765/Mouro/api/ConnectionRoutes";
  var url = url_init + "/" + params[0] + "/" + params[1] + "/" + params[2] + "/" + params[3] + "/" + params[4] + "/" + params[5];
  method = "GET";
  async_flag = true;
  var xhttp = new XMLHttpRequest();
  console.log(url);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var tmp = JSON.parse(this.responseText);
        PrepareResultsForOutput(tmp, $scope);
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
  for (var j = 0; j < 6; j++){
    var tmp_D = tmp_C[j].split("=");
    params.push(tmp_D[1]);
  }
  console.log(params);
  Http_Request(params, $scope);
}


var app_output = angular.module("ConnectionRoutesOutputPage", []);
app_output.controller('ConnectionRoutesOutputController',  function($scope, $window) {
  const our_loc = $window.location.href;
  $scope.result = new Array();
  current_results = new Array();
  current_result_flags = new Array();
  $scope.hidden_flag_msg = true;
  $scope.hidden_flag_best = true;
  $scope.hidden_flag_alternative = true;
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
    current_result_flags = new Array();
    $scope.hidden_flag_msg = true;
    $scope.hidden_flag_best = true;
    $scope.hidden_flag_alternative = true;
    $scope.Updated = "Please wait. Loading updated information...";
    Get_Parameters_And_Send_Request(our_loc, $scope);
  }
  $scope.ShowTable = function () {
    //console.log(current_results);
    //console.log(current_result_flags);
    $scope.Result_msg = current_results[0];
    $scope.result_best = current_results[1];
    $scope.result_alternative = current_results[2];
    $scope.hidden_flag_msg = current_result_flags[0];
    $scope.hidden_flag_best = current_result_flags[1];
    $scope.hidden_flag_alternative = current_result_flags[2];
    $scope.Updated = "";
  }
  $scope.HideTable = function () {
    $scope.result = new Array();
    $scope.hidden_flag_msg = true;
    $scope.hidden_flag_best = true;
    $scope.hidden_flag_alternative = true;
    $scope.Updated = "Information has been hidden. Press 'Show' to reveal the results.";
  }
});
