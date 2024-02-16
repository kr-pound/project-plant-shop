const machineWithLocationService = require('../service/machine/machine_with_location');

// Validation Module
const machineWithLocationModel = require('../model/machine_with_location');
const uuid = require('uuid');

const debug = require('debug')('app:controller');

class MachineWithLocationController {
    async createMachineWithLocation(req, res) {
        try {
            debug(`=== POST Request ===`);
            debug(`MachineWithLocation: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> MachineWithLocation: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`MachineWithLocation: request body is present? : pass`);

            // Validate the request body and handle validation errors
            const { error } = machineWithLocationModel.validateMachineWithLocation(req.body);
            if (error) {
                debug(`--> MachineWithLocation: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`MachineWithLocation: model validation : pass`);

            // Create the machineWithLocation and handle errors
            const createdMachineWithLocation = await machineWithLocationService.createMachineWithLocation({ ...req.body, ...req.filter });
            if (!createdMachineWithLocation) {
                debug(`--> MachineWithLocation: created successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to create machineWithLocation.' });
            }
            debug(`MachineWithLocation: created successfully? : pass`);

            // Return a simplified response object
            const response = {
                id: createdMachineWithLocation.id,
                name: createdMachineWithLocation.name,
                description: createdMachineWithLocation.description,
                capacity: createdMachineWithLocation.capacity,
                plant_amount: createdMachineWithLocation.plant_amount,
                staff_id: createdMachineWithLocation.staff_id
            };
            res.status(201).json(response);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(response, null, 2)}`);

        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async getAllMachinesWithLocations(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`MachineWithLocation: get the request query : ${JSON.stringify(req.query, null, 2)}`);

            // Use the filter from the request object (get from Middleware)
            // Use the search keyword from the query
            const machinesWithLocations = await machineWithLocationService.getAllMachinesWithLocations(req.filter, {}, req.query.search);
            if (!machinesWithLocations) {
                debug(`--> MachineWithLocation: get successfully? : failed`);
                return res.status(404).json({ exception: 'Unable to get MachinesWithLocations.' });
            }
            debug(`MachineWithLocation: get successfully? : pass`);

            res.json(machinesWithLocations);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(machinesWithLocations, null, 2)}`);

        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
    async getMachineWithLocation(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`MachineWithLocation: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> MachineWithLocation: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`MachineWithLocation: uuid validation : pass`);

            // Check if the machineWithLocation exists and handle errors
            const machineWithLocation = await machineWithLocationService.getMachineWithLocation(req.params.id);
            if (!machineWithLocation) {
                debug(`--> MachineWithLocation: id exist? : failed`);
                return res.status(404).json({ exception: 'MachineWithLocation not found.' });
            }
            debug(`MachineWithLocation: id exist? : pass`);

            res.json(machineWithLocation);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(machineWithLocation, null, 2)}`);

        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async updateMachineWithLocation(req, res) {
        try {
            debug(`=== PUT Request ===`);
            debug(`MachineWithLocation: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            debug(`MachineWithLocation: get the request body : ${JSON.stringify(req.body, null, 2)}`);
            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> MachineWithLocation: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`MachineWithLocation: request body is present? : pass`);

            // Validate the request body and handle validation errors
            const { error } = machineWithLocationModel.validateMachineWithLocation(req.body);
            if (error) {
                debug(`--> MachineWithLocation: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`MachineWithLocation: model validation : pass`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> MachineWithLocation: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`MachineWithLocation: uuid validation : pass`);

            // Check if the machineWithLocation exists and handle errors
            const machineWithLocation = await machineWithLocationService.getMachineWithLocation(req.params.id);
            if (!machineWithLocation) {
                debug(`--> MachineWithLocation: id exist? : failed`);
                return res.status(404).json({ exception: 'MachineWithLocation not found.' });
            }
            debug(`MachineWithLocation: id exist? : pass`);

            // Update the machineWithLocation and handle errors
            const updatedMachineWithLocation = await machineWithLocationService.updateMachineWithLocation(req.params.id, req.body);
            if (!updatedMachineWithLocation) {
                debug(`--> MachineWithLocation: updated successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to update machineWithLocation.' });
            }
            debug(`MachineWithLocation: updated successfully? : pass`);


            // Return a simplified response object
            const response = {
                id: updatedMachineWithLocation.id,
                name: updatedMachineWithLocation.name,
                description: updatedMachineWithLocation.description,
                capacity: updatedMachineWithLocation.capacity,
                plant_amount: updatedMachineWithLocation.plant_amount,
                staff_id: updatedMachineWithLocation. staff_id
            };
            res.status(200).json(response);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(response, null, 2)}`);

        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async deleteMachineWithLocation(req, res) {
        try {
            debug(`=== DELETE Request ===`);
            debug(`MachineWithLocation: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> MachineWithLocation: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`MachineWithLocation: uuid validation : pass`);

            // Check if the machineWithLocation exists and handle errors
            const machineWithLocation = await machineWithLocationService.getMachineWithLocation(req.params.id);
            if (!machineWithLocation) {
                debug(`--> MachineWithLocation: id exist? : failed`);
                return res.status(404).json({ exception: 'MachineWithLocation not found.' });
            }
            debug(`MachineWithLocation: id exist? : pass`);

            // Delete the machineWithLocation and handle errors
            const deletedMachineWithLocation = await machineWithLocationService.softDeleteMachineWithLocation(req.params.id);
            if (!deletedMachineWithLocation) {
                debug(`---> MachineWithLocation: deleted successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to delete machineWithLocation.' });
            }
            debug(`MachineWithLocation: deleted successfully? : pass`);

            // Return a simplified response object
            const response = {
                id: deletedMachineWithLocation.id,
                name: deletedMachineWithLocation.name,
                description: deletedMachineWithLocation.description,
                capacity: deletedMachineWithLocation.capacity,
                plant_amount: deletedMachineWithLocation.plant_amount,
                staff_id: deletedMachineWithLocation. staff_id
            };
            res.status(200).json(response);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(response, null, 2)}`);

        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
    async deleteAllMachinesWithLocations(req, res) {
        try {
            debug(`=== DELETE Request ===`);
            const deletedMachinesWithLocation = await machineWithLocationService.softDeleteAllMachinesWithLocations();
            if (!deletedMachinesWithLocation) {
                debug(`---> MachineWithLocation: deleted successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to delete machinesWithLocations.' });
            }
            debug(`MachineWithLocation: deleted successfully? : pass`);

            res.json(deletedMachinesWithLocation);
            debug(`\nMachineWithLocation: response back to client : ${JSON.stringify(deletedMachinesWithLocation, null, 2)}`);
        } catch (err) {
            debug(`--> MachineWithLocation: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new MachineWithLocationController();
