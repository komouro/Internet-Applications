const http = require('http');
const https = require('https');
const fs = require('fs');
const util = require('util');

const upper_limit_device_id = 1000;
const total_http_req = 230;
const rain_conditions = ["Rain", "Thunderstorm"];
var rawData_helper;
var rawData;
var results;
var station_info;
var num_stations;
var neighborhood;
var num_paths;
var edges;
var good_stations_no_rain;
var reachable_stations;
var marked_stations_origin;
var marked_stations_destination;


function StageFive_Return_Result(res){
  res.send(results);
}


function StageFour_Fix_Result(t, res){
  if (t == "source"){
    for (var i = 0; i < upper_limit_device_id; i++){
      if (marked_stations_origin[i] == true){
        var a = (i + 1).toString();
        var b = station_info[i].name;
        var c = station_info[i].coords;
        var d = good_stations_no_rain[i];
        var e = "We can use " + good_stations_no_rain[i].length + " bus line(s) from the station " + b + " where it is not raining.";
        var tmp = {origin_id: a, origin_name: b, origin_coords: c, bus_lines: d, Explanation: e};
        results.push(tmp);
      }
    }
  }
  else if (t == "destination"){
    for (var j = 0; j < upper_limit_device_id; j++){
      if (marked_stations_destination[j] == true){
        var a = (j + 1).toString();
        var b = station_info[j].name;
        var c = station_info[j].coords;
        var d = reachable_stations[j];
        var e = "We can use " + reachable_stations[j].length + " bus line(s) to get to station " + b + " by another station where it is not raining.";
        var tmp = {destination_id: a, destination_name: b, destination_coords: c, bus_lines: d, Explanation: e};
        results.push(tmp);
      }
    }
  }
  else if (t == "both"){
    for (var k = 0; k < upper_limit_device_id; k++){
      if (marked_stations_origin[k] == true){
        var a = (k + 1).toString();
        var b = station_info[k].name;
        var c = station_info[k].coords;
        var d = good_stations_no_rain[k];
        var e = "We can use " + good_stations_no_rain[k].length + " bus line(s) from the station " + b + " where it is not raining.";
        var tmp = {origin_id: a, origin_name: b, origin_coords: c, bus_lines: d, Explanation: e};
        results.push(tmp);
      }
    }
    for (var u = 0; u < upper_limit_device_id; u++){
      if (marked_stations_destination[u] == true){
        var a = (u + 1).toString();
        var b = station_info[u].name;
        var c = station_info[u].coords;
        var d = reachable_stations[u];
        var e = "We can use " + reachable_stations[u].length + " bus line(s) to get to station " + b + " by another station where it is not raining.";
        var tmp = {destination_id: a, destination_name: b, destination_coords: c, bus_lines: d, Explanation: e};
        results.push(tmp);
      }
    }
  }
  else{
    res.send("Bad type of station (sourse, destination, both). Please check the parameters of the query.");
  }
  StageFive_Return_Result(res);
}


function StageThree_no_rain_stations_and_paths(t, res){
  var weather_array = rawData[2];
  var size = weather_array.length;
  if (size != num_paths) {
    res.send("Something is wrong with the data. Please try again later.");
    return 0;
  }
  good_stations_no_rain = new Array();
  reachable_stations = new Array();
  marked_stations_origin = new Array();
  marked_stations_destination = new Array();
  for (var k = 0; k < upper_limit_device_id; k++){
    good_stations_no_rain.push([]);
    reachable_stations.push([]);
  }
  for (var i = 0; i < size; i++){
    var tmp = weather_array[i].weather;
    var condition = tmp[0].main;
    var check = rain_conditions.includes(condition);
    if (check == false){
      var s = edges[i].origin;
      var d = edges[i].destination;
      good_stations_no_rain[s - 1].push((i + 1).toString());
      reachable_stations[d - 1].push((i + 1).toString());
      marked_stations_origin[s - 1] = true;
      marked_stations_destination[d - 1] = true;
    }
  }
  StageFour_Fix_Result(t, res);
}


