import { Excuses } from "../models/excusesModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepositories"

import {
    QuerySnapshot,
    DocumentData,
} from "firebase-admin/firestore";

const COLLECTION = "excuses";

/**
 * Retrieves all items from Firestore
 * @returns Array of all items
 */

export const getAllExcuses = async (): Promise<Excuses[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const items: Excuses[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Excuses;
        });
        return items;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new item in Firestore
 * @param itemData - The data for the new item
 * @returns The created item with generated ID
 */

export const createEmployee = async (excusesData: {
    message: string,
}): Promise<Excuses> => {
    try {
        const now = new Date();
        const newExcuseData = {
            ...excusesData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Excuses>(COLLECTION, newExcuseData);
        return { id, ...newExcuseData } as Excuses;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing item in Firestore
 * @param id - The ID of the item to update
 * @param itemData - The fields to update
 * @returns The updated item
 * @throws Error if item not found
 */

export const updateExcuse = async (
    id: string,
    itemData: Pick<Excuses, "message">
): Promise<Excuses> => {
    try {
        const updateData = {
            ...itemData,
            updatedAt: new Date(),
        };

        await updateDocument<Excuses>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedItem = await getExcuseById(id);
        return updatedItem;
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


export const getExcuseById = async (id: string): Promise<Excuses> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Excuse with ID ${id} not found`);
        }

        const data = doc.data();
        const Excuse: Excuses = {
            id: doc.id,
            ...data,
        } as Excuses;

        return Excuse;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an item from Firestore
 * @param id - The ID of the item to delete
 * @throws Error if item not found
 */

export const deleteExcuse = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Excuse with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};

// Randomizataion Logic 

// gives a random number
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random excuse

export const conjureRandomExcuse = async () => {
    try {
        const getAllExcusesFromDB = await getDocuments("excuses");

        if (getAllExcusesFromDB.empty) {
            throw new Error ("There are no excuses left. Time to face the music!")
        }

        const excuse: Excuses[] = getAllExcusesFromDB.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Excuses[];

        const getRandomExcuse = getRandomInt(0, excuse.length - 1 );
        const randomExcuse = excuse[getRandomExcuse];
    

        return {
            excuse: randomExcuse.message,
        }

    } catch (error) {
        throw error;
    }
} 