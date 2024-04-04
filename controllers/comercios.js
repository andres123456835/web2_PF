const { comerciosModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const user = req.user //Obtengo trazabilidad del usuario, puedo ver qué solicita, su rol, etc.
        var data
        //(process.env.ENGINE_DB === "nosql") ? data = await tracksModel.find() : data = await tracksModel.findAll()
        data = await comerciosModel.findAllData() // findAllData(): custom static function
        res.send({data, user})
    }catch(err){
        console.log(err) //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        handleHttpError(res, 'ERROR_GET_ITEMS') //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {cif} = matchedData(req) //Me quedo solo con el id
        //const data = await tracksModel.findById(id)
        const data = await comerciosModel.find({cif: cif });
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Inserta un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        //const { body } = req
        //const data = await tracksModel.create(body)
        //res.send(data)

        //express-validator nos provee de la función matchedData
        //const body = req.body //El dato según llega (si hay algún dato de más, nos daría error en el modelo)
        //const bodyClean = matchedData(req) //El dato filtrado por las especificaciones
        //res.send({ body, bodyClean })

        const body = matchedData(req) //Dato filtrado por la definición en el validador
        const data = await comerciosModel.create(body);
        res.send(data)    
    }catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

/**
 * Actualizar un resitro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {cif, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        //const data = await comerciosModel.findOneAndUpdate(id, body);
        const data = await comerciosModel.updateOne({ cif:  cif },body);
        res.send(data)    
    }catch(err){
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {cif,tipo} = matchedData(req)
        if(tipo == 1){//borrado fisico
            //const data = await tracksModel.deleteOne({_id:id}); // "deleteOne" realiza el borrado físico en la BD
            const data = await comerciosModel.deleteOne({cif:cif}); // "delete" realiza el borrado fisico
            res.send(data)    
        }else{//borrado logico

            const data = await comerciosModel.delete({cif:cif}); // "delete" realiza el borrado lógico
            res.send(data)    

            /*const dataComercio = await comerciosModel.find({cif: cif });

            const body = {
                name: dataComercio.name,
                cif:dataComercio.cif,
                direccion: dataComercio.direccion,
                email: dataComercio.email,
                telefono: dataComercio.telefono,
                idpagina: dataComercio.idpagina,
                deleted: true
            }

            const data = await comerciosModel.updateOne({ cif:  cif },body);
            res.send(data)  */  
        }
       
    }catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };