const plantService = require('../plant/plant');
const typeWithCareService = require('../plant_type/type_with_care');
const plantDetailService = require('./plant_detail');
const plantStateService = require('./plant_state');

const slotWithStateService = require('../slot/slot_with_state');
const locationService = require('../machine/location');

const plantManagementService = require('../plant_management');
const fileHandlingService = require('../file_handling');

const debug = require('debug')('app:service');

class PlantWithDetailService {
    async createPlantWithDetail(plantWithDetail) {

        const { plant_type_id, slot_id, location_id, price, image_name, image } = plantWithDetail;

        debug(`PlantWithDetail: receive image_name = ${image_name}`);
        debug(`PlantWithDetail: fetching 'plant_type' data..`);

        // Fetch the corresponding 'plant type'
        const plant_type = await typeWithCareService.getTypeWithCare(plant_type_id);

        debug(`PlantWithDetail: saving image file..`);

        // Extract the file extension from the image name and add a period '.' to the beginning
        const fileExtension = '.' + image_name.split('.').pop();

        // Use fileHandlingService to save the file and get fileUrl
        const fileUrl = fileHandlingService.saveFile(plant_type.name, image, fileExtension, 'base64');
        debug(`PlantWithDetail: successfully store the file`);
        debug(`PlantWithDetail: passing to the database..`);

        // Create 'plant_detail'
        const plant_detail = { price, image_name, image: fileUrl };

        const createdPlantDetail = await plantDetailService.createPlantDetail(plant_detail);
        if (!createdPlantDetail) {
            return null;
        }

        // Create 'plant'
        const { id } = createdPlantDetail;
        const plant = { id, plant_type_id, slot_id, location_id };

        const createdPlant = await plantManagementService.addPlantToSlot(plant);
        if (!createdPlant) {
            plantDetailService.softDeletePlantDetail(id);
            return null;
        }

        debug(`PlantWithDetail: fetching 'plant_state', 'slot', and 'location' data..`);

        // Fetch the corresponding 'plant_state', 'slot', and 'location'
        const plant_state = await plantStateService.getPlantState(createdPlant.plant_state_id);
        const slot = await slotWithStateService.getSlotWithState(createdPlant.slot_id);
        const location = await locationService.getLocation(createdPlant.location_id);

        // Combine 'plant_type', 'plant_detail', 'createdPlantDetail', and 'createdPlant'
        return {
            id: createdPlant.id,
            plant_type,
            plant_state,
            slot,
            location,
            price: createdPlantDetail.price,
            image_name: createdPlantDetail.image_name,
            image: createdPlantDetail.image
        };
    }

