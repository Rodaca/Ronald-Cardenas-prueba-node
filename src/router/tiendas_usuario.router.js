const express = require('express');
const router = express.Router();
const { listartienda_usario } = require('../controller/tienda_usario.contoller');

// Ruta para listar tienda y carrito
router.get('/tiendas_productos/:id_tienda/:id_user', listartienda_usario)


module.exports = router;