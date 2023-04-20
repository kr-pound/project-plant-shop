const Joi = require('joi');

const typeWithCareSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    category_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    preset_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    watering_period: Joi.number().integer().min(1).required(),
    document: Joi.string()
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
