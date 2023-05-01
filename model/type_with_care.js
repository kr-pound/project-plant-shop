const Joi = require('joi');

const typeWithCareSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    category_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    preset_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    watering_period: Joi.number().integer().min(1).required(),
    document_name: Joi.string().min(3).max(50).required(),
    document: Joi.string().base64().custom((value, helpers) => {
        const buffer = Buffer.from(value, 'base64');
        if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
            return value; // Return value if it represents a PDF document
        }
        return helpers.error('any.invalid'); // Otherwise, return an error
    }, 'PDF document')
});

/**
 * Input Validation
 * @param {*} type_with_care
 * @returns { "value": "", "error": "" }
 */
function validateTypeWithCare(typeWithCare) {
    return typeWithCareSchema.validate(typeWithCare);
}

module.exports = {
    validateTypeWithCare,
    typeWithCareSchema
};
