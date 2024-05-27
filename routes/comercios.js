const express = require("express")
const router = express.Router()
const customHeader = require("../middleware/customHeader")
const { validatorGetItem, validatorRegisterMerchants, validatorUpdateMerchants,validatorDeleteItem } = require("../validators/comercios");
const { getItems, getItem, createItem, updateItem, deleteItem,registerMerchants,updateMerchants,deleteMerchants } = require("../controllers/comercios")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")

//TODO http://localhost:3000/tracks GET, POST, DELETE, PUT

//El nombre del fichero se llama igual que la ruta, entonces
/**
 * Lista los items
 */
router.get("/", authMiddleware, getItems)

/**
 * Obtiene detelle de un item (por id)
 */
//router.get("/:cif", authMiddleware, validatorGetItem, getItem)

/**
 * Crea un nuevo item
 */
//router.post("/", authMiddleware, checkRol(["user", "admin"]), validatorCreateItem, createItem)
//router.post("/", validatorCreateItem, customHeader, createItem) // Podemos añadir tantos middleware como queramos

/**
 * Actualiza un item
 */
//router.put("/:cif", authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

/**
 * Elimina un registro
 */
//router.delete("/:cif/:tipo", authMiddleware, validatorBorradoGetItem, deleteItem)

router.post("/", authMiddleware, checkRol(["admin"]), validatorRegisterMerchants, registerMerchants)

router.put("/:id", authMiddleware, checkRol(["admin"]), validatorUpdateMerchants, updateMerchants)

router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorDeleteItem, deleteMerchants)

module.exports = router