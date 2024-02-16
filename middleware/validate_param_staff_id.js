const staffService = require('../service/staff');

const uuid = require('uuid');
const debug = require('debug')('app:middleware');

const validateParamStaffId = async (req, res, next) => {
    // Read filter from the request
    const filter = { staff_id: req.query.staff_id };
    debug(`Validator (staff_id): filtering : ${JSON.stringify(filter, null, 2)}`);

    // Check for missing or empty filter
    if (!filter.staff_id) {
        debug(`--> Validator (staff_id): filter 'staff_id' is present? : failed`);
        return res.status(400).json({ exception: "Parameter 'staff_id' is required." });
    }
    debug(`Validator (staff_id): filter 'staff_id' is present? : pass`);

    // Check if the 'staff_id' is a valid UUID
    if (!uuid.validate(filter.staff_id)) {
        debug(`--> Validator (staff_id): filter 'staff_id' uuid validation : failed`);
        return res.status(400).json({ exception: "Paramer 'staff_id' is an invalid ID format." });
    }
    debug(`Validator (staff_id): filter 'staff_id' uuid validation : pass`);

    // Check if the 'staff_id' exists and handle errors
    const staff = await staffService.getStaff(filter.staff_id);
    if (!staff) {
        debug(`--> Validator (staff_id): filter 'staff_id' exist? : failed`);
        return res.status(404).json({ exception: 'Not found: staff_id' });
    }
    debug(`Validator (staff_id): filter 'staff_id' exist? : pass`);
    debug(``);

    // If everything is valid, add the filter to the request object and call the next middleware
    req.filter = filter;
    next();
}

module.exports = validateParamStaffId;
