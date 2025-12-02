import express from "express";
import * as excusesController from "../controllers/excusesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { excusesSchema } from "../validation/excusesSchema";


const router: express.Router = express.Router();

/**
 * @openapi
 * /excuses:
 *   post:
 *     summary: Create a new excuse
 *     tags: [Excuses]
 *     security:
 *       - bearerAuth: ["admin"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - type
 *             properties:
 *               excuse:
 *                 type: string
 *                 example: "can't talk right now, I'm out on a quest"
 *     responses:
 *       '201':
 *         description: excuse created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/excuse'
 *       '400':
 *         description: Invalid excuse data
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    validateRequest(excusesSchema.create),
    excusesController.createExcuse
);


/**
 * @openapi
 * /excuses:
 *   get:
 *     summary: Retrieve all excuses
 *     tags: [excuses]
 *     security:
 *       - bearerAuth: ["admin", "user"]
 *     responses:
 *       '200':
 *         description: Successfully retrieved excuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/excuses'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

router.get("/", authenticate,
    isAuthorized({ hasRole: ["admin", "user"] }),
    excusesController.getAllExcuses
);

/**
 * @openapi
 * /excuses/{id}:
 *   get:
 *     summary: Retrieve an excuse by its ID
 *     tags: [excuses]
 *     security:
 *       - bearerAuth: ["admin"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The excuse
 *     responses:
 *       '200':
 *         description: excuse retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/excuse'
 *       '400':
 *         description: Invalid ID
 */


// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["admin"] }),
    validateRequest(excusesSchema.getById),
    excusesController.getExcuseById
);

/**
 * @openapi
 * /excuses/{id}:
 *   put:
 *     summary: Update an existing excuse
 *     tags: [excuses]
 *     security:
 *       - bearerAuth: ["admin"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The excuse ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - excuse
 *             properties:
 *               excuse:
 *                 type: string
 *     responses:
 *       '200':
 *         description: excuse updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/excuse'
 *       '400':
 *         description: Invalid update data
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Prophecy not found
 */

// update 
router.put("/:id", authenticate,
    isAuthorized({hasRole: ["admin"] }),
    validateRequest(excusesSchema.update),
    excusesController.updateExcuse
);

/**
 * @openapi
 * /excuses/{id}:
 *   delete:
 *     summary: Delete an excuse
 *     tags: [excuse]
 *     security:
 *       - bearerAuth: ['admin']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The excuse ID
 *     responses:
 *       '200':
 *         description: excuse deleted successfully
 *       '400':
 *         description: Invalid ID
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Prophecy not found
 */


router.delete("/:id", authenticate,
    isAuthorized({hasRole: ["admin",] }),
    validateRequest(excusesSchema.delete),
    excusesController.deleteExcuse
);


export default router;