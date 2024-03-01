const express = require('express');
const { crearPedido } = require('../controller/pedido.controller.js');
const router = express.Router();

// Ruta para crear un nuevo pedido
router.post('/crear/pedidos/:id_tienda/:id_user', crearPedido)


module.exports = router;