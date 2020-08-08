const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = {};

const port = 8765;

//require('./routes')(app, db);
require('./routes')(app, db);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
