const express = require('express');
const router = express.Router();
const { crearCarrito } = require('../controller/carrito.contoller.js');

// Ruta para crear un nuevo carrito
router.get('/carritos', crearCarrito)


module.exports = router;