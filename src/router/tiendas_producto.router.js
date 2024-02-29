const express = require('express');
const router = express.Router();
const { crearTiendas_producto } = require('../controller/tiendas_producto.controller.js');

// Ruta para crear un nuevo producto en la tienda
router.post('/tiendas_productos', crearTiendas_producto)


module.exports = router;