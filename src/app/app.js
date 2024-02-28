const express = require('express');
const morgan = require('morgan');
const productoRouter = require('../router/producto.router.js');
const tiendas_productoRouter = require('../router/tiendas_producto.router.js');
const tiendasRouter = require('../router/tienda.router.js');
const carritoRouter = require('../router/carrito.router.js');

const app = express();

// Middleware de registro de solicitudes (morgan)
app.use(morgan('dev'));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API Express Server');
});

// Middleware para el manejo de solicitudes JSON
app.use(express.json());

// Rutas de la API
app.use("/api/v1", productoRouter);
app.use("/api/v1", tiendas_productoRouter);
app.use("/api/v1", tiendasRouter);
app.use("/api/v1", carritoRouter);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
