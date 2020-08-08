const NearestStations = require('./../controllers/NearestStationsController');


module.exports = function(app, db){
  app.get('/Mouro/api/NearestStations/:coord_x/:coord_y/:num/:web', (req, res) => {
    const n = req.params.num;
    const x = req.params.coord_x;
    const y = req.params.coord_y;
    const w = req.params.web;

    NearestStations(x, y, n, w, res);
  });
};
