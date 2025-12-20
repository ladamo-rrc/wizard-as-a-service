import express from "express";
import * as propheciesController from "../controllers/propheciesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { prophecySchema } from "../validation/prophecySchema";


const router: express.Router = express.Router();

/**
 * @openapi
 * /prophecies:
 *   post:
 *     summary: Create a new prophecy
 *     tags: [Prophecies]
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
 *               message:
 *                 type: string
 *                 example: "Something amazing will happen to you today"
 *               type:
 *                 type: string
 *                 enum: [positive, negative, neutral]
 *                 example: positive
 *     responses:
 *       '201':
 *         description: Prophecy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Prophecy'
 */

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    validateRequest(prophecySchema.create),
    propheciesController.createProphecy
);

/**
 * @openapi
 * /prophecies:
 *   get:
 *     summary: Retrieve all prophecies
 *     tags: [Prophecies]
 *     security:
 *       - bearerAuth: ["admin", "user"]
 *     responses:
 *       '200':
 *         description: Successfully retrieved prophecies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/Prophecy'
 */


router.get("/", authenticate,
    isAuthorized({ hasRole: ["admin", "user"] }),
    propheciesController.getAllProphecies
);

/**
 * @openapi
 * /prophecies/{id}:
 *   get:
 *     summary: Retrieve a prophecy by its ID
 *     tags: [Prophecies]
 *     security:
 *       - bearerAuth: ["admin"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The prophecy ID
 *     responses:
 *       '200':
 *         description: Prophecy retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Prophecy'
 */

// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["admin"] }),
    validateRequest(prophecySchema.getById),
    propheciesController.getProphecyByID
);

/**
 * @openapi
 * /prophecies/{id}:
 *   put:
 *     summary: Update an existing prophecy
 *     tags: [Prophecies]
 *     security:
 *       - bearerAuth: ["admin"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The prophecy ID
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
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [positive, negative, neutral]
 *     responses:
 *       '200':
 *         description: Prophecy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Prophecy'
 */

// update 
router.put("/:id", authenticate,
    isAuthorized({hasRole: ["admin"] }),
    validateRequest(prophecySchema.update),
    propheciesController.updateProphecy
);

/**
 * @openapi
 * /prophecies/{id}:
 *   delete:
 *     summary: Delete a prophecy
 *     tags: [Prophecies]
 *     security:
 *       - bearerAuth: ['admin']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The prophecy ID
 *     responses:
 *       '200':
 *         description: Prophecy deleted successfully
 */

router.delete("/:id", authenticate,
    isAuthorized({hasRole: ["admin"] }),
    validateRequest(prophecySchema.delete),
    propheciesController.deleteProphecy
);


export default router;