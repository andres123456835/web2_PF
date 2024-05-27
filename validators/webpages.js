const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetPagina = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorRegisterPagina = [
    check("ciudad").exists().notEmpty().isLength( {min:3, max: 99}),
    check("actividad").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("fotos").exists().notEmpty(),
    check("scoring").exists().isInt(),
    check("puntuaciones").exists().isInt(),
    check("reseñas").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorUpdatePagina = [
    check("idMerchant").exists().notEmpty(),
    check("ciudad").exists().notEmpty().isLength( {min:3, max: 99}),
    check("actividad").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("fotos").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("scoring").exists().isInt(),
    check("puntuaciones").exists().isInt(),
    check("reseñas").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGuardarFotoPagina = [
    check("idWebpage").exists().notEmpty(),
    check("foto").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGuardarTextoPagina = [
    check("idWebpage").exists().notEmpty(),
    check("texto").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetCity = [
    check("ciudad").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetActivity = [
    check("actividad").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorPatchPagina = [    
    check("scoring").exists().isInt(),
    check("reseñas").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorGetPagina, validatorRegisterPagina, validatorUpdatePagina, validatorGuardarFotoPagina, validatorGuardarTextoPagina, validatorGetCity, validatorGetActivity, validatorPatchPagina };
