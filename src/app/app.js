const express = require('express');
const router =  require('../router/producto.router.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Api express server');
});

app.use(express.json());
app.use("/api/v1", router);

module.exports = app;