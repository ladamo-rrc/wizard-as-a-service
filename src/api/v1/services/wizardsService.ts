import type { Wizards } from "../models/wizardsModel";
import { wizardsArray } from "../../../data/wizards";

const wizards: Wizards[] = wizardsArray;

/**
 * Retrieves all wizards
 * @returns Array of all wizards
 */
export const getAllWizards = async (): Promise<Wizards[]> => {
  // Return a deep clone to avoid direct mutation
  return structuredClone(wizards);
};

/**
 * Retrieves items by ID
 * This example shows using Omit to exclude specific properties at the TYPE level
 * @param name - The name to search for
 * @returns Array of matching items without descriptions
 */
export const getWizardById = async (
  id: string
): Promise<Omit<Wizards, "description">[]> => {
  // Find items matching the name
  const matchingWizards:Wizards[] = wizards.filter((wizards: Wizards) =>
    wizards.id === id
  );

  // Important: Omit is only a type-level construct
  // We still need to manually remove the property at runtime
  return matchingWizards.map((item: Wizards) => {
    // Create a copy of the item without the description
    const {
      description,
      ...itemWithoutDescription
    }: {
      description?: string;
      [key: string]: any;
    } = item;

    return itemWithoutDescription as Omit<Wizards, "description">;
  });
  
};