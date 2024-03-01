const express = require('express');
const router = express.Router();
const { crearCarrito } = require('../controller/carrito.controller.js');

// Ruta para crear un nuevo carrito
router.post('/crear/carritos', crearCarrito)


module.exports = router;