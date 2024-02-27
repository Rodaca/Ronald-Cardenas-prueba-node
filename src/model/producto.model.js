const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js")


// Definir el modelo Producto
class Producto extends Model {}

// Definir los atributos y configuraciones del modelo
Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    estado: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1 
    },
    kit: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0 
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    presentacion: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    peso: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: 0.00
    }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'Producto', // Nombre del modelo en singular
    tableName: 'productos', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = Producto;