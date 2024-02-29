const express = require('express');
const { crearPedido } = require('../controller/pedido.controller.js');
const router = express.Router();
crearPedido

// Ruta para crear un nuevo pedido
router.post('/pedidos/:id_tienda/:id_user', crearPedido)


module.exports = router;