import { Prophecy } from "../models/propheciesModel";
import { Wizards } from "../models/wizardsModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepositories"

const COLLECTION = "prophecies"

/**
 * Retrieves all items from Firestore
 * @returns Array of all items
 */

export const getAllProphecies = async (): Promise<Prophecy[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const prophecy: Prophecy[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Prophecy;
        });
        return prophecy;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single item by ID from Firestore
 * @param id - The ID of the item to retrieve
 * @returns The item if found
 * @throws Error if item not found
 */


export const getProphecyById = async (id: string): Promise<Prophecy> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        const Prophecy: Prophecy = {
            id: doc.id,
            ...data,
        } as Prophecy;

        return Prophecy;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new prophecy in Firestore
 * @param itemData - The data for the new item
 * @returns The created item with generated ID
 */

export const createProphecy = async (prophecyData: {
    id: string; 
    message: string;
    type: "positive" | "negative" | "neutral";
}): Promise<Prophecy> => {
    try {
        const newProphecyData: Prophecy = {
            id: prophecyData.id,
            message: prophecyData.message,
            type: prophecyData.type,
        };

        await createDocument<Prophecy>(COLLECTION, newProphecyData, prophecyData.id);

        return newProphecyData;
    } catch (error) {
        throw error;
    }
};
/**
 * Updates an existing Prophecy in Firestore
 * @param id - The ID of the item to update
 * @param itemData - The fields to update
 * @returns The updated item
 * @throws Error if item not found
 */

export const updateProphecy = async (
    id: string,
    itemData: Pick<Prophecy, "id" | "message" | "type">
): Promise<Prophecy> => {
    try {
        const updateData = {
            ...itemData,
            updatedAt: new Date(),
        };

        await updateDocument<Prophecy>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedItem = await getProphecyById(id);
        return updatedItem;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a prophecy from Firestore
 * @param id - The ID of the item to delete
 * @throws Error if item not found
 */

export const deleteProphecy = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Prophecy with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};


// Randomizataion Logic 

// gives a random number

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFortuneCookieNumbers(count: number = 6, min: number = 1, max: number = 99): number[] {
    const luckyNumbers: number[] = [];

    for (let i = 0; i < count; i++) {
        luckyNumbers.push(getRandomInt(min, max));
    }

    return luckyNumbers;
}

// Random prohpecy with wizard function
// https://firebase.google.com/docs/firestore/query-data/get-data
export const getProphecyFromWizard = async () => {
    try {
        const getAllWizardsFromDB = await getDocuments("wizards");
        
        if (getAllWizardsFromDB.empty) {
            throw new Error ("All the wizards seem to be on break right now. Please try again later.")
        }
        const getAllPropheciesFromDB = await getDocuments("prophecies");

        if (getAllPropheciesFromDB.empty) {
            throw new Error ("The crystal ball is all out of magic. Please try again later.")
        }
        // convert firebase docs into a js object

        const wizards: Wizards[] = getAllWizardsFromDB.docs.map(doc => ({
            id: doc.id,
            ...doc.data() 
        })) as Wizards[];

        const prophecies: Prophecy[] = getAllPropheciesFromDB.docs.map(doc => ({
            id: doc.id, 
            ...doc.data()
        })) as Prophecy[];

        //randomize the wizard
        const getRandomWizard = getRandomInt(0, wizards.length - 1 );
        const randomWizard = wizards[getRandomWizard];

        //randomize the prophecy
        const getRandomProphecy = getRandomInt(0, prophecies.length -1);
        const randomProphecy = prophecies[getRandomProphecy];

        let prophecyReading: string[];

        let luckyNumbers: number[] | undefined = undefined;

        if(randomProphecy.type === "positive"){
            prophecyReading = randomWizard.positiveResponses; 
        } else if (randomProphecy.type === "negative") {
            prophecyReading = randomWizard.negativeResponses;
        } else {
            prophecyReading = [];
        }

        if(randomProphecy.type === "fortune-cookie") {
            luckyNumbers = generateFortuneCookieNumbers();
        }

        const responseArrayLength = prophecyReading.length;
        // randomize the wizard response 
        const randomResponseIndex = getRandomInt(0, responseArrayLength - 1);
        const wizardResponse = prophecyReading[randomResponseIndex];

        return {
            wizard: randomWizard.name,
            prophecy: randomProphecy.message,
            response: wizardResponse,
            luckyNumbers,
        }

    } catch (error) {
        throw error;
    }
} 

