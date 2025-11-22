import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import * as wizardController from "../controllers/wizardsController";
import { wizardSchema } from "../validation/wizardSchema";


const router: Router = express.Router();

router.get("/", wizardController.getAllWizards);

router.get(
    "/:id",
    validateRequest(wizardSchema.getById),
    wizardController.getWizardById
);