const express = require('express');
const { listarPedidoCliente } = require("../controller/pedidos_cliente.controller");
const router = express.Router();

// Ruta para listar los pedidos por cliente
router.get('/pedidos/:id', listarPedidoCliente)


module.exports = router;