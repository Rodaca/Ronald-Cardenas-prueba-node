const express = require('express');
const router = express.Router();
const { listartienda } = require('../controller/tienda.contoller.js');

// Ruta para listar tienda
router.get('/tiendas/:id', listartienda)


module.exports = router;