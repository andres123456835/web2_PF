const express = require("express")
const router = express.Router()
const customHeader = require("../middleware/customHeader")
const { validatorCreateItem, validatorGetItem,validatorBorradoGetItem } = require("../validators/comercios")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/comercios")
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
router.get("/:cif", authMiddleware, validatorGetItem, getItem)

/**
 * Crea un nuevo item
 */
router.post("/", authMiddleware, checkRol(["user", "admin"]), validatorCreateItem, createItem)
//router.post("/", validatorCreateItem, customHeader, createItem) // Podemos añadir tantos middleware como queramos

/**
 * Actualiza un item
 */
router.put("/:cif", authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

/**
 * Elimina un registro
 */
router.delete("/:cif/:tipo", authMiddleware, validatorBorradoGetItem, deleteItem)

module.exports = router