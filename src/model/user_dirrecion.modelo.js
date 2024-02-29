const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");
const User = require("./user.model.js");


// Definir el modelo UserDireccion 
class UserDireccion extends Model {}

// Definir los atributos y configuraciones del modelo
UserDireccion = sequelize.define('UserDireccion', {
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    distancia: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'UserDireccion', // Nombre del modelo en singular
    tableName: 'users_direcciones', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = UserDireccion;