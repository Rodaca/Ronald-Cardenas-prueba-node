const Tienda = require('../model/tienda.model.js');
const Producto = require('../model/producto.model.js');
const Promocion = require('../model/promocion.model.js');
const TiendaPromocion = require('../model/tienda_promocion.model.js');
const TiendaProducto = require('../model/tiendas_producto.model.js');
const Carrito = require('../model/carrito.model.js');
const User = require('../model/user.model.js');

// Nombres descriptivos para las asociaciones
Tienda.belongsToMany(Producto, { through: 'TiendaProducto', foreignKey: 'id_tienda' });
Producto.belongsToMany(Tienda, { through: 'TiendaProducto', foreignKey: 'id_producto' });

Tienda.belongsToMany(Promocion, { through: 'TiendaPromocion', foreignKey: 'id_tienda' });
Promocion.belongsToMany(Tienda, { through: 'TiendaPromocion', foreignKey: 'id_promocion' });

Producto.hasMany(Carrito, { foreignKey: 'id_producto' });
Carrito.belongsTo(Producto, { foreignKey: 'id_producto' });

User.hasMany(Carrito, { foreignKey: 'id_user' });
Carrito.belongsTo(User, { foreignKey: 'id_user' });

// Función para filtrar las promociones activas
function esPromocionActiva(promo) {
    return promo.estado === 1 && hoy >= promo.inicio && hoy <= promo.fin;
}
const hoy = new Date();
async function listartienda_usario(req, res) {
    const id_tiendas = req.params.id_tienda;
    const id_user = req.params.id_user;
    
   try {
        let carritosDelProducto;
        const tienda = await Tienda.findByPk(id_tiendas, {
            include: [
                {
                    model: Producto,
                    through: { model: TiendaProducto }, // Asociación a través de la tabla intermedia TiendaProducto
                    include: {model: Carrito,
                        include: {model:User,where: {id:id_user}}
                    }
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
        const productosInfo = Productos.map(({ id, nombre, presentacion, barcode, TiendaProducto, Carritos }) => {
            // Inicializamos la cantidad del carrito como null
            let cantidadCarrito = null;
        
            // Verificamos si hay algún carrito asociado al producto
            if (Carritos && Carritos.length > 0) {
                // Accedemos a la cantidad del carrito
                cantidadCarrito = Carritos[0].cantidad;
            }
            
            if (cantidadCarrito != null) {
                // Retornamos la información del producto con la cantidad del carrito
                return {
                    id_tienda,
                    id_producto: id,
                    nombre,
                    presentacion,
                    barcode,
                    valor: TiendaProducto.valor,
                    cantidad: cantidadCarrito,
                    valor_total: TiendaProducto.valor * cantidadCarrito,
                    promociones: promocion.map(({ id_promocion, nombre, porcentaje }) => ({
                        id_promocion,
                        nombre,
                        porcentaje,
                        valor_promocion: TiendaProducto.valor * porcentaje / 100
                    }))
                };
            }
            // Retornamos undefined cuando cantidad es null
        });
        
        // Filtramos los elementos undefined del resultado
        const productosInfoFiltrado = productosInfo.filter(producto => producto !== undefined);
        

        res.status(200).json({
            "message": "Consultado correctamente",
            "data":productosInfoFiltrado

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al mostrar los datos de la tienda'
        });
    }
}

module.exports = { listartienda_usario };