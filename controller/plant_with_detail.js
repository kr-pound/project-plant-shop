const plantWithDetailService = require('../service/plant/plant_with_detail');
const plantTypeService = require('../service/plant_type/plant_type');
const slotService = require('../service/slot/slot');

// Validation Module
const plantWithDetailModel = require('../model/plant_with_detail');
const uuid = require('uuid');

const debug = require('debug')('app:controller');

class PlantWithDetailController {
    async createPlantWithDetail(req, res) {
        try {
            debug(`=== POST Request ===`);
            debug(`PlantWithDetail: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> PlantWithDetail: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`PlantWithDetail: request body is present? : pass`);

            // Assign default image name
            const { image_name } = req.body;
            if (!image_name) {
                req.body.image_name = 'default.jpg';
            }

            // Validate the request body and handle validation errors
            const { error } = plantWithDetailModel.validatePlantWithDetail(req.body);
            if (error) {
                debug(`--> PlantWithDetail: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`PlantWithDetail: model validation : pass`);

            // Check if the foreign id exists and handle errors: plant_type_id
            if (req.body.plant_type_id) {
                const plant_type = await plantTypeService.getPlantType(req.body.plant_type_id);
                if (!plant_type) {
                    debug(`--> PlantWithDetail: foreign id 'plant_type_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_type' });
                }
            }
            debug(`PlantWithDetail: foreign id 'plant_type_id' validation : pass`);

            // Check if the foreign id exists and handle errors: slot_id
            if (req.body.slot_id) {
                const slot = await slotService.getSlot(req.body.slot_id);
                if (!slot) {
                    debug(`--> PlantWithDetail: foreign id 'slot_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: slot' });
                }
            }
            debug(`PlantWithDetail: foreign id 'slot_id' validation : pass`);

            // Create the plantWithDetail and handle errors
            const createdPlantWithDetail = await plantWithDetailService.createPlantWithDetail({ ...req.body, ...req.filter });
            if (!createdPlantWithDetail) {
                debug(`--> PlantWithDetail: created successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to create plantWithDetail.' });
            }
            debug(`PlantWithDetail: created successfully? : pass`);

            // Return the response object
            res.status(201).json(createdPlantWithDetail);
            debug(`\nPlantWithDetail: response back to client : ${JSON.stringify(createdPlantWithDetail, null, 2)}`);

        } catch (err) {
            debug(`--> PlantWithDetail: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async getAllPlantsWithDetails(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`PlantWithDetail: get the request query : ${JSON.stringify(req.query, null, 2)}`);

            const sortby = req.query.sortby;
            const validColumns = ['name', 'price', 'date'];

            // Default field (sortby): 'name'
            const field = validColumns.includes(sortby) ? sortby : 'slot_code';

            // Default order: 'asc'
            const order = req.query.order === 'desc' ? 'desc' : 'asc';
            const sort = { field, order };
            debug(`PlantWithDetail: sorting : ${JSON.stringify(sort, null, 2)}`);

            // Use the filter from the request object (get from Middleware)
            // Use the search keyword from the query
            const plantsWithDetails = await plantWithDetailService.getAllPlantsWithDetails(req.filter, sort, req.query.search);
            if (!plantsWithDetails) {
                debug(`--> PlantWithDetail: get successfully? : failed`);
                return res.status(404).json({ exception: 'Unable to get PlantsWithDetails.' });
            }
            debug(`PlantWithDetail: get successfully? : pass`);

            res.json(plantsWithDetails);
            debug(`\nPlantWithDetail: response back to client : ${JSON.stringify(plantsWithDetails, null, 2)}`);

        } catch (err) {
            debug(`--> PlantWithDetail: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }

    }
    async getPlantWithDetail(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`PlantWithDetail: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> PlantWithDetail: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`PlantWithDetail: uuid validation : pass`);

            // Check if the plantWithDetail exists and handle errors
            const plantWithDetail = await plantWithDetailService.getPlantWithDetail(req.params.id);
            if (!plantWithDetail) {
                debug(`--> PlantWithDetail: id exist? : failed`);
                return res.status(404).json({ exception: 'PlantWithDetail not found.' });
            }
            debug(`PlantWithDetail: id exist? : pass`);

            res.json(plantWithDetail);
            debug(`\nPlantWithDetail: response back to client : ${JSON.stringify(plantWithDetail, null, 2)}`);

        } catch (err) {
            debug(`--> PlantWithDetail: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async updatePlantWithDetail(req, res) {
        try {
            debug(`=== PUT Request ===`);
            debug(`PlantWithDetail: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            debug(`PlantWithDetail: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> PlantWithDetail: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`PlantWithDetail: request body is present? : pass`);

            // Assign default image name
            const { image_name } = req.body;
            if (!image_name) {
                req.body.image_name = 'default.jpg';
            }

            // Validate the request body and handle validation errors
            const { error } = plantWithDetailModel.validatePlantWithDetail(req.body);
            if (error) {
                debug(`--> PlantWithDetail: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`PlantWithDetail: model validation : pass`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> PlantWithDetail: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`PlantWithDetail: uuid validation : pass`);

            // Check if the foreign id exists and handle errors: plant_type_id
            if (req.body.plant_type_id) {
                const plant_type = await plantTypeService.getPlantType(req.body.plant_type_id);
                if (!plant_type) {
                    debug(`--> PlantWithDetail: foreign id 'plant_type_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_type_id' });
                }
            }
            debug(`PlantWithDetail: foreign id 'plant_type_id' validation : pass`);

            // Check if the foreign id exists and handle errors: slot_id
            if (req.body.slot_id) {
                const slot = await slotService.getSlot(req.body.slot_id);
                if (!slot) {
                    debug(`--> PlantWithDetail: foreign id 'slot_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: slot_id' });
                }
            }
            debug(`PlantWithDetail: foreign id 'slot_id' validation : pass`);

            // Check if the plantWithDetail exists and handle errors
            const plantWithDetail = await plantWithDetailService.getPlantWithDetail(req.params.id);
            if (!plantWithDetail) {
                debug(`--> PlantWithDetail: id exist? : failed`);
                return res.status(404).json({ exception: 'PlantWithDetail not found.' });
            }
            debug(`PlantWithDetail: id exist? : pass`);

            // Update the plantWithDetail and handle errors
            const updatedPlantWithDetail = await plantWithDetailService.updatePlantWithDetail(req.params.id, req.body);
            if (!updatedPlantWithDetail) {
                debug(`--> PlantWithDetail: updated successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to update plantWithDetail.' });
            }
            debug(`PlantWithDetail: updated successfully? : pass`);

            // Return the response object
            res.status(200).json(updatedPlantWithDetail);
            debug(`\nPlantWithDetail: response back to client : ${JSON.stringify(updatedPlantWithDetail, null, 2)}`);

        } catch (err) {
            debug(`--> PlantWithDetail: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async deletePlantWithDetail(req, res) {
        try {
            debug(`=== DELETE Request ===`);
            debug(`PlantWithDetail: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> PlantWithDetail: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`PlantWithDetail: uuid validation : pass`);

            // Check if the plantWithDetail exists and handle errors
            const plantWithDetail = await plantWithDetailService.getPlantWithDetail(req.params.id);
            if (!plantWithDetail) {
                debug(`--> PlantWithDetail: id exist? : failed`);
                return res.status(404).json({ exception: 'PlantWithDetail not found.' });
            }
            debug(`PlantWithDetail: id exist? : pass`);

            // Delete the plantWithDetail and handle errors
            const deletedPlantWithDetail = await plantWithDetailService.softDeletePlantWithDetail(req.params.id);
            if (!deletedPlantWithDetail) {
                debug(`---> PlantWithDetail: deleted successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to delete plantWithDetail.' });
            }
            debug(`PlantWithDetail: deleted successfully? : pass`);

            // Return the response object
            res.status(200).json(deletedPlantWithDetail);
            debug(`\nPlantWithDetail: response back to client : ${JSON.stringify(deletedPlantWithDetail, null, 2)}`);

        } catch (err) {
            debug(`--> PlantWithDetail: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new PlantWithDetailController();
