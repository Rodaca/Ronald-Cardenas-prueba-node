const express = require('express');
const router = express.Router();
const { listartienda_usario } = require('../controller/tienda_usario.controller.js');

// Ruta para listar tienda y carrito
router.get('/tiendas_usuarios/:id_tienda/:id_user', listartienda_usario)


module.exports = router;