import type { Request, Response, NextFunction } from "express";

jest.mock("../src/api/v1/controllers/wizardsController", () => ({
    getAllWizards: jest.fn((_req, res) => res.status(200).send()),
    getWizardById: jest.fn((_req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () =>
    jest.fn((req: Request, res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize", () =>
    jest.fn(() => (req: Request, res: Response, next: NextFunction) => next())
);

import request from "supertest";
import app from "../src/app"; 
import * as controller from "../src/api/v1/controllers/wizardsController";

describe("Wizard Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

    /* TESTS
    * 1 test per route
    - get all wizards
    - get wizards by id
    */

     it("should have mocked functions", () => {
    expect(controller.getAllWizards).toBeDefined();
    expect(jest.isMockFunction(controller.getAllWizards)).toBe(true);
});

	describe("GET /api/v1/wizards", () => {
        it("should call getAllWizards controller", async () => {
            await request(app).get("/api/v1/wizards");
            expect(controller.getAllWizards).toHaveBeenCalled();
        });
    });

     describe("GET /api/v1/wizards/:id", () => {
        it("should call getWizardById controller", async () => {
            await request(app).get("/api/v1/wizards/wizard1");
            expect(controller.getWizardById).toHaveBeenCalled();
        });
	});
}); 

	