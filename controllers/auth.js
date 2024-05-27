const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel} = require("../models")

/**
 * Encargado de registrar un nuevo usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}


/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({where: {  email: req.email  }});
        
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const updateUser = async (req, res) => {
    try {
        //const id = req.params.id 
        //const {body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        const {id, password,...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        //body.rol = "admin"
        const password2 = await encrypt(password)
        body.password = password2
        const data = await usersModel.update(body, {where: { id: id }});
        res.send(data)    
    }catch(err){
        console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = matchedData(req)
        var data = ""
        if (process.env.ENGINE_DB === 'nosql') {
            data = await usersModel.deleteOne({_id:id})
        }else {
            data = await usersModel.destroy({ where: { id: id } })
        }
        if(data === 1){
            res.status(200).json({message:"Deleted successfully"});
        }else{
            res.status(404).json({message:"record not found"});
        } 
    } catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}

const getUsers = async (req, res) => {
    try {
        var data = ""
        if (process.env.ENGINE_DB === 'nosql') {
          data = await usersModel.find({}) 
        }else {
          data = await usersModell.findAll()
        }
        res.send(data)
    } catch (err) {
        console.log(err) //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        handleHttpError(res, 'ERROR_GET_USERS') //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}

const registerCtrlMerchant = async (req, res) => {
    try{  
        const password = await encrypt(req.password);
        const body = {...req, password}; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body);
      
        const data = {
            token: await tokenSign(dataUser)
        }
        req  = {...req, data}; 

        //res.send(data);
        
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

module.exports = { registerCtrl, loginCtrl, updateUser, getUsers, deleteUser,registerCtrlMerchant }