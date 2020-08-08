const HealthCheckRoute = require('./HealthCheckRouter.js');
const NearestStationsRoute = require('./NearestStationsRouter.js');
const ConnectionRoutesRoute = require('./ConnectionRoutesRouter.js');
const WeatherConditionsRoute = require('./WeatherConditionsRouter.js');

module.exports = function(app, db){
  HealthCheckRoute(app, db);
  NearestStationsRoute(app, db);
  ConnectionRoutesRoute(app, db);
  WeatherConditionsRoute(app, db);
}