    async getAllPlantsWithDetails(filter = {}, sort = { field: 'slot_code', order: 'asc' }, keyword = '') {

        debug(`PlantWithDetail: get filter : ${JSON.stringify(filter, null, 2)}`);
        debug(`PlantWithDetail: get sort : ${JSON.stringify(sort, null, 2)}`);
        debug(`PlantWithDetail: get search keyword : ${JSON.stringify(keyword, null, 2)}`);

        const plants = await plantService.getAllPlants();
        const plant_details = await plantDetailService.getAllPlantDetails();
        const plant_states = await plantStateService.getAllPlantStates();

        debug(`PlantWithDetail: fetching 'plant_type' data..`);

        // Fetch all 'plant_types' and 'categories'
        const allPlantTypes = await typeWithCareService.getAllTypesWithCares();

        debug(`PlantWithDetail: fetching 'slot_with_state' and 'location' data..`);

        // Fetch all 'slot_with_state' and 'locations'
        const allSlotsWithState = await slotWithStateService.getAllSlotsWithStates();
        const allLocations = await locationService.getAllLocations();

        let filteredPlants = plants;
        // filter by location only when 'keyword' is empty
        if (keyword == '') {

            debug(`PlantWithDetail: filtering by 'location_id'..`);

            // Matching 'Plant' and 'Plant_Detail', then combine the results
            filteredPlants = plants.filter(plant => {
                // If a 'location_id' filter is provided, only include plants that match the 'location_id'
                if (filter.location_id && plant.location_id) {
                    return plant.location_id === filter.location_id;
                }
                return true;
            });
            debug(`PlantWithDetail: filtered? : pass`);
        }

        debug(`PlantWithDetail: matching..`);

        // Map over the plants array and combine with the other data
        const plantsWithDetailsPromises = filteredPlants.map(plant => {
            const plant_detail = plant_details.find(detail => detail.id === plant.id);
            const plant_state = plant_states.find(state => state.id === plant.plant_state_id);
            const slotWithState = allSlotsWithState.find(slot => slot.id === plant.slot_id);
            const location = allLocations.find(loc => loc.id === plant.location_id);
            const plant_type = allPlantTypes.find(type => type.id === plant.plant_type_id);

            return {
                id: plant.id,
                plant_type,
                plant_state,
                slot: slotWithState,
                location,
                price: plant_detail.price,
                image_name: plant_detail.image_name,
                image: plant_detail.image,
                created_at: plant.created_at
            };
        });

        let plantsWithDetails = await Promise.all(plantsWithDetailsPromises);

        debug(`PlantWithDetail: matched? : pass`);
        debug(`PlantWithDetail: filtering by 'keyword'..`);

        // filter by keyword
        plantsWithDetails = plantsWithDetails.filter(plant => {
            return plant.plant_type.name.toLowerCase().includes(keyword.toLowerCase());
        });
        debug(`PlantWithDetail: filtered? : pass`);
        debug(`PlantWithDetail: filtering by 'category'..`);

        plantsWithDetails = plantsWithDetails.filter(plant => {
            // If a 'category' filter is provided, only include plants that match the 'location_id'
            if (filter.category_id && plant.plant_type.category.id) {
                return plant.plant_type.category.id === filter.category_id;
            }
            return true;
        });

        debug(`PlantWithDetail: filtered? : pass`);
        debug(`PlantWithDetail: grouping plant's location..`);

        // Grouping plants by location_id
        const plantsByLocation = plantsWithDetails.reduce((accumulator, plant) => {
            const index = accumulator.findIndex((group) => group[0].location.id === plant.location.id);
            if (index === -1) {
              accumulator.push([plant]);
            } else {
              accumulator[index].push(plant);
            }
            return accumulator;
          }, []);

        debug(`PlantWithDetail: grouped? : pass`);
        debug(`PlantWithDetail: sorting..`);

        // Sort each group separately
        for (const location in plantsByLocation) {
            const group = plantsByLocation[location];
            const field = sort.field || 'slot_code';
            const order = sort.order || 'asc';

            group.sort((a, b) => {
                let aValue, bValue;
                switch (field) {
                    case 'name':
                        aValue = a.plant_type.name.toLowerCase();
                        bValue = b.plant_type.name.toLowerCase();
                        break;
                    case 'price':
                        aValue = a.price;
                        bValue = b.price;
                        break;
                    case 'date':
                        aValue = a.created_at;
                        bValue = b.created_at;
                        break;
                    default:
                        // If an invalid field is specified, default to sorting by slot_code
                        aValue = a.slot.slot_code;
                        bValue = b.slot.slot_code;
                }

                if (aValue < bValue) {
                    return order === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        console.log("\n=== Location Grouping ===");
        console.log(plantsByLocation);

        // Move the group with the matching filter location id to the front
        if (filter.location_id) {
            const index = plantsByLocation.findIndex((group) => group.some((plant) => plant.location.id === filter.location_id));
            if (index !== -1) {
                const filteredGroup = plantsByLocation[index];
                plantsByLocation.splice(index, 1);
                plantsByLocation.unshift(filteredGroup);
            }
        }

        console.log("\n=== Location Adjustment ===");
        console.log(plantsByLocation);

        // Combine the sorted groups back together
        const sortedPlants = Object.values(plantsByLocation).flat();

        debug(`PlantWithDetail: sorted? : pass`);
        return sortedPlants;
    }
    async getPlantWithDetail(id) {

        // Read 'plant_detail'
        const plant_detail = await plantDetailService.getPlantDetail(id);
        if (!plant_detail) {
            return null;
        }

        // Read 'plant'
        const plant = await plantService.getPlant(id);
        if (!plant) {
            return null;
        }

        debug(`PlantWithDetail: fetching 'plant_type', 'plant_state', 'slot', and 'location' data..`);

        // Fetch the corresponding 'plant_type', 'plant_state', 'slot', and 'location'
        const plant_type = await typeWithCareService.getTypeWithCare(plant.plant_type_id);
        const plant_state = await plantStateService.getPlantState(plant.plant_state_id);
        const slot = await slotWithStateService.getSlotWithState(plant.slot_id);
        const location = await locationService.getLocation(plant.location_id);

        // Combine 'plant_type', 'plant_detail', 'createdPlantDetail', and 'createdPlant'
        return {
            id: plant.id,
            plant_type,
            plant_state,
            slot,
            location,
            price: plant_detail.price,
            image_name: plant_detail.image_name,
            image: plant_detail.image
        };
    }

    async updatePlantWithDetail(id, plantWithDetail) {

        const { plant_type_id, slot_id, location_id, price, image_name, image } = plantWithDetail;

        debug(`PlantWithDetail: receive image_name = ${image_name}`);
        debug(`PlantWithDetail: fetching 'plant_type' data..`);

        // Fetch the corresponding 'plant type'
        const plant_type = await typeWithCareService.getTypeWithCare(plant_type_id);

        // Use fileHandlingService to save the file and get fileUrl
        let fileUrl = null;
        let plant_detail = null;
        if (image) {
            debug(`PlantWithDetail: saving image file..`);

            // Extract the file extension from the image name and add a period '.' to the beginning
            const fileExtension = '.' + image_name.split('.').pop();

            // Use fileHandlingService to save the file and get fileUrl
            fileUrl = fileHandlingService.saveFile(plant_type.name, image, fileExtension, 'base64');
            debug(`PlantWithDetail: successfully store the file`);
            debug(`PlantWithDetail: passing to the database..`);

            // Update 'plant_detail' (with image)
            plant_detail = { price, image_name, image: fileUrl };
        } else {
            // Update 'plant_detail' (no image)
            plant_detail = { price };
        }

        const updatedPlantDetail = await plantDetailService.updatePlantDetail(id, plant_detail);
        if (!updatedPlantDetail) {
            return null;
        }

        // Update 'plant'
        const plant = { id, plant_type_id, slot_id, location_id };

        const updatedPlant = await plantService.updatePlant(id, plant);
        if (!updatedPlant) {
            return null;
        }

        debug(`PlantWithDetail: fetching 'plant_state', 'slot', and 'location' data..`);

        // Fetch the corresponding 'plant_state', 'slot', and 'location'
        const plant_state = await plantStateService.getPlantState(updatedPlant.plant_state_id);
        const slot = await slotWithStateService.getSlotWithState(updatedPlant.slot_id);
        const location = await locationService.getLocation(updatedPlant.location_id);

        // Combine 'plant_type', 'plant_detail', 'createdPlantDetail', and 'createdPlant'
        return {
            id: updatedPlant.id,
            plant_type,
            plant_state,
            slot,
            location,
            price: updatedPlantDetail.price,
            image_name: updatedPlantDetail.image_name,
            image: updatedPlantDetail.image
        };
    }

    async softDeletePlantWithDetail(id) {

        // Soft Delete 'plant_detail'
        const softDeletedPlantDetail = await plantDetailService.softDeletePlantDetail(id);
        if (!softDeletedPlantDetail) {
            return null;
        }

        // Fetch the corresponding 'plant'
        const plant = await plantService.getPlant(id);

        // Soft Delete 'plant'
        const softDeletedPlant = await plantManagementService.removePlantFromSlot(plant);
        if (!softDeletedPlant) {
            return null;
        }

        debug(`PlantWithDetail: fetching 'plant_type', 'plant_state', 'slot', and 'location' data..`);

        // Fetch the corresponding 'plant_type', 'plant_state', 'slot', and 'location'
        const plant_type = await typeWithCareService.getTypeWithCare(softDeletedPlant.plant_type_id);
        const plant_state = await plantStateService.getPlantState(softDeletedPlant.plant_state_id);
        const slot = await slotWithStateService.getSlotWithState(softDeletedPlant.slot_id);
        const location = await locationService.getLocation(softDeletedPlant.location_id);

        // Combine 'plant_type', 'plant_detail', 'createdPlantDetail', and 'createdPlant'
        return {
            id: softDeletedPlant.id,
            plant_type,
            plant_state,
            slot,
            location,
            price: softDeletedPlantDetail.price,
            image_name: softDeletedPlantDetail.image_name,
            image: softDeletedPlantDetail.image
        };
    }
}

module.exports = new PlantWithDetailService();
