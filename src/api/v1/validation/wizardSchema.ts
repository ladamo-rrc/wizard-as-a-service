import Joi from "joi";

export const wizardSchema = {
    // Get /wizards/:id - get a single wizard
     getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Wizard ID is required",
                "string.empty": "Wizard ID cannot be empty",
            }),
        }),
    },
}