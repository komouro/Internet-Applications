const WeatherConditions = require('./../controllers/WeatherConditionsController.js');


module.exports = function(app, db){
  app.get('/Mouro/api/WeatherConditions/:stationtype/:web', (req, res) => {
    const t = req.params.stationtype;
    const w = req.params.web;

    WeatherConditions(t, w, res);
  });
};
