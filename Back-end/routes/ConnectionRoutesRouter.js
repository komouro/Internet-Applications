const ConnectionRoutes = require('./../controllers/ConnectionRoutesController.js');

module.exports = function(app, db){
  app.get('/Mouro/api/ConnectionRoutes/:coord_x_A/:coord_y_A/:coord_x_B/:coord_y_B/:counter/:web', (req, res) => {
    const x1 = req.params.coord_x_A;
    const y1 = req.params.coord_y_A;
    const x2 = req.params.coord_x_B;
    const y2 = req.params.coord_y_B;
    const c = req.params.counter;
    const w = req.params.web;

    ConnectionRoutes(x1, y1, x2, y2, c, w, res);
  });
};