function StageTwo_Prepare_Data_Arrays(t, res, flag){
  if (flag == 0){
    station_info = new Array(upper_limit_device_id);
    var device_array = rawData[0];
    const total_devices = device_array.length;
    num_stations = total_devices;
    for (var i = 0; i < total_devices; i++){
      var name = device_array[i].device_Name;
      var id = Number(device_array[i].device_id);
      var lat = device_array[i].lat;
      var lon = device_array[i].lon;
      var coords = "(" + lat + "," + lon + ")";
      var station = {name: name, coords: coords};
      station_info[id - 1] = station;
    }
    //console.log(station_info);
    StageTwo_Prepare_Data_Arrays(t, res, 1);
  }
  else{
    for (var j = 0; j < upper_limit_device_id; j++){
      neighborhood.push([]);
    }
    var paths_array = rawData[1];
    const total_paths = paths_array.length;
    num_paths = total_paths;
    edges = new Array(num_paths);
    for (var k = 0; k < total_paths; k++){
      var s = Number(paths_array[k].Path_origin_device_id);
      var d = Number(paths_array[k].Path_destination_device_id);
      var c = paths_array[k].Path_id;
      var geitonas = {id: c, neighbor: d};
      neighborhood[s - 1].push(geitonas);
      edges[k] = {origin: s, destination: d};
    }
    //console.log(edges);
    StageThree_no_rain_stations_and_paths(t, res);
  }
}


function StageOne_Read_Files(file_name, t, res, flag){
  const readFile = util.promisify(fs.readFile);
  function getStuff() {
    return readFile(file_name, 'utf8');
  }
  getStuff().then(data => {
    let j = JSON.parse(data)
    //console.log(data);
    rawData.push(j);
    if (flag == 0){
      var fn = "../Dataset/Paths.txt";
      StageOne_Read_Files(fn, t, res, 1);
    }
    else if (flag == 1){
      var fn = "../Dataset/Weather.txt";
      StageOne_Read_Files(fn, t, res, 2);
    }
    else{
      StageTwo_Prepare_Data_Arrays(t, res, 0);
    }
  })
}


function StageOne_Prepare_data_after_http_requests(t, res){
  rawData = new Array(3);
  rawData[0] = rawData_helper[0];
  rawData[1] = rawData_helper[1];
  rawData[2] = new Array();
  for (var i = 2; i < total_http_req; i++){
    var tmp = rawData_helper[i];
    rawData[2].push(tmp);
  }
  //res.send(rawData[2]);
  StageTwo_Prepare_Data_Arrays(t, res, 0);
}


function StageOne_Http_Request(url_array, t, res, flag){
  var url = url_array[flag];
  console.log(url);
  http.get(url, resp => {
    let data = "";
    resp.on('data', chunk => {
      data += chunk;
    });
    resp.on('end', () => {
      let str = JSON.parse(data);
      //console.log(rawData);
      rawData_helper.push(str);
      if (flag == total_http_req-1){
        console.log("All weather requests are done.");
        StageOne_Prepare_data_after_http_requests(t, res);
      }
      else{
        var new_flag = flag + 1;
        StageOne_Http_Request(url_array, t, res, new_flag);
      }
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
}


function DataByFileSystem(t, res){
  var file_name = "../Dataset/Devices.txt";
  StageOne_Read_Files(file_name, t, res, 0);
}


function DataByWebService(t, res){
  var ip = "147.102.16.156";
  var port = "1880";
  var pathing = "/getCurrentTemperatureStartingPoint/";
  var url_for_req = new Array(total_http_req);
  url_for_req[0] = "http://feed.opendata.imet.gr:23577/itravel/devices.json";
  url_for_req[1] = "http://feed.opendata.imet.gr:23577/itravel/paths.json";
  for (var i = 2; i < total_http_req; i++){
    url_for_req[i] = "http://" + ip + ":" + port + pathing + (i-1).toString();
  }
  StageOne_Http_Request(url_for_req, t, res, 0);
  //res.send("Not implemented yet! (query for weather conditions - web service)");
}


function DatasetUnspecifiedError(res){
  var error_msg = "Dataset Unspecified: Information can be accesed via local files or web service."
  res.send(error_msg);
}


function WeatherConditions(t, w, res){
  rawData_helper = new Array();
  rawData = new Array();
  results = new Array();
  station_info = new Array();
  neighborhood = new Array();
  edges = new Array();
  good_stations_no_rain = new Array();
  reachable_stations = new Array();

  if (w == "local"){
    DataByFileSystem(t, res);
  }
  else if (w == "web"){
    DataByWebService(t, res);
  }
  else{
    DatasetUnspecifiedError(res);
  }
}

module.exports = WeatherConditions
