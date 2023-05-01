const Joi = require('joi');

const plantWithDetailSchema = Joi.object({
    plant_type_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    slot_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    price: Joi.number().integer().min(1).max(999999).required(),
    image_name: Joi.string().min(3).max(50).regex(/\.(png|jpg)$/i).required(),
    image: Joi.string().base64().custom((value, helpers) => {
        // Decode the base64 string to a buffer
        const buffer = Buffer.from(value, 'base64');
        // Check if the first 4 bytes of the buffer match the PNG or JPG headers
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            return value; // Return value if it represents a PNG image
        } else if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
            return value; // Return value if it represents a JPG image
        }
        return helpers.error('any.invalid'); // Otherwise, return an error
    }, 'JPG or PNG image')
});

/**
 * Input Validation
 * @param {*} plantWithDetail
 * @returns { "value": "", "error": "" }
 */
function validatePlantWithDetail(plantWithDetail) {
    return plantWithDetailSchema.validate(plantWithDetail);
}

module.exports = {
    validatePlantWithDetail,
    plantWithDetailSchema
};
