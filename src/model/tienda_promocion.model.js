const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js");
const Tienda = require("./tienda.model.js");
const Promocion = require("./promocion.model.js");


// Definir el modelo TiendaPromocion 
class TiendaPromocion  extends Model {}

// Definir los atributos y configuraciones del modelo
TiendaPromocion  = sequelize.define('TiendaPromocion ', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        }
    },
    id_promocion: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: Promocion,
            key: 'id'
        }
    }
},
{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'TiendaPromocion ', // Nombre del modelo en singular
    tableName: 'tiendas_promociones', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = TiendaPromocion ;