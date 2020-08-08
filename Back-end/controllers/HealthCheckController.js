function HealthCheck(res){
  healthy_msg = [{"HealthCheck result": "Server is working properly."}];
  //return healthy_msg;
  res.send(healthy_msg);
}

module.exports = HealthCheck
