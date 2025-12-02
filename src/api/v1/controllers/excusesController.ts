import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as excusesService from "../services/excusesService";
import type { Excuses } from "../models/excusesModel";
import { successResponse } from "../models/responseModel";
import { excuses } from "../../../data/excuses";

/**
 * Retrieves all excuses
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getAllExcuses = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const excuses: Excuses[] = await excusesService.getAllExcuses();
    res.status(HTTP_STATUS.OK).json(
      successResponse(excuses, "excuses retrieved successfully")
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Creates a new Excuse
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const createExcuse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        
        const { message } = req.body;
        const excuseData = { message };

        const newExcuse: Excuses = await excusesService.createEmployee(excuseData);
        res.status(HTTP_STATUS.CREATED).json(
          successResponse(newExcuse, "Excuse created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single excuse by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getExcuseById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    
    const excuses: Excuses = await excusesService.getExcuseById(id);
    res.status(HTTP_STATUS.OK).json(
      successResponse(excuses, "Excuses retrieved successfully")
    );
  } catch(error) {
    next(error);
  }
}

/**
 * Updates an existing excuse
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const updateExcuse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const  id  = (req.params.id);
    
    const { message } = req.body;

    const updateData= { id, message };
    
    const updatedExcuse: Excuses = await excusesService.updateExcuse(id, updateData)
    res.status(HTTP_STATUS.OK).json(
      successResponse(updatedExcuse, "Employee updated successfully")
    );
  } catch(error){
    next(error);
  }
};

/**
 * Deletes an excuse
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const deleteExcuse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id  = req.params.id;

    await excusesService.deleteExcuse(id);
    res.status(HTTP_STATUS.OK).json(
      successResponse (null, "Excuse deleted successfully"));
  } catch(error){
    next(error);
  }
};