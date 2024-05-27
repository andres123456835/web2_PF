const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Webpages = sequelize.define(
    "webpages",
    {
        idMerchant: {
            type: DataTypes.INTEGER
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        actividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        resumen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        textos:{
            type: DataTypes.STRING
        },
        fotos:{
            type: DataTypes.STRING
        },
        scoring:{
            type: DataTypes.BIGINT
        },
        puntuaciones:{
            type: DataTypes.BIGINT
        },
        reseñas:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

module.exports = Webpages;
