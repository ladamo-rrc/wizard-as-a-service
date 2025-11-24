import * as employeeService from "../src/api/v1/services/wizardsService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepositories";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepositories");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all wizards', async () => {
      // Arrange
      const mockWizardData = [
        { 
            id: "wizard 1",
            name: "big boss braum",
            domain: "super domain",
            description: "big boss braum is a big boss",
            positiveResponse: [
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
            positiveResponse: [
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

        const mockSnapshot = {
            docs: mockWizardData.map((wizard) =>({
                data: () => ({
                    name: wizard.name,
                    domain: wizard.domain,
                    description: wizard.description,
                    positiveResponse: wizard.positiveResponse,
                    negativeResponse: wizard.negativeResponse,
                    imageURL: wizard.imageURL,
            }),
                id: wizard.id
            })),
            size: mockWizardData.length
        };
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result = await employeeService.getAllWizards();

        //Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalled();
        expect(result).toEqual(mockWizardData);
        expect(result).toHaveLength(mockWizardData.length)
    });

});