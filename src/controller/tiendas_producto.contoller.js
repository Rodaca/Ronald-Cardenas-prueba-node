const Tiendas_producto = require('../model/tiendas_producto.model.js');
const Producto = require('../model/producto.model.js');
const Tienda = require('../model/tienda.model.js');


async function crearTiendas_producto(req, res) {
    try {
        const data = req.body;
        await Tiendas_producto.sync();

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
        // Crear el producto
        const createTiendas_producto = await Tiendas_producto.create({
            compra_maxima:data.compra_maxima,
            valor:data.valor,
            id_promocion:data.id_promocion,
            id_tienda:data.id_tienda,
            id_producto:data.id_producto
        });
        res.status(201).json({
            message: 'tiendas_producto creado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el tiendas_producto'
        });
    }
}

module.exports = { crearTiendas_producto };