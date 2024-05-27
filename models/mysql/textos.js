const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Textos = sequelize.define(
    "textos",
    {
        idWebpage: {
            type: DataTypes.INTEGER
        },
        texto:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

module.exports = Textos;
