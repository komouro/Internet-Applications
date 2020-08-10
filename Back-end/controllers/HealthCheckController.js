function HealthCheck(res){
  healthy_msg = [{"HealthCheck result": "Server is working properly."}];
  res.setHeader("Access-Control-Allow-Origin", "*");
  //console.log(healthy_msg);
  //console.log(res)
  res.send(healthy_msg);
}

module.exports = HealthCheck
