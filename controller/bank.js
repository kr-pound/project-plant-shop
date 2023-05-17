const bankService = require('../service/bank');
const plantService = require('../service/plant/plant');

// Validation Module
const uuid = require('uuid');
const debug = require('debug')('app:controller');

class HttpToMqttController {
    async request_purchase(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`Bank: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.plant_id)) {
                debug(`--> Bank: plant_id uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`Bank: plant_id uuid validation : pass`);

            // Check if the plant_id exists and handle errors
            if (req.params.plant_id) {
                const plant = await plantService.getPlant(req.params.plant_id);
                if (!plant) {
                    debug(`--> Bank: 'plant_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_id' });
                }
            }
            debug(`Bank: 'plant_id' validation : pass`);

            // Processing the Request
            const result = await bankService.request_purchase(req.params.plant_id);
            if (!result) {
                debug(`--> Bank: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`Bank: successfully? : pass`);

            // Return the response object
            res.status(200).json(result);
            debug(`\nBank: response back to client : ${JSON.stringify(result, null, 2)}`);

        } catch (err) {
            debug(`--> Bank: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new HttpToMqttController();