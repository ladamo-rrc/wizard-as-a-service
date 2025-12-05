import request from "supertest";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import excusesRoutes from "../src/api/v1/routes/excusesRoutes";
import * as controller from "../src/api/v1/controllers/excusesController";

// Mock the entire controller
jest.mock("../src/api/v1/controllers/excusesController", () => ({
    createExcuse: jest.fn((_req, res) => res.status(201).send()),
    getAllExcuses: jest.fn((_req, res) => res.status(200).send()),
    getExcuseById: jest.fn((_req, res) => res.status(200).send()),
    updateExcuse: jest.fn((_req, res) => res.status(200).send()),
    deleteExcuse: jest.fn((_req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () =>
    jest.fn((_req: Request, _res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize", () =>
    jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/validate", () => ({
    validateRequest: jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next())
}));

const app = express();
app.use(express.json());
app.use("/api/v1/excuses", excusesRoutes);

describe("Excuses Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /api/v1/resource", () => {
		it("should call getAll controller", async () => {
			await request(app).get("/api/v1/excuses");
			expect(controller.getAllExcuses).toHaveBeenCalled();
		});
	});

	describe("POST /api/v1/resource", () => {
		it("should call create controller", async () => {
			await request(app).post("/api/v1/excuses").send({
				/* mock data */
			});
			expect(controller.createExcuse).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/resource/:id", () => {
		it("should call update controller", async () => {
			await request(app).put("/api/v1/excuses/1").send({
				/* mock data */
			});
			expect(controller.updateExcuse).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/resource/:id", () => {
		it("should call delete controller", async () => {
			await request(app).delete("/api/v1/excuses/1");
			expect(controller.deleteExcuse).toHaveBeenCalled();
		});
	});
});
