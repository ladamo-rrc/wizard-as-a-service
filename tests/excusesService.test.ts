import * as excusesService from "../src/api/v1/services/excusesService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepositories";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepositories");


describe('Excuses Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all excuses", async () => {
    
    const mockExcuseData = [
      {
        id: 1,
        message: "i have consulted with the elder council and they not permit my leave (mom said no)",
      },
      {
        id: 2,
        message: "i am currently astral projecting (taking a nap)"
      }
    ];

    const mockSnapshot = {
      docs: mockExcuseData.map((excuse) => ({
        data: () =>({
          message: excuse.message,
        }),
        id: excuse.id,
      })),
      size: mockExcuseData.length,
    };

    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

    //act
    const result = await excusesService.getAllExcuses();

    //assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalled();
    expect(result).toEqual(mockExcuseData);
    expect(result).toHaveLength(mockExcuseData.length)

    });
});

