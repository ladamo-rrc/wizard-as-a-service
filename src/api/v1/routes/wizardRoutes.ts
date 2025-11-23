import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import * as wizardController from "../controllers/wizardsController";
import { wizardSchema } from "../validation/wizardSchema";


const router: Router = express.Router();

router.get("/", authenticate,
    isAuthorized({ hasRole: ["officer", "manager"] }),
    wizardController.getAllWizards
);

// get by id
router.get("/:id", authenticate,
    isAuthorized({hasRole: ["officer", "manager"] }),
    validateRequest(wizardSchema.getById),
    wizardController.getWizardById
);