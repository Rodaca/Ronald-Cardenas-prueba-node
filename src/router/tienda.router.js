const express = require('express');
const router = express.Router();
const { listartienda } = require('../controller/tienda.contoller.js');

// Ruta para crear un nuevo producto
router.get('/tiendas/:id', listartienda)


module.exports = router;