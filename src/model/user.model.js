const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js")


// Definir el modelo User
class User extends Model {}

// Definir los atributos y configuraciones del modelo
User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    tipo: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    login: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    telefono: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    codigo_temporal: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'User', // Nombre del modelo en singular
    tableName: 'users', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = User;