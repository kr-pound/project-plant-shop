const plantDAO = require('../../dao/plant');

const debug = require('debug')('app:service');

class PlantService {
    async createPlant(plant) {
        debug(`Plant: get the body : ${JSON.stringify(plant, null, 2)}`);
        const { id, plant_type_id, plant_state_id, slot_id, location_id } = plant;
        debug(`Plant: creating..`);
        return plantDAO.createPlant(id, plant_type_id, plant_state_id, slot_id, location_id);
    }

    async getAllPlants() {
        debug(`Plant: getting..`);
        return plantDAO.getAllPlants();
    }
    async getPlant(id) {
        debug(`Plant: get id : ${id}`);
        debug(`Plant: getting..`);
        return plantDAO.getPlant(id);
    }

    async updatePlant(id, plant) {
        debug(`Plant: get id : ${id}`);
        debug(`Plant: get the body : ${JSON.stringify(plant, null, 2)}`);
        const { plant_type_id, slot_id, location_id } = plant;
        debug(`Plant: updating..`);
        return plantDAO.updatePlant(id, plant_type_id, slot_id, location_id);
    }
    async updatePlantState(id, plant_state_id) {
        debug(`Plant: get id : ${id}`);
        debug(`Plant: updating plant state..`);
        return plantDAO.updatePlantState(id, plant_state_id);
    }

    async softDeletePlant(id) {
        debug(`Plant: get id : ${id}`);
        debug(`Plant: soft deleting..`);
        return plantDAO.softDeletePlant(id);
    }
    async softDeleteAllPlants() {
        debug(`Plant: soft deleting..`);
        return plantDAO.softDeleteAllPlants();
    }
}

module.exports = new PlantService();
