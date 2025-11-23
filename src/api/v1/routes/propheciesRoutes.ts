import express from "express";
import * as propheciesController from "../controllers/propheciesController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { prophecySchema } from "../validation/prophecySchema";


const router: express.Router = express.Router();

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
    propheciesController.updateProphecy
);


export default router;