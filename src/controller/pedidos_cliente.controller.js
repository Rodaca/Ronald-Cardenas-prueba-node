const Carrito = require("../model/carrito.model");
const Pedido = require("../model/pedido.model");
const PedidoEstado = require("../model/pedidos_estado.model");
const Tienda = require("../model/tienda.model");


Tienda.hasMany(Pedido, { foreignKey: 'id_tienda' });
Pedido.belongsTo(Tienda, { foreignKey: 'id_tienda' });

Pedido.hasMany(PedidoEstado, { foreignKey: 'id_pedido' });
PedidoEstado.belongsTo(Pedido, { foreignKey: 'id_pedido' });

Tienda.hasMany(Carrito, { foreignKey: 'id_tienda' });
Carrito.belongsTo(Tienda, { foreignKey: 'id_tienda' });

async function listarPedidoCliente(req, res) {
    const id_user = req.params.id;

    try {
        const pedidos = await Pedido.findAll({
            where: {id_user: id_user},
            include:[{model:PedidoEstado},
                {model:Tienda ,include:{model:Carrito,where:{id_user:id_user}}}]
        })


// Estructura para guardar los datos agrupados por tienda.
const tiendas = {};

// Define una función para obtener los datos de la consulta
async function obtenerDatosProducto(idTienda) {
    const consulta = await fetch(`http://localhost:9001/api/tiendas/${idTienda}`);
    const datos = await consulta.json();
    
    return datos.data;
    
}

// Utiliza un bucle for...of para manejar las promesas correctamente
for (const pedido of pedidos) {
    const idTienda = pedido.id_tienda;

    // Si la tienda aún no está en el objeto, la inicializamos.
    if (!tiendas[idTienda]) {
        
        tiendas[idTienda] = {
            id_tienda: idTienda,
            nombre:pedido.Tienda.nombre, 
            valor_pedido: 0,
            cantidad: 0,
            pedidos: []
        };
    }

    // Obtén los datos de la tienda de la consulta
    datosProductos = await obtenerDatosProducto(idTienda);

    // Preparamos la lista de productos para el pedido actual
    const productos = pedido.Tienda.Carritos.map(carrito => {
        // Busca el producto correspondiente en datosProductos por su id_producto
        const productoEncontrado = datosProductos[carrito.id_producto];
    
        if (productoEncontrado) {
            const { nombre, valor, promociones } = productoEncontrado;
            const valor_promocion = promociones.length > 0 ? promociones[0].valor_promocion : valor;
            const valor_total = parseFloat(valor_promocion) * parseFloat(carrito.cantidad);
    
            return {
                id_producto: carrito.id_producto,
                cantidad: carrito.cantidad,
                nombre: nombre,
                valor: valor,
                valor_promocion: valor_promocion,
                valor_total: valor_total
            };
        } else {
            // Si el producto no se encuentra en los datos proporcionados
            return {
                id_producto: carrito.id_producto,
                cantidad: carrito.cantidad,
                nombre: 'Producto no encontrado',
                valor: '0.00',
                valor_promocion: '0.00',
                valor_total: 0
            };
        }
    });
    

    // Agregamos el pedido a la tienda correspondiente.
    // Obtener el estado del pedido
const estadoPedido = pedido.PedidoEstados.length > 0 ? pedido.PedidoEstados[0].estado : null;

// Verificar si el estado del pedido es 1, 2 o 3
if (estadoPedido === 1 || estadoPedido === 2 || estadoPedido === 3) {
    // Agregar el pedido solo si el estado es 1, 2 o 3
    tiendas[idTienda].pedidos.push({
        id: pedido.id,
        fecha: pedido.entrega_fecha,
        estado: estadoPedido,
        valor_final: pedido.valor_final,
        productos: productos
    });
}



    // Actualizamos el contador y el valor del pedido.
    tiendas[idTienda].cantidad += 1;
    tiendas[idTienda].valor_pedido += parseFloat(pedido.valor_final);
}

// Convertimos el objeto tiendas a un array para poder manejarlo o enviarlo como respuesta.
const respuesta = Object.values(tiendas);

        
        res.status(200).json({
            "message": "Consultado correctamente",
            "data":respuesta

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al mostrar los datos de la tienda'
        });
    }
}

module.exports = { listarPedidoCliente };