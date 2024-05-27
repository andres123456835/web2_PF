const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Fotos = sequelize.define(
    "fotos",
    {
        idWebpage: {
            type: DataTypes.INTEGER
        },
        foto:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

module.exports = Fotos;
