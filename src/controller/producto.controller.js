const Producto = require('../model/producto.model.js');

async function crearProducto(req, res) {
    try {
        const data = req.body;
        await Producto.sync();

        // Verificar si ya existe un producto con el mismo código de barras
        const existingBarcode = await Producto.findOne({
            where: {
                barcode: data.barcode
            }
        });
        if (existingBarcode) {
            return res.status(400).json({
                message: 'Ya existe un producto con el mismo barcode.'
            });
        }
        // Validar longitud del nombre
        if (data.nombre.length > 60) {
            return res.status(400).json({
                message: 'El nombre del producto no puede exceder los 60 caracteres.'
            });
        }
        // Validar longitud de la presentación
        if (data.presentacion.length > 25) {
            return res.status(400).json({
                message: 'La presentación del producto no puede exceder los 25 caracteres.'
            });
        }
        // Crear el producto
        const createProducto = await Producto.create({
            estado: data.estado,
            kit: data.kit,
            barcode: data.barcode,
            nombre: data.nombre,
            presentacion: data.presentacion,
            descripcion: data.descripcion,
            foto: data.foto,
            peso: data.peso
        });
        res.status(201).json({
            message: 'Producto creado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el producto'
        });
    }
}

module.exports = { crearProducto };