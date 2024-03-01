const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const productoRouter = require('../router/producto.router.js');
const tiendas_productoRouter = require('../router/tiendas_producto.router.js');
const tiendasRouter = require('../router/tienda.router.js');
const carritoRouter = require('../router/carrito.router.js');
const tiendas_usarioRouter = require('../router/tiendas_usuario.router.js');
const pedidoRouter = require('../router/pedido.router.js');
const pedidos_clienteRouter = require('../router/pedidos_cliente.router.js');


const app = express();

// Middleware de registro de solicitudes (morgan)
app.use(morgan('dev'));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API Express Server');
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para el manejo de solicitudes JSON
app.use(express.json());

// Rutas de la API
app.use("/api/", productoRouter);
app.use("/api/", tiendas_productoRouter);
app.use("/api/", tiendasRouter);
app.use("/api/", carritoRouter);
app.use("/api/", tiendas_usarioRouter);
app.use("/api/", pedidoRouter);
app.use("/api/", pedidos_clienteRouter);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
