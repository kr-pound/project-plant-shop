const plantTypeService = require('../plant_type/plant_type');
const caringDetailService = require('../plant_type/caring_detail');

const categoryService = require('../plant_type/category');
const combinedPresetService = require('../preset/combined_preset');

const fileHandlingService = require('../file_handling');
const dateHandlingService = require('../date_handling');

const debug = require('debug')('app:service');

class TypeWithCareService {
    async createTypeWithCare(typeWithCare) {

        const { name, description, category_id, preset_id, watering_period, document_name, document } = typeWithCare;

        // Calculate 'next_due': based on the current date and watering period
        const currentDate = new Date();
        const nextDueDate = dateHandlingService.calculateNextDue(currentDate, watering_period);

        debug(`TypeWithCare: saving pdf file..`);

        // Use fileHandlingService to save the file and get fileUrl
        const fileUrl = fileHandlingService.saveFile(name, document, '.pdf', 'base64');
        debug(`TypeWithCare: successfully store the file`);
        debug(`TypeWithCare: passing to the database..`);

        // Create 'caring_detail'
        const caring_detail = { preset_id, watering_period, next_due: nextDueDate, document_name, document: fileUrl };

        const createdCaringDetail = await caringDetailService.createCaringDetail(caring_detail);
        if (!createdCaringDetail) {
            return null;
        }

        // Create 'plant_type'
        const { id } = createdCaringDetail;
        const plant_type = { id, name, description, category_id };

        const createdPlantType = await plantTypeService.createPlantType(plant_type);
        if (!createdPlantType) {
            caringDetailService.softDeleteCaringDetail(id);
            return null;
        }

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch the corresponding 'category' and 'preset'
        const category = await categoryService.getCategory(category_id);
        const combinedPreset = await combinedPresetService.getCombinedPreset(preset_id);

        // Combine 'createdPlantType', 'createdCaringDetail', 'category', and 'combinedPreset'
        return {
            id: createdPlantType.id,
            name: createdPlantType.name,
            description: createdPlantType.description,
            category,
            preset: combinedPreset,
            watering_period: createdCaringDetail.watering_period,
            next_due: createdCaringDetail.next_due,
            document_name: createdCaringDetail.document_name,
            document: createdCaringDetail.document
        };
    }

