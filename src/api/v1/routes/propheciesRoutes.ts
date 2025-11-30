import express from "express";
import * as propheciesController from "../controllers/propheciesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { prophecySchema } from "../validation/prophecySchema";


const router: express.Router = express.Router();

/**
 * @openapi
 * /prophecies
 * get:
 *  summary: update a prophecy
 *  tags[prophecy]
 *  security:
 *      bearerAuth: []
 *  requestBody:
 *      required: true
 *      content:
 *          application/json:
 *          schema:
 *              type: object
 *              required:
 *                  - message
 *                  - type
 *              properties:
 *                  message:
 *                      type: string
 *                      example: "Something amazing will happen to you today"
 *                  type:
 *                      type: string
 *                      enum: [positive, negative, neutral]
 *                      example: "positive",
 *  responses: 
 *      '201'
 *      description: prophecy created succesffuly
 *      content:
 *          application/json:
 *           schema:
 *              $ef: #/components/validation/prophecy
 *      '400'
 *          description: 
 *      '401'
 *          description:
 *      '403'
 *          description:
 *                      
 */

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    validateRequest(prophecySchema.create),
    propheciesController.createProphecy
);


router.get("/", authenticate,
    isAuthorized({ hasRole: ["officer", "manager"] }),
    propheciesController.getAllProphecies
);


// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["officer", "manager"] }),
    validateRequest(prophecySchema.getById),
    propheciesController.getProphecyByID
);


// update 
router.put("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(prophecySchema.update),
    propheciesController.updateProphecy
);


router.delete("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(prophecySchema.delete),
    propheciesController.deleteProphecy
);


export default router;