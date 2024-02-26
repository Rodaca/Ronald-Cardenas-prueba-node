const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js")



class Producto extends Model {}

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
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    presentacion: {
        type: DataTypes.STRING,
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
    sequelize,
    modelName: "Producto"
});

module.exports = Producto;