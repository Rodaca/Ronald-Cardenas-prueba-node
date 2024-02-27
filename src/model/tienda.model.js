const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js")


// Definir el modelo Tienda
class Tienda extends Model {}

// Definir los atributos y configuraciones del modelo
Tienda = sequelize.define('Tienda', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    estado: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    direccion_anexo: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    direccion_barrio: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    calificacion: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    calificacion_cantidad: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    impuestos: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    dias_trabajados: {
        type: DataTypes.STRING(21),
        allowNull: false,
        defaultValue: '[1,1,1,1,1,1,0]'
    }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'Tienda', // Nombre del modelo en singular
    tableName: 'tiendas', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = Tienda;