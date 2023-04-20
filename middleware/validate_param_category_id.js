const categoryService = require('../service/plant_type/category');

const uuid = require('uuid');
const debug = require('debug')('app:middleware');

const validateParamCategoryId = async (req, res, next) => {

    // Read filter from the request
    const filter = { category_id: req.query.category_id };
    debug(`Validator (category_id): filtering : ${JSON.stringify(filter, null, 2)}`);

    // Check for missing or empty filter
    if (!filter.category_id) {
        debug(`Validator (staff_id): filter 'staff_id' is present? : pass (null)`);
        next();
        return;
    }
    debug(`Validator (staff_id): filter 'staff_id' is present? : pass`);

    // Check if the 'staff_id' is a valid UUID
    if (!uuid.validate(filter.category_id)) {
        debug(`--> Validator (category_id): filter 'category_id' uuid validation : failed`);
        return res.status(400).json({ exception: "Paramer 'category_id' is an invalid ID format." });
    }
    debug(`Validator (category_id): filter 'category_id' uuid validation : pass`);

    // Check if the 'category_id' exists and handle errors
    const category = await categoryService.getCategory(filter.category_id);
    if (!category) {
        debug(`--> Validator (category_id): filter 'category_id' exist? : failed`);
        return res.status(404).json({ exception: 'Not found: category_id' });
    }
    debug(`Validator (category_id): filter 'category_id' exist? : pass`);
    debug(``);

    // If everything is valid, add the filter to the request object and call the next middleware
    req.filter = filter;
    next();
}

module.exports = validateParamCategoryId;
