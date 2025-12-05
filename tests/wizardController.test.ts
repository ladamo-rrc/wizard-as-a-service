import { Request, Response, NextFunction } from 'express';
import * as wizardController from '../src/api/v1/controllers/wizardsController';
import * as wizardsService from '../src/api/v1/services/wizardsService';
import { HTTP_STATUS } from '../src/constants/httpConstants';

// Mock the service module
jest.mock('../src/api/v1/services/wizardsService');
jest.mock('../src/api/v1/repositories/firestoreRepositories', () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));


describe('Wizard Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });


  describe('getAllWizards', () => {
    it('should handle successful operation', async () => {
      // Arrange
      const mockWizards = [
        { 
            id: "wizard 1",
            name: "big boss braum",
            domain: "super domain",
            description: "big boss braum is a big boss",
            positiveResponses: [
                "thats cool",
                "great",
            ],
            negativeResponse: [
                'zoinks scoob',
                'yeowch',
            ],
            imageURL: "all in due time"
        },

        { 
            id: "wizard 2",
            name: "big boss brian",
            domain: "big brain",
            description: "big boss brain is a big brain boy ",
            positiveResponses: [
                "thats sick",
                "wicked sick",
            ],
            negativeResponse: [
                'oopsies',
                '... oh no...',
            ],
            imageURL: "all in due time"
        },
    ];
    
      (wizardsService.getAllWizards as jest.Mock).mockResolvedValue(mockWizards);

      // Act
      await wizardController.getAllWizards(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(wizardsService.getAllWizards).toHaveBeenCalledWith();
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
            message: "wizards retrieved successfully",
            status: "success",
            data: mockWizards
        });
    });

    it('should handle errors', async () => {
      // Arrange
      const mockError = new Error('Test error');
      (wizardsService.getAllWizards as jest.Mock).mockRejectedValue(mockError);

      // Act
      await wizardController.getAllWizards(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);

        });
    });
});