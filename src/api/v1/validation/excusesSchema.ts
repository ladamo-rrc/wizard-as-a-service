import Joi from "joi";

// Post operation schemas organized by request part
export const excusesSchema = {
    // POST /excuses - Create new post
    create: {
        body: Joi.object({
            message: Joi.string().required().messages({
                "any.required": "Message is required",
                "string.empty": "Message cannot be empty",
            }),
        }),
    },

     // GET /excuses/:id - Get single excuse
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "excuse ID is required",
                "string.empty": "excuse ID cannot be empty",
            }),
        }),
    },

     // PUT /employees/:id - Update employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Excuse ID is required",
                "string.empty": "Excuse ID cannot be empty",
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

            message: Joi.string().optional().messages({
                "string.empty": "messagecannot be empty",
                
            }),

        }),
        
    },
      // DELETE /employees/:id - Delete employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Excuse ID is required",
                "string.empty": "Excuse ID cannot be empty",
            }),
        }),
    },

}