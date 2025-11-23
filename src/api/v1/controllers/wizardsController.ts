import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as wizardService from "../services/wizardsService";
import type { Wizards } from "../models/wizardsModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all employees
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getAllWizards = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const wizards: Wizards[] = await wizardService.getAllWizards();
    res.status(HTTP_STATUS.OK).json(
      successResponse(wizards, "wizards retrieved successfully")
    );
  } catch (error) {
    next(error);
  }
}


/**
 * Retrieves a single wizard by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getWizardById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    
    const wizard: Wizards = await wizardService.getWizardById(id);
    res.status(HTTP_STATUS.OK).json(
      successResponse(wizard, "Wizard retrieved successfully")
    );
  } catch(error) {
    next(error);
  }
}
