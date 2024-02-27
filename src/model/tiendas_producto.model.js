const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js");
const Tienda = require("./tienda.model.js");
const Producto = require("./producto.model.js");




// Definir el modelo tienda
class TiendaProducto extends Model {}

// Definir los atributos y configuraciones del modelo
TiendaProducto = sequelize.define('TiendaProducto', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    compra_maxima: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
        defaultValue: 1.0
    },
    valor: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
    },
    id_promocion: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id'
        }
    }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'TiendaProducto', // Nombre del modelo en singular
    tableName: 'tiendas_productos', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = TiendaProducto;