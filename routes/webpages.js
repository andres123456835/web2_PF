const express = require("express");
const { getPaginas, getPaginasById, getPaginasCity, getPaginasCityAndActivity, registerPaginaCompleta, updatePagina, registerFotoPagina, registerTextoPagina, deletePagina, patchPagina } = require("../controllers/webpages")
const { validatorGetPagina, validatorRegisterPagina, validatorGetCity, validatorGetActivity, validatorUpdatePagina, validatorGuardarFotoPagina, validatorGuardarTextoPagina, validatorPatchPagina } = require("../validators/webpages");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

/**
 * @openapi
 * /api/webpages:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get of webpages in the System
 *      description: Get webpages from database
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
*/
router.get("/", getPaginas);

/**
 * @openapi
 * /api/webpages/{id}:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get of webpages in the System
 *      description: Get webpages by ID from database
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
*/
router.get("/:id", validatorGetPagina, getPaginasById);

/**
 * @openapi
 * /api/webpages/search/{ciudad}:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get of webpages in the System
 *      description: Get webpages by city from database
 *      parameters:
 *          -   name: ciudad
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
*/
router.get("/search/:ciudad", validatorGetCity, getPaginasCity);

/**
 * @openapi
 * /api/webpages/search/{ciudad}/{actividad}:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get of webpages in the System
 *      description: Get webpages by city and activity from database
 *      parameters:
 *          -   name: ciudad
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: actividad
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
*/
router.get("/search/:ciudad/:actividad", validatorGetCity, validatorGetActivity, getPaginasCityAndActivity);

/**
 * @openapi
 * /api/webpages:
 *  post:
 *      tags:
 *      - Webpages
 *      summary: Post of webpages in the System
 *      description: Register of a webpage
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.post("/", authMiddleware, checkRol(["merchant"]), validatorRegisterPagina, registerPaginaCompleta);

/**
 * @openapi
 * /api/webpages/{id}:
 *  put:
 *      tags:
 *      - Webpages
 *      summary: Put of webpages in the System
 *      description: Update of a webpage
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.put("/:id", authMiddleware,checkRol(["merchant"]), validatorGetPagina, validatorUpdatePagina, updatePagina);

/**
 * @openapi
 * /api/webpages/photos:
 *  post:
 *      tags:
 *      - Webpages
 *      summary: Post of webpages in the System
 *      description: Register of photos on a webpage
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.post("/photos", authMiddleware, checkRol(["merchant"]), validatorGuardarFotoPagina, registerFotoPagina);

/**
 * @openapi
 * /api/webpages/texts:
 *  post:
 *      tags:
 *      - Webpages
 *      summary: Post of webpages in the System
 *      description: Register of texts on a webpage
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.post("/texts", authMiddleware,checkRol(["merchant"]), validatorGuardarTextoPagina, registerTextoPagina);

/**
 * @openapi
 * /api/webpages/{id}:
 *  delete:
 *      tags:
 *      - Webpages
 *      summary: Delete of webpages in the System
 *      description: Delete webpages by ID from database
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.delete("/:id", authMiddleware,checkRol(["merchant"]), validatorGetPagina, deletePagina);

/**
 * @openapi
 * /api/webpages/{id}:
 *  patch:
 *      tags:
 *      - Webpages
 *      summary: Patch of webpages in the System
 *      description: Patch of a webpage
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.patch("/:id", authMiddleware, checkRol(["user"]), validatorGetPagina, validatorPatchPagina, patchPagina);

router.get("/city/:ciudad",authMiddleware, checkRol(["merchant"]), validatorGetCity, getPaginasCity);



module.exports = router;
