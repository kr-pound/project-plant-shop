const Joi = require('joi');

const staffSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required()
});

/**
 * Input Validation
 * @param {*} staff
 * @returns { "value": "", "error": "" }
 */
function validateStaff(staff) {
    return staffSchema.validate(staff);
}

module.exports = {
    validateStaff,
    staffSchema
};
