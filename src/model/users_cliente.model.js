const { Model,DataTypes } = require("sequelize")
const sequelize= require("../database/config.js");
const User = require("./user.model.js");
const UserDireccion = require("./user_dirrecion.modelo.js");


// Definir el modelo UserCliente
class UserCliente extends Model {}

// Definir los atributos y configuraciones del modelo
UserCliente = sequelize.define('UserCliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      nombre: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      genero: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      identificacion: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      id_direccion: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
        references: {
            model: UserDireccion,
            key: 'id'
        }
      },
      id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
      }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'UserCliente', // Nombre del modelo en singular
    tableName: 'users_clientes', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = UserCliente;