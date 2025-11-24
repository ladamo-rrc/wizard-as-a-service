import express from "express";
import * as excusesController from "../controllers/excusesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { excusesSchema } from "../validation/excusesSchema";


const router: express.Router = express.Router();

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    validateRequest(excusesSchema.create),
    excusesController.createExcuse
);

router.get("/", authenticate,
    isAuthorized({ hasRole: ["officer", "manager"] }),
    excusesController.getAllExcuses
);

// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["officer", "manager"] }),
    validateRequest(excusesSchema.getById),
    excusesController.getExcuseById
);

// update 
router.put("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(excusesSchema.update),
    excusesController.updateExcuse
);

router.delete("/:id", authenticate,
    isAuthorized({hasRole: ["manager"] }),
    validateRequest(excusesSchema.delete),
    excusesController.deleteExcuse
);


export default router;