const http = require('http');
const https = require('https');
const fs = require('fs');
const util = require('util');


var rawData;
var results;



function StageThree_Return_Result(res){
  //console.log(results);
  res.send(results);
}


function StageTwo_Find_Nearest_Stations(num, coord_x, coord_y, res){
  var tmp = new Array();
  var devices_array = rawData[0];
  var total_devices = devices_array.length;
  var n = Number(num);
  var x = Number(coord_x);
  var y = Number(coord_y);
  //console.log(rawData);
  //console.log(rawData.length);
  //console.log(rawData[0].length);
  //console.log(rawData[1].length);
  //console.log(n);
  //console.log(x);
  //console.log(y);
  var EarthRadius = 6371;
  var pi = Math.PI;
  var dist = new Array();
  for (var i = 0; i < total_devices; i++) {
    var h1 = Number(devices_array[i].lat);
    var h2 = Number(devices_array[i].lon);
    var a = x - h1;
    var b = y - h2;
    var dist_a = (a*pi*EarthRadius)/180;
    var dist_b = (b*pi*EarthRadius)/180;
    var c = Math.pow(dist_a, 2) + Math.pow(dist_b, 2);
    c = Math.sqrt(c);
    var g = {pos: i.toString(), dist: c.toString()};
    dist.push(g);
  }
  dist.sort(function(a, b) {
    var keyA = new Number(a.dist);
    var keyB = new Number(b.dist);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  const upper_limit = Math.min(dist.length, n);
  for (var j = 0; j < upper_limit; j++){
    var k = dist[j].pos;
    var id = devices_array[k].device_id;
    var name = devices_array[k].device_Name;
    var lan = devices_array[k].lat;
    var lon = devices_array[k].lon;
    var g = {"Station id": id, "Station name": name, "Station lat": lan, "Station lon": lon};
    tmp[j] = g;
  }
  results = tmp;
  StageThree_Return_Result(res);
  //console.log(results)
}


function StageOne_Read_Files(file_name, n, x, y, res){
  const readFile = util.promisify(fs.readFile);

  function getStuff() {
    return readFile(file_name, 'utf8');
  }

  getStuff().then(data => {
    let j = JSON.parse(data)
    //console.log(data);
    rawData.push(j);
    StageTwo_Find_Nearest_Stations(n, x, y, res);
  })
}


function StageOne_Http_Request(url, n, x, y, res){
  http.get(url, resp => {
    let data = "";
    resp.on('data', chunk => {
      data += chunk;
    });
    resp.on('end', () => {
      let str = JSON.parse(data);
      rawData.push(str);
      //console.log(rawData);
      StageTwo_Find_Nearest_Stations(n, x, y, res);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
}


function DataByFileSystem(n, x, y, res){
  var file_name = "../Dataset/Devices.txt";
  StageOne_Read_Files(file_name, n, x, y, res);
}


function DataByWebService(n, x, y, res){
  var url = "http://feed.opendata.imet.gr:23577/itravel/devices.json";
  StageOne_Http_Request(url, n, x, y, res);
}


function DatasetUnspecifiedError(res){
  var error_msg = "Dataset Unspecified: Information can be accesed via local files or web service."
  res.send(error_msg);
}


function NearestStations(x, y, n, w, res){
  rawData = new Array();
  results = new Array();

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (w == "local"){
    DataByFileSystem(n, x, y, res);
  }
  else if (w == "web"){
    DataByWebService(n, x, y, res);
  }
  else{
    DatasetUnspecifiedError(res);
  }
}

module.exports = NearestStations
