import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as wizardService from "../services/wizardsService";
import type { Wizards } from "../models/wizardsModel";

export const getAllWizards = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees: Wizards[] = await wizardService.getAllWizards();
    res.status(HTTP_STATUS.OK).json({
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
}

export const getWizardById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
      const id  = req.params.id;
      if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "please enter a valid ID"
      });
      return;
    }
    // getting request and extracting Id, then putting it into service so it can run 
    const wizards = await wizardService.getWizardById(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Employee retrieved by ID successfully",
      data: wizards,
    });
  } catch(error) {
    next(error);
  }
}