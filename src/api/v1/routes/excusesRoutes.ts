import express from "express";
import * as excusesController from "../controllers/excusesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { excusesSchema } from "../validation/excusesSchema";


const router: express.Router = express.Router();

/**
 * @openapi
 * /endpoint-path: create
 *   http-method:
 *     summary: creates a new user 
 *     tags: [Category]
 *     parameters:
 *       - name: parameter-name
 *         in: query|path|header
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/createExcuse'
 *     responses:
 *       '200':
 *         description: Successfully created excuse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/ResponseSchema'
 */

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    validateRequest(excusesSchema.create),
    excusesController.createExcuse
);


/**
 * @openapi
 * /endpoint-path: get all
 *   http-method:
 *     summary: Gets all excuses
 *     tags: [Category]
 *     parameters:
 *       - name: parameter-name
 *         in: query|path|header
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/'
 *     responses:
 *       '200':
 *         description: Successfully retrieved excuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/ResponseSchema'
 */

router.get("/", authenticate,
    isAuthorized({ hasRole: ["officer", "manager"] }),
    excusesController.getAllExcuses
);

/**
 * @openapi
 * /endpoint-path: get by id
 *   http-method:
 *     summary: Get excuses by id
 *     tags: [Category]
 *     parameters:
 *       - name: parameter-name
 *         in: query|path|header
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/getById'
 *     responses:
 *       '200':
 *         description: Successfully retrieved excuse by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/ResponseSchema'
 */

// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["officer", "manager"] }),
    validateRequest(excusesSchema.getById),
    excusesController.getExcuseById
);

/**
 * @openapi
 * /endpoint-path: update
 *   http-method:
 *     summary: Updates an excuse
 *     tags: [Category]
 *     parameters:
 *       - name: parameter-name
 *         in: query|path|header
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/updateExcuse'
 *     responses:
 *       '200':
 *         description: Successfully updated excuse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/ResponseSchema'
 */

// update 
router.put("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(excusesSchema.update),
    excusesController.updateExcuse
);

/**
 * @openapi
 * /endpoint-path: delete
 *   http-method:
 *     summary: Deletes an excuse
 *     tags: [Category]
 *     parameters:
 *       - name: parameter-name
 *         in: query|path|header
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/deleteExcuse'
 *     responses:
 *       '200':
 *         description: Successfully deleted excuse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/ResponseSchema'
 */


router.delete("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(excusesSchema.delete),
    excusesController.deleteExcuse
);


export default router;