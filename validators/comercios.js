const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

var validatorCreateItem = [];

if (process.env.ENGINE_DB === "nosql") {
    validatorCreateItem = [
        check("name").exists().notEmpty(), //.isLength(min:5, max:90)
        check("cif").exists().notEmpty(),
        check("direccion").exists().notEmpty(),
        check("email").exists().notEmpty().isEmail(),
        check("telefono").exists().notEmpty(),
        check("idpagina").exists().notEmpty().isInt(),
        //Middleware tiene que responder después de la petición
        (req, res, next) => {
            return validateResults(req, res, next)
        }
        //(req, res, next) => validateResults(req, res, next) // Otra forma de invocarlo
    ]
} else {
    validatorCreateItem = [
        check("name").exists().notEmpty(), //.isLength(min:5, max:90)
        check("cif").exists().notEmpty(),
        check("direccion").exists().notEmpty(),
        check("email").exists().notEmpty(),
        check("telefono").exists().notEmpty(),
        check("idpagina").exists().notEmpty().isInt(),
        //Middleware tiene que responder después de la petición
        (req, res, next) => {
            return validateResults(req, res, next)
        }
    ]
}


const validatorGetItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorBorradoGetItem = [
    check("cif").exists().notEmpty(),
    check("tipo").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem, validatorBorradoGetItem }