import { Prophecy } from "../models/propheciesModel";
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
    type: string;
}): Promise<Prophecy> => {
    try {
        const newProphecyData = {
            ...prophecyData,
        };

        const id = await createDocument<Prophecy>(COLLECTION, newProphecyData, prophecyData.id);

        return { ...newProphecyData, id } as Prophecy;
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
