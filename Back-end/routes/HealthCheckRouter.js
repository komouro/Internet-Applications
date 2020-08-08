const HealthCheck = require('./../controllers/HealthCheckController.js');

module.exports = function(app, db){
  app.get('/Mouro/api/HealthCheck', (req, res) => {
    HealthCheck(res);
  });
};
