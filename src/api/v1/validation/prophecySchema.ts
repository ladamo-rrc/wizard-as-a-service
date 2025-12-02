import Joi from "joi";

// Post operation schemas organized by request part
export const prophecySchema = {
    // POST /propheies - Create new post
    create: {
        body: Joi.object({
            message: Joi.string().required().messages({
                "any.required": "message is required",
                "string.empty": "message cannot be empty",
            }),
            type: Joi.string().valid("positive", "negative", "neutral").required().messages({
                "any.required": "type is required",
                "string.empty": "message cannot be empty",
            }),
        }),
    },

    // GET /employees/:id - Get single employee
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },

    // PUT /prophecies/:id - Update prophecy
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "prophecy ID is required",
                "string.empty": "prophecy ID cannot be empty",
            }),
        }),

        // need to be .optional instead of .required because 
        // if you're updating an employee you don't need to input everything
        // i.e just updating name, or department
        
        body: Joi.object({
            id: Joi.string().optional().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            }),
            message: Joi.string().required().messages({
                "any.required": "message is required",
                "string.empty": "message cannot be empty",
            }),
            type: Joi.string().valid("positive", "negative", "neutral").optional().messages({
                "any.required": "type is required",
                "string.empty": "type cannot be empty",
            }),
        }),
    },

    // DELETE /employees/:id - Delete employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },
};

