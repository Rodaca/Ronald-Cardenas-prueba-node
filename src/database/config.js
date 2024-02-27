const { configDotenv } = require("dotenv");
const { Sequelize } = require("sequelize");

// Cargar las variables de entorno desde el archivo .env
configDotenv();

// Crear una nueva instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USUARIO,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        port: process.env.PORTDB
    }
);

// Manejar errores durante la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = sequelize;
