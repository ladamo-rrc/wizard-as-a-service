import type { Wizards } from "../models/wizardsModel";
import { wizardsArray } from "../../../data/wizards";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValues,
} from "../repositories/firestoreRepositories";

import {
    QuerySnapshot,
    DocumentData,
} from "firebase-admin/firestore";


const COLLECTION = "Wizards";

/**
 * Retrieves all items from Firestore
 * @returns Array of all items
 */

export const getAllWizards = async (): Promise<Wizards[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const items: Wizards[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Wizards;
        });
        return items;
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
export const getWizardById = async (id: string): Promise<Wizards> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        const Employee: Wizards = {
            id: doc.id,
            ...data,
        } as Wizards;

        return Employee;
    } catch (error) {
        throw error;
    }
};