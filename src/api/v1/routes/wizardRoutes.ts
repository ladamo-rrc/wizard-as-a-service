import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import * as wizardController from "../controllers/wizardsController";
import { wizardSchema } from "../validation/wizardSchema";


const router: Router = express.Router();

/**
 * @openapi
 * /wizards:
 *   get:
 *     summary: Retrieve all wizards
 *     tags: [wizards]
 *     security:
 *       - bearerAuth: ["admin", "user"]
 *     responses:
 *       '200':
 *         description: Successfully retrieved wizards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/wizards'
 */

router.get("/", authenticate,
    isAuthorized({ hasRole: ["admin", "user"] }),
    wizardController.getAllWizards
);

/**
 * @openapi
 * /wizards/{id}:
 *   get:
 *     summary: Retrieve a wizard by its ID
 *     tags: [wizards]
 *     security:
 *       - bearerAuth: ["admin"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The wizard ID
 *     responses:
 *       '200':
 *         description: wizard retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/wizard'
 */
// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["admin", "officer", "manager"] }),
    validateRequest(wizardSchema.getById),
    wizardController.getWizardById
);

export default router;