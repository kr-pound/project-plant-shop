const Joi = require('joi');

const machineWithLocationSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).max(255),
    capacity: Joi.number().integer().min(1).max(99).required()
});

/**
 * Input Validation
 * @param {*} machineWithLocation
 * @returns { "value": "", "error": "" }
 */
function validateMachineWithLocation(machineWithLocation) {
    return machineWithLocationSchema.validate(machineWithLocation);
}

module.exports = {
    validateMachineWithLocation,
    machineWithLocationSchema
};
