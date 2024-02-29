const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");
const Tienda = require("./tienda.model.js");
const User = require("./user.model.js");


// Definir el modelo Pedido
class Pedido extends Model {}

// Definir los atributos y configuraciones del modelo
Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    instrucciones: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    entrega_fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor_productos: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    valor_envio: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false
    },
    valor_descuento: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    valor_cupon: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        defaultValue: 0.000
    },
    impuestos: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    valor_impuestos: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        defaultValue: 0.000
    },
    valor_final: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    calificacion: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        }
    },
    direccion: {
        type: DataTypes.STRING(160),
        allowNull: true
    },
    valor_comision: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        defaultValue: 0.000
    },
    id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'Pedido', // Nombre del modelo en singular
    tableName: 'pedidos', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = Pedido;