const { configDotenv } = require("dotenv");
const { Sequelize} = require("sequelize")

configDotenv();

const sequelize = new Sequelize(process.env.DATABASE,process.env.USUARIO,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORTDB
})

module.exports = sequelize