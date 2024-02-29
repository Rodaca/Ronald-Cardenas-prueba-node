const Carrito = require('../model/carrito.model.js');
const Producto = require('../model/producto.model.js');
const Tienda = require('../model/tienda.model.js');
const User = require('../model/user.model.js');


async function crearCarrito(req, res) {
    try {
        const data = req.body;
        await Carrito.sync();

        // Verificar si ya existe un producto con el id_producto
        const existingProducto = await Producto.findOne({
            where: {
                id: data.id_producto
            }
        });
        if (!existingProducto) {
            return res.status(400).json({
                message: 'No existe el producto'
            });
        }
        // Verificar si ya existe la tienda con el id_tienda
        const existingTienda = await Tienda.findOne({
            where: {
                id: data.id_tienda
            }
        });
        if (!existingTienda) {
            return res.status(400).json({
                message: 'No existe la tienda'
            });
        }
        // Verificar si ya existe el usuario con el id_user
        const existingUser = await User.findOne({
            where: {
                id: data.id_user
            }
        });
        if (!existingUser) {
            return res.status(400).json({
                message: 'No existe el usuario'
            });
        }
        // Crear el carrito
        const createCarrito = await Carrito.create({
            cantidad:data.cantidad,
            valor:data.valor,
            id_producto:data.id_producto,
            id_tienda:data.id_tienda,
            id_user:data.id_user
        });
        res.status(201).json({
            message: 'carrito creado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el carrito'
        });
    }
}

module.exports = { crearCarrito };