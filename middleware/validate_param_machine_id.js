const machineService = require('../service/machine/machine');

const uuid = require('uuid');
const debug = require('debug')('app:middleware');

const validateParamMachineId = async (req, res, next) => {

    // Read filter from the request
    const filter = { machine_id: req.query.machine_id };
    debug(`Validator (machine_id): filtering : ${JSON.stringify(filter, null, 2)}`);

    // Check for missing or empty filter
    if (!filter.machine_id) {
        debug(`--> Validator (machine_id): filter 'machine_id' is present? : failed`);
        return res.status(400).json({ exception: "Parameter 'machine_id' is required." });
    }
    debug(`Validator (machine_id): filter 'machine_id' is present? : pass`);

    // Check if the 'machine_id' is a valid UUID
    if (!uuid.validate(filter.machine_id)) {
        debug(`--> Validator (machine_id): filter 'machine_id' uuid validation : failed`);
        return res.status(400).json({ exception: "Paramer 'machine_id' is an invalid ID format." });
    }
    debug(`Validator (machine_id): filter 'machine_id' uuid validation : pass`);

    // Check if the 'machine_id' exists and handle errors
    const machine = await machineService.getMachine(filter.machine_id);
    if (!machine) {
        debug(`--> Validator (machine_id): filter 'machine_id' exist? : failed`);
        return res.status(404).json({ exception: 'Not found: machine_id' });
    }
    debug(`Validator (machine_id): filter 'machine_id' exist? : pass`);
    debug(``);

    // If everything is valid, add the filter to the request object and call the next middleware
    req.filter = { location_id: filter.machine_id };
    next();
}

module.exports = validateParamMachineId;
