const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comercios = sequelize.define(
    "comercios",
    {
        name: {
            type: DataTypes.STRING
        },
        cif: {
            type: DataTypes.STRING
        },
        direccion: {
            type: DataTypes.STRING           
        },
        email: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        },
        idpagina: {
            type: DataTypes.BIGINT
        },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)


module.exports = Comercios; 