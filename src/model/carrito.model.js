const { Model, DataTypes } = require("sequelize")
const sequelize = require("../database/config.js");
const User = require("./user.model.js");
const Tienda = require("./tienda.model.js");
const Producto = require("./producto.model.js");


// Definir el modelo Carrito
class Carrito extends Model { }

// Definir los atributos y configuraciones del modelo
Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.DECIMAL(9, 3),
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        },
    },
    id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
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
    modelName: 'Carrito', // Nombre del modelo en singular
    tableName: 'carritos', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = Carrito;