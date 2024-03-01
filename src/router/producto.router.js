const express = require('express');
const router = express.Router();
const { crearProducto } = require('../controller/producto.controller.js');

// Ruta para crear un nuevo producto
router.post('/crear/productos', crearProducto)


module.exports = router;