    async getAllTypesWithCares(filter = {}, sort = { field: 'name', order: 'asc' }) {
        debug(`TypeWithCare: get filter : ${JSON.stringify(filter, null, 2)}`);
        debug(`TypeWithCare: get sort : ${JSON.stringify(sort, null, 2)}`);

        const caring_details = await caringDetailService.getAllCaringDetails();
        const plant_types = await plantTypeService.getAllPlantTypes();

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch all 'categories' and 'combined_presets'
        const allCategories = await categoryService.getAllCategories();
        const allCombinedPresets = await combinedPresetService.getAllCombinedPresets();

        debug(`TypeWithCare: matching..`);

        // === Asynchronous Matching ===

        // Matching 'Caring_Detail' and 'Plant_Type', then combine the results
        const filteredPlantTypes = plant_types.filter(plant_type => {
            // If a 'category_id' filter is provided, only include plant types that match the 'category_id'
            if (filter.category_id && plant_type.category_id !== filter.category_id) {
                return false;
            }
            return true;
        });
        const typesWithCaresPromises = filteredPlantTypes.map(plant_type => {
            const caring_detail = caring_details.find(loc => loc.id === plant_type.id);

            // Find the corresponding 'category' and 'preset'
            const category = allCategories.find(cat => cat.id === plant_type.category_id);
            const combinedPreset = allCombinedPresets.find(preset => preset.id === caring_detail.preset_id);

            return {
                id: plant_type.id,
                name: plant_type.name,
                description: plant_type.description,
                category,
                preset: combinedPreset,
                watering_period: caring_detail.watering_period,
                next_due: caring_detail.next_due,
                document_name: caring_detail.document_name,
                document: caring_detail.document
            };
        });

        const typesWithCares = await Promise.all(typesWithCaresPromises);

        debug(`TypeWithCare: matched? : pass`);
        debug(`TypeWithCare: sorting..`);

        // Sort the results based on the specified sort field and order
        typesWithCares.sort((a, b) => {
            const field = sort.field || 'name';
            const order = sort.order || 'asc';

            const valueA = a[field].toLowerCase();
            const valueB = b[field].toLowerCase();

            if (valueA < valueB) {
                return order === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        debug(`TypeWithCare: sorted? : pass`);
        return typesWithCares;
    }

    async getAllPlantTypes(sort = { field: 'name', order: 'asc' }) {
        debug(`TypeWithCare: get sort : ${JSON.stringify(sort, null, 2)}`);

        const plant_types = await plantTypeService.getAllPlantTypes();

        debug(`TypeWithCare: sorting..`);

        // Sort the results based on the specified sort field and order
        plant_types.sort((a, b) => {
            const field = sort.field || 'name';
            const order = sort.order || 'asc';

            const valueA = a[field].toLowerCase();
            const valueB = b[field].toLowerCase();

            if (valueA < valueB) {
                return order === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        debug(`TypeWithCare: sorted? : pass`);
        return plant_types;
    }

    async getTypeWithCare(id) {

        // Read 'caring_detail'
        const caring_detail = await caringDetailService.getCaringDetail(id);
        if (!caring_detail) {
            return null;
        }

        // Read 'plant_type'
        const plant_type = await plantTypeService.getPlantType(id);
        if (!plant_type) {
            return null;
        }

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch the corresponding 'category' and 'preset'
        const category = await categoryService.getCategory(plant_type.category_id);
        const combinedPreset = await combinedPresetService.getCombinedPreset(caring_detail.preset_id);

        // Combine 'plant_type', 'caring_detail', 'category', and 'combinedPreset'
        return {
            id: plant_type.id,
            name: plant_type.name,
            description: plant_type.description,
            category,
            preset: combinedPreset,
            watering_period: caring_detail.watering_period,
            next_due: caring_detail.next_due,
            document_name: caring_detail.document_name,
            document: caring_detail.document
        };
    }

    async updateTypeWithCare(id, typeWithCare) {

        const { name, description, category_id, preset_id, watering_period, document_name, document } = typeWithCare;

        // Calculate 'next_due': based on the current date and watering period
        const currentDate = new Date();
        const nextDueDate = dateHandlingService.calculateNextDue(currentDate, watering_period);

        // Use fileHandlingService to save the file and get fileUrl
        let fileUrl = null;
        let caring_detail = null;
        if (document) {
            debug(`TypeWithCare: saving pdf file..`);
            fileUrl = fileHandlingService.saveFile(name, document, '.pdf', 'base64');
            debug(`TypeWithCare: successfully store the file`);
            debug(`TypeWithCare: passing to the database..`);

            // Update 'caring_detail' (with document)
            caring_detail = { preset_id, watering_period, next_due: nextDueDate, document_name, document: fileUrl };
        } else {
            // Update 'caring_detail' (no document)
            caring_detail = { preset_id, watering_period, next_due: nextDueDate };
        }

        const updatedCaringDetail = await caringDetailService.updateCaringDetail(id, caring_detail);
        if (!updatedCaringDetail) {
            return null;
        }

        // Update 'plant_type'
        const plant_type = { name, description, category_id };

        const updatedPlantType = await plantTypeService.updatePlantType(id, plant_type);
        if (!updatedPlantType) {
            return null;
        }

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch the corresponding 'category' and 'preset'
        const category = await categoryService.getCategory(category_id);
        const combinedPreset = await combinedPresetService.getCombinedPreset(preset_id);

        // Combine 'updatedPlantType', 'updatedCaringDetail', 'category', and 'combinedPreset'
        return {
            id: updatedPlantType.id,
            name: updatedPlantType.name,
            description: updatedPlantType.description,
            category,
            preset: combinedPreset,
            watering_period: updatedCaringDetail.watering_period,
            next_due: updatedCaringDetail.next_due,
            document_name: updatedCaringDetail.document_name,
            document: updatedCaringDetail.document
        };
    }

    async softDeleteTypeWithCare(id) {

        // Soft Delete 'caring_detail'
        const softDeletedCaringDetail = await caringDetailService.softDeleteCaringDetail(id);
        if (!softDeletedCaringDetail) {
            return null;
        }

        // Soft Delete 'plant_type'
        const softDeletedPlantType = await plantTypeService.softDeletePlantType(id);
        if (!softDeletedPlantType) {
            return null;
        }

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch the corresponding 'category' and 'preset'
        const category = await categoryService.getCategory(softDeletedPlantType.category_id);
        const combinedPreset = await combinedPresetService.getCombinedPreset(softDeletedCaringDetail.preset_id);

        // Combine 'softDeletedPlantType', 'softDeletedCaringDetail', 'category', and 'combinedPreset'
        return {
            id: softDeletedPlantType.id,
            name: softDeletedPlantType.name,
            description: softDeletedPlantType.description,
            category,
            preset: combinedPreset,
            watering_period: softDeletedCaringDetail.watering_period,
            next_due: softDeletedCaringDetail.next_due,
            document_name: softDeletedCaringDetail.document_name,
            document: softDeletedCaringDetail.document
        };
    }
    async softDeleteAllTypesWithCares() {

        // Soft Delete all 'caring_details'
        const softDeletedCaringDetails = await caringDetailService.softDeleteAllCaringDetails();
        if (!softDeletedCaringDetails) {
            return null;
        }

        // Soft Delete all 'plant_types'
        const softDeletedPlantTypes = await plantTypeService.softDeleteAllPlantTypes();
        if (!softDeletedPlantTypes) {
            return null;
        }

        debug(`TypeWithCare: fetching 'category' and 'preset' data..`);

        // Fetch all 'categories' and 'combined_presets'
        const allCategories = await categoryService.getAllCategories();
        const allCombinedPresets = await combinedPresetService.getAllCombinedPresets();

        // Merge 'softDeletedPlantTypes' and 'softDeletedLocations', and include category and preset information
        const deletedData = softDeletedPlantTypes.map((plant_type, index) => {
            const caring_detail = softDeletedCaringDetails[index];
            const category = allCategories.find(cat => cat.id === plant_type.category_id);
            const combinedPreset = allCombinedPresets.find(preset => preset.id === caring_detail.preset_id);
            return {
                id: plant_type.id,
                name: plant_type.name,
                description: plant_type.description,
                category,
                preset: combinedPreset,
                watering_period: caring_detail.watering_period,
                next_due: caring_detail.next_due,
                document_name: caring_detail.document_name,
                document: caring_detail.document
            };
        });

        return deletedData;
    }
}

module.exports = new TypeWithCareService();
