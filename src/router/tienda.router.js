const express = require('express');
const router = express.Router();
const { listartienda } = require('../controller/tienda.controller.js');

// Ruta para listar tienda
router.get('/catalogo/:id', listartienda)


module.exports = router;