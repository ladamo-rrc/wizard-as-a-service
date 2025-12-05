import * as propheciesService from "../src/api/v1/services/propheciesService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepositories";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepositories");

    it('should get all prophecies', async () => {
      // Arrange
      const mockProphecyData = [
        { 
            id: "prophecy1",
            message: "this is a prophecy ooooOOOooo",
            type: "neutral",            
        },

        { 
            id: "prophecy2",
            message: "this is a prophecy waaaaoooooooowwwww!!",
            type: "positive",            
        },
    ];

        const mockSnapshot = {
            docs: mockProphecyData.map((prophecy) =>({
                data: () => ({
                    message: prophecy.message,
                    type: prophecy.type,
            }),
                id: prophecy.id
            })),
            size: mockProphecyData.length
        };
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result = await propheciesService.getAllProphecies();

        //Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalled();
        expect(result).toEqual(mockProphecyData);
        expect(result).toHaveLength(mockProphecyData.length)
    });

     it("should create a prophecy successfully", async () => {
        // Arrange
        const mockProphecyData = {
            id: "prophecy1",
            message: "this is a prophecy ooooOOOooo",
            type: "positive",
        } as const

        const mockDocumentId = "prophecy1";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

         // Act
        const result = await propheciesService.createProphecy(mockProphecyData)
        

        //Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "prophecies",
            mockProphecyData,
            mockProphecyData.id
        );

        expect(result).toEqual(mockProphecyData);

        });

        // it("should update a prophecy successfully", async () => {
        // // Arrange
        // const mockProphecyData = {
        //     id: "prophecy1",
        //     message: "this is a prophecy ooooOOOooo",
        //     type: "neutral",
        // };

        // const mockDocumentId = "prophecy1";

        // (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
        //     mockDocumentId
        // );

        //  // Act
        // const result = await propheciesService.createProphecy(mockProphecyData)
        

        // //Assert
        // expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
        //     "prophecies",
        //     mockProphecyData,
        //     mockProphecyData.id
        // );

        // expect(result).toEqual(mockProphecyData);

        // });



