const Pedido = require('../model/pedido.model.js');
const PedidoEstado = require('../model/pedidos_estado.model.js');
const PedidoProducto = require('../model/pedidos_producto.model.js');
const Tienda = require('../model/tienda.model.js');
const TiendaDistancia = require('../model/tiendas_distancia.model.js');
const User = require('../model/user.model.js');
const UserDireccion = require('../model/user_dirrecion.modelo.js');
const UserCliente = require('../model/users_cliente.model.js');


UserDireccion.hasMany(UserCliente, { foreignKey: 'id_direccion' });
UserCliente.belongsTo(UserDireccion, { foreignKey: 'id_direccion' });

//verificar si si la distancia dada esta en el rango
function obtenerValor(rango, distancia) {
    let valorEncontrado = null;
    // Recorremos el arreglo de rango
    for (let i = 0; i < rango.length; i++) {
        const tramo = rango[i];
        // Verificamos si la distancia dada está dentro del tramo
        if (distancia >= tramo.desde &&
            (tramo.hasta === null || distancia <= tramo.hasta)) {
            valorEncontrado = tramo.valor;
            break;
        }
    }
    return valorEncontrado;
}

async function crearPedido(req, res) {
    try {
        // Obtener datos de la solicitud
        const { id_tienda, id_user } = req.params;
        const data = req.body;

        // Consultar productos del usuario
        const consulta = await fetch(`http://localhost:9001/api/carrito/${id_tienda}/${id_user}`);
        let consultaData = [];
        let sumaValores = 0;

        let sumaValoresDescuento = 0;
    
        if (consulta.ok) {
            let consultaJson
            consultaJson = await consulta.json();
            consultaData = consultaJson.data;
            sumaValores = consultaData.reduce((acumulador, producto) => acumulador + producto.valor_total, 0);
        }
        consultaData.forEach(producto => {
            let valorTotalProducto = producto.valor_total; // Obtener el valor total del producto

            // Verificar si hay promociones aplicadas
            if (producto.promociones && producto.promociones.length > 0) {
                // Calcular el descuento basado en el porcentaje de la promoción
                const promocion = producto.promociones[0]; // Suponiendo que solo hay una promoción aplicada
                const descuento = (promocion.porcentaje / 100) * valorTotalProducto;
                valorTotalProducto -= descuento; // Restar el descuento al valor total del producto
            }
            sumaValoresDescuento += valorTotalProducto; // Sumar el valor total del producto a la suma total
        });

        //Encotrar la distancia y direccion
        const user = await UserCliente.findOne({ where: { id_user: id_user }, include: UserDireccion })
        const direccionUsuario = user.UserDireccion.direccion
        const distancia = user.UserDireccion.distancia
        //Encotrar el valor por envio
        const tienda_distancias = await TiendaDistancia.findAll({ where: { id_tienda: id_tienda } })
        const valorEncontrado = obtenerValor(tienda_distancias, distancia);

        // Crear el pedido
        const createPedido = await Pedido.create({
            instrucciones: data.instrucciones,
            entrega_fecha: data.entrega_fecha,
            valor_productos: sumaValores,
            valor_descuento: sumaValores - sumaValoresDescuento,
            valor_envio: valorEncontrado,
            valor_cupon: data.valor_cupon,
            impuestos: data.impuestos,
            valor_impuestos: data.valor_impuestos,
            valor_final: sumaValores + valorEncontrado - (sumaValores - sumaValoresDescuento),
            calificacion: data.calificacion,
            direcion: direccionUsuario,
            id_tienda: id_tienda,
            valor_comision: data.valor_comision,
            id_user: id_user
        });
        // Crear el estado del pedido
        const createPedidoEstado = await PedidoEstado.create({
            estado:1,
            id_pedido: createPedido.id
        });

        consultaData.forEach(async producto => {
            const valorUnitario = parseFloat(producto.valor);
            const cantidadProducto = parseFloat(producto.cantidad)
            const valorUnitarioPromocion = producto.promociones.length > 0 ? parseFloat(producto.promociones[0].valor_promocion) : valorUnitario;
            const totalTeorico = valorUnitario * parseFloat(producto.cantidad);
            const totalFinal = valorUnitarioPromocion * parseFloat(producto.cantidad);
            const idPromocion = producto.promociones.length > 0 ? producto.promociones[0].id_promocion : null;
            const idProducto = producto.id_producto
            // Crear el pedido del producto
            const crearPedidoProducto = await PedidoProducto.create({
                cantidad:cantidadProducto,
                valor_unitario:valorUnitario,
                valor_unitario_promocion:valorUnitarioPromocion,
                total_teorico:totalTeorico,
                total_final:totalFinal,
                id_promocion:idPromocion,
                id_producto:idProducto,
                id_pedido:createPedido.id,
            })
        })
        
        


        res.status(201).json({
            message: "Pedido,pedido estado y pedido producto creado"
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el pedido'
        });
    }
}

module.exports = { crearPedido };


