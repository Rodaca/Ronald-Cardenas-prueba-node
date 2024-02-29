const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");
const Tienda = require("./tienda.model.js");


// Definir el modelo TiendaDistancia
class TiendaDistancia extends Model {}

// Definir los atributos y configuraciones del modelo
TiendaDistancia = sequelize.define('TiendaDistancia', {
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        }
    },
    valor: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    desde: {
        type: DataTypes.SMALLINT,
        defaultValue: null
    },
    hasta: {
        type: DataTypes.SMALLINT,
        defaultValue: null,
    }
}, {
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'TiendaDistancia', // Nombre del modelo en singular
    tableName: 'tiendas_distancias', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = TiendaDistancia;