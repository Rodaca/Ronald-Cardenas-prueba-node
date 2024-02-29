const Tienda = require('../model/tienda.model.js');
const Producto = require('../model/producto.model.js');
const Promocion = require('../model/promocion.model.js');
const TiendaPromocion = require('../model/tienda_promocion.model.js');
const TiendaProducto = require('../model/tiendas_producto.model.js');

// Nombres descriptivos para las asociaciones
Tienda.belongsToMany(Producto, { through: 'TiendaProducto', foreignKey: 'id_tienda' });
Producto.belongsToMany(Tienda, { through: 'TiendaProducto', foreignKey: 'id_producto' });
Tienda.belongsToMany(Promocion, { through: 'TiendaPromocion', foreignKey: 'id_tienda' });
Promocion.belongsToMany(Tienda, { through: 'TiendaPromocion', foreignKey: 'id_promocion' });

// Función para filtrar las promociones activas
function esPromocionActiva(promo) {
    return promo.estado === 1 && hoy >= promo.inicio && hoy <= promo.fin;
}
const hoy = new Date();
async function listartienda(req, res) {
    const id = req.params.id;
    
   try {
        const tienda = await Tienda.findByPk(id, {
            include: [
                {
                    model: Producto,
                    through: { model: TiendaProducto } // Asociación a través de la tabla intermedia TiendaProducto
                },
                {
                    model: Promocion,
                    through: { model: TiendaPromocion } // Asociación a través de la tabla intermedia TiendaPromocion
                }
            ]
        });
        //Destructuracion de la consulta
        const { id: id_tienda, Productos, Promocions } = tienda
        //Mapeo de las promociones de la tabla
        const promociones = Promocions.map(({ id, nombre, porcentaje, TiendaPromocion }) => ({
            id_promocion: id,
            nombre,
            porcentaje,
            estado: TiendaPromocion.estado,
            inicio: new Date(TiendaPromocion.inicio),
            fin: new Date(TiendaPromocion.fin)
        }));
        //Llamada de la funcion que revisa que esten activas
        const promocion = promociones.filter(esPromocionActiva)
        //Mapeo de los productos de la tabla
        const productosInfo = Productos.map(({ id, nombre, presentacion, barcode,TiendaProducto }) => ({
            id_tienda,
            id_producto: id,
            nombre,
            presentacion,
            barcode,
            valor:TiendaProducto.valor,
            promociones: promocion.map(({ id_promocion, nombre, porcentaje }) => ({
                id_promocion,
                nombre,
                porcentaje,
                valor_promocion:TiendaProducto.valor*porcentaje/100 // Sacar el porcentaje del valor 
            }))
        }));

        res.status(200).json({
            "message": "Consultado correctamente",
            "data": productosInfo

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al mostrar los datos de la tienda'
        });
    }
}

module.exports = { listartienda };