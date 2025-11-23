import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as propheciesService from "../services/propheciesService";
import type { Prophecy } from "../models/propheciesModel";
import { successResponse } from "../models/responseModel";
import { prophecies } from "../../../data/prophecies";

/**
 * Retrieves all prophecies
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getAllProphecies = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prophecies: Prophecy[] = await propheciesService.getAllProphecies();
    res.status(HTTP_STATUS.OK).json(
          successResponse(prophecies, "Prophecies retrieved successfully")
        );
  } catch (error) {
    next(error);
  }
}

/**
 * Creates a new branch
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */


export const createProphecy = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        
        const { id, message, type,} = req.body;
        const prophecyData = { id, message, type };

        const newProphecy: Prophecy = await propheciesService.createProphecy(prophecyData);
        res.status(HTTP_STATUS.CREATED).json(
          successResponse(newProphecy, "Prophecy created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single branch by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const getProphecyByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
      const id = (req.params.id);
    
    const prophecy: Prophecy = await propheciesService.getProphecyById(id);
    res.status(HTTP_STATUS.OK).json(
      successResponse(prophecy, "Prophecy retrieved successfully")
    );
  } catch(error) {
    next(error);
  }
}

/**
 * Updates a existing branch
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const updateProphecy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
        const { id, message, type } = req.body;
        const updateData =  { id, message, type };

        const updatedProphecy: Prophecy = await propheciesService.updateProphecy(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedProphecy, "Prophecy updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const deleteProphecy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params

    await propheciesService.deleteProphecy(id);
    res.status(HTTP_STATUS.OK).json(
      successResponse(null, "Prophecy deleted successfully")
    );
  } catch(error){
    next(error);
  }
};