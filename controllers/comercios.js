const { comerciosModel } = require('../models')
const { webpagesModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
const { registerCtrlMerchant } = require("./auth")
const { registerPagina } = require("./webpages")
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
        data = await comerciosModel.findAll() // findAllData(): custom static function
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
        const data = await comerciosModel.findOne({where: { cif: cif }})
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
        const data = await comerciosModel.update(body, {where: { cif: cif }});
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
            const data = await comerciosModel.destroy({where: { cif: cif }}); // "delete" realiza el borrado fisico
            if(data === 1){
                res.status(200).json({message:"Deleted successfully"});
            }else{
                res.status(404).json({message:"record not found"});
            }   
        }else{//borrado logico

            const data = await comerciosModel.destroy({where: { cif: cif }}); // "delete" realiza el borrado lógico
            if(data === 1){
                res.status(200).json({message:"Deleted successfully"});
            }else{
                res.status(404).json({message:"record not found"});
            }
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

/**
 * Obtener un detalle
 * @param {} req
 * @param {*} res
*/

const registerMerchants = async (req, res) => {
    try{
        req = matchedData(req);
        const dataMerchant = await comerciosModel.create(req);
        
        const reqUser = {
            name: req.nombre,
            age:-1,
            email: req.email,
            password: "123456" + req.nombre,
            role: "merchant"
        }
        
        const resUser = res;
        
        await registerCtrlMerchant(reqUser, resUser);
        
        const pagina = {
            idMerchant: dataMerchant.id,
            ciudad:"",
            actividad: "",
            titulo: "",
            resumen: ""
        }

        let varObj = {
            id: 1
        }

        await registerPagina(pagina, varObj);

        console.log(pagina);
        
        const data = {
            idpagina : varObj.id,
            merchant: dataMerchant
        }

        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_MERCHANT");
    }
}

const updateMerchants = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await comerciosModel.update(body, {where: { id: id }});
        
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_MERCHANT');
    }
}

const deleteMerchants = async (req, res) => {
    try{
        const {id} = matchedData(req);
        var data = "";
        
        data = await comerciosModel.destroy({where: { id: id }});

        data = await webpagesModel.destroy({where: { idMerchant: id }});
        
        if(data === 1){
            res.status(200).json({message:"Deleted successfully"});
        }else{
            res.status(404).json({message:"record not found"});
        }
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_MERCHANT');
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem ,registerMerchants,updateMerchants,deleteMerchants};