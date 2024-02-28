const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js")


// Definir el modelo Promocion
class Promocion extends Model {}

// Definir los atributos y configuraciones del modelo
Promocion = sequelize.define('Promocion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    porcentaje: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    dias_semana: {
        type: DataTypes.STRING(21),
        allowNull: false,
        defaultValue: '[0,0,0,0,0,0,0]'
    }
},
{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'Promocion', // Nombre del modelo en singular
    tableName: 'promociones', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = Promocion;