const staffService = require('../service/staff');

// Validation Module
const staffModel = require('../model/staff');

const debug = require('debug')('app:controller');

class StaffController {

    // POST
    async validateLogin(req, res) {
        try {
            debug(`=== POST Request ===`);
            debug(`Staff: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> Staff: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`Staff: request body is present? : pass`);

            // Validate the request body and handle validation errors
            const { error } = staffModel.validateStaff(req.body);
            if (error) {
                debug(`--> Staff: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`Staff: model validation : pass`);

            // Check if the staff exists and handle errors
            const staff = await staffService.validateLogin(req.body.username, req.body.password);
            if (!staff) {
                debug(`--> Staff: validated successfully? : failed`);
                return res.status(401).json({ exception: 'Invalid Username or Password.' });
            }
            debug(`--> Staff: validated successfully? : pass`);

            res.json(staff);
            debug(`\nStaff: response back to client : ${JSON.stringify(staff, null, 2)}`);

        } catch (err) {
            debug(`--> Staff: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new StaffController();
