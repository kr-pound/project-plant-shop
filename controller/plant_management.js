const plantManagementService = require('../service/plant_management');
const plantStateService = require('../service/plant/plant_state');

// Validation Module
const uuid = require('uuid');

const debug = require('debug')('app:controller');

class PlantManagementController {
    async requestChangePlantState(req, res) {
        try {
            debug(`=== PUT Request ===`);
            debug(`PlantManagement: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            debug(`PlantManagement: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> PlantManagement: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`PlantManagement: request body is present? : pass`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> PlantManagement: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`PlantManagement: uuid validation : pass`);

            // Check if the foreign id exists and handle errors: plant_state_id
            if (req.body.plant_state_id) {
                const plant_state = await plantStateService.getPlantState(req.body.plant_state_id);
                if (!plant_state) {
                    debug(`--> PlantManagement: foreign id 'plant_state_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_state_id' });
                }
            }
            debug(`PlantManagement: foreign id 'plant_state_id' validation : pass`);

            // Processing the Request
            const updatedData = await plantManagementService.requestChangePlantState(req.params.id, req.body.plant_state_id);
            if (!updatedData) {
                debug(`--> PlantManagement: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`PlantManagement: successfully? : pass`);

            // Return the response object
            res.status(200).json(updatedData);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(updatedData, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new PlantManagementController();
