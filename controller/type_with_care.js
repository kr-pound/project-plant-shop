const typeWithCareService = require('../service/plant_type/type_with_care');
const categoryService = require('../service/plant_type/category');
const presetService = require('../service/preset/preset');

// Validation Module
const typeWithCareModel = require('../model/type_with_care');
const uuid = require('uuid');

const debug = require('debug')('app:controller');

class TypeWithCareController {
    async createTypeWithCare(req, res) {
        try {
            debug(`=== POST Request ===`);
            debug(`TypeWithCare: get the request body : ${JSON.stringify(req.body, null, 2)}`);

            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> TypeWithCare: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`TypeWithCare: request body is present? : pass`);

            // Assign default document name
            const { document_name } = req.body;
            if (!document_name) {
                req.body.document_name = 'default.pdf';
            }

            // Validate the request body and handle validation errors
            const { error } = typeWithCareModel.validateTypeWithCare(req.body);
            if (error) {
                debug(`--> TypeWithCare: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`TypeWithCare: model validation : pass`);

            // Check if the foreign id exists and handle errors: category_id
            if (req.body.category_id) {
                const category = await categoryService.getCategory(req.body.category_id);
                if (!category) {
                    debug(`--> TypeWithCare: foreign id 'category_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: category_id' });
                }
            }
            debug(`TypeWithCare: foreign id 'category_id' validation : pass`);

            // Check if the foreign id exists and handle errors: preset_id
            if (req.body.preset_id) {
                const preset = await presetService.getPreset(req.body.preset_id);
                if (!preset) {
                    debug(`--> TypeWithCare: foreign id 'preset_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: preset_id' });
                }
            }
            debug(`TypeWithCare: foreign id 'preset_id' validation : pass`);

            // Create the typeWithCare and handle errors
            const createdTypeWithCare = await typeWithCareService.createTypeWithCare(req.body);
            if (!createdTypeWithCare) {
                debug(`--> TypeWithCare: created successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to create typeWithCare.' });
            }
            debug(`TypeWithCare: created successfully? : pass`);

            // Return the response object
            res.status(201).json(createdTypeWithCare);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(createdTypeWithCare, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async getAllTypesWithCares(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`TypeWithCare: get the request query : ${JSON.stringify(req.query, null, 2)}`);

            const sortby = req.query.sortby;
            const validColumns = ['name'];

            // Default column (sortby): 'name'
            const field = validColumns.includes(sortby) ? sortby : 'name';

            // Default order: 'asc'
            const order = req.query.order === 'desc' ? 'desc' : 'asc';
            const sort = { field, order };
            debug(`TypeWithCare: sorting : ${JSON.stringify(sort, null, 2)}`);

            // Use the filter from the request object (get from Middleware)
            // Use the search keyword from the query
            const typesWithCares = await typeWithCareService.getAllTypesWithCares(req.filter, sort);
            if (!typesWithCares) {
                debug(`--> TypeWithCare: get successfully? : failed`);
                return res.status(404).json({ exception: 'Unable to get TypesWithCares.' });
            }
            debug(`TypeWithCare: get successfully? : pass`);

            res.json(typesWithCares);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(typesWithCares, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }

    }
    async getTypeWithCare(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`TypeWithCare: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> TypeWithCare: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`TypeWithCare: uuid validation : pass`);

            // Check if the typeWithCare exists and handle errors
            const typeWithCare = await typeWithCareService.getTypeWithCare(req.params.id);
            if (!typeWithCare) {
                debug(`--> TypeWithCare: id exist? : failed`);
                return res.status(404).json({ exception: 'TypeWithCare not found.' });
            }
            debug(`TypeWithCare: id exist? : pass`);

            res.json(typeWithCare);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(typeWithCare, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async updateTypeWithCare(req, res) {
        try {
            debug(`=== PUT Request ===`);
            debug(`TypeWithCare: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            debug(`TypeWithCare: get the request body : ${JSON.stringify(req.body, null, 2)}`);
            // Check for missing or empty request body
            if (!req.body || Object.keys(req.body).length === 0) {
                debug(`--> TypeWithCare: request body is present? : failed`);
                return res.status(400).json({ exception: 'Request body is missing or empty.' });
            }
            debug(`TypeWithCare: request body is present? : pass`);

            // Assign default document name
            const { document_name } = req.body;
            if (!document_name) {
                req.body.document_name = 'default.pdf';
            }

            // Validate the request body and handle validation errors
            const { error } = typeWithCareModel.validateTypeWithCare(req.body);
            if (error) {
                debug(`--> TypeWithCare: model validation : failed`);
                return res.status(400).json({ exception: error.details[0].message });
            }
            debug(`TypeWithCare: model validation : pass`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> TypeWithCare: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`TypeWithCare: uuid validation : pass`);

            // Check if the foreign id exists and handle errors: category_id
            if (req.body.category_id) {
                const category = await categoryService.getCategory(req.body.category_id);
                if (!category) {
                    debug(`--> TypeWithCare: foreign id 'category_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: category_id' });
                }
            }
            debug(`TypeWithCare: foreign id 'category_id' validation : pass`);

            // Check if the foreign id exists and handle errors: preset_id
            if (req.body.preset_id) {
                const preset = await presetService.getPreset(req.body.preset_id);
                if (!preset) {
                    debug(`--> TypeWithCare: foreign id 'preset_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: preset_id' });
                }
            }
            debug(`TypeWithCare: foreign id 'preset_id' validation : pass`);

            // Check if the typeWithCare exists and handle errors
            const typeWithCare = await typeWithCareService.getTypeWithCare(req.params.id);
            if (!typeWithCare) {
                debug(`--> TypeWithCare: id exist? : failed`);
                return res.status(404).json({ exception: 'TypeWithCare not found.' });
            }
            debug(`TypeWithCare: id exist? : pass`);

            // Update the typeWithCare and handle errors
            const updatedTypeWithCare = await typeWithCareService.updateTypeWithCare(req.params.id, req.body);
            if (!updatedTypeWithCare) {
                debug(`--> TypeWithCare: updated successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to update typeWithCare.' });
            }
            debug(`TypeWithCare: updated successfully? : pass`);

            // Return the response object
            res.status(200).json(updatedTypeWithCare);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(updatedTypeWithCare, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async deleteTypeWithCare(req, res) {
        try {
            debug(`=== DELETE Request ===`);
            debug(`TypeWithCare: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> TypeWithCare: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`TypeWithCare: uuid validation : pass`);

            // Check if the typeWithCare exists and handle errors
            const typeWithCare = await typeWithCareService.getTypeWithCare(req.params.id);
            if (!typeWithCare) {
                debug(`--> TypeWithCare: id exist? : failed`);
                return res.status(404).json({ exception: 'TypeWithCare not found.' });
            }
            debug(`TypeWithCare: id exist? : pass`);

            // Delete the typeWithCare and handle errors
            const deletedTypeWithCare = await typeWithCareService.softDeleteTypeWithCare(req.params.id);
            if (!deletedTypeWithCare) {
                debug(`---> TypeWithCare: deleted successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to delete typeWithCare.' });
            }
            debug(`TypeWithCare: deleted successfully? : pass`);

            // Return the response object
            res.status(200).json(deletedTypeWithCare);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(deletedTypeWithCare, null, 2)}`);

        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
    async deleteAllTypesWithCares(req, res) {
        try {
            debug(`=== DELETE Request ===`);
            const deletedTypesWithCares = await typeWithCareService.softDeleteAllTypesWithCares();
            if (!deletedTypesWithCares) {
                debug(`---> TypeWithCare: deleted successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to delete typeWithCare.' });
            }
            debug(`TypeWithCare: deleted successfully? : pass`);

            res.json(deletedTypesWithCares);
            debug(`\nTypeWithCare: response back to client : ${JSON.stringify(deletedTypesWithCares, null, 2)}`);
        } catch (err) {
            debug(`--> TypeWithCare: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new TypeWithCareController();
