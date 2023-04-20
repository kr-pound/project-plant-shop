const plantTypeDAO = require('../../dao/plant_type');

const debug = require('debug')('app:service');

class PlantTypeService {
    async createPlantType(plant_type) {
        debug(`PlantType: get the body : ${JSON.stringify(plant_type, null, 2)}`);
        const { id, name, description, category_id } = plant_type;
        debug(`PlantType: creating..`);
        return plantTypeDAO.createPlantType(id, name, description, category_id);
    }

    async getAllPlantTypes() {
        debug(`PlantType: getting..`);
        return plantTypeDAO.getAllPlantTypes();
    }
    async getPlantType(id) {
        debug(`PlantType: get id : ${id}`);
        debug(`PlantType: getting..`);
        return plantTypeDAO.getPlantType(id);
    }

    async updatePlantType(id, plant_type) {
        debug(`PlantType: get id : ${id}`);
        debug(`PlantType: get the body : ${JSON.stringify(plant_type, null, 2)}`);
        const { name, description, category_id } = plant_type;
        debug(`PlantType: updating..`);
        return plantTypeDAO.updatePlantType(id, name, description, category_id);
    }

    async softDeletePlantType(id) {
        debug(`PlantType: get id : ${id}`);
        debug(`PlantType: soft deleting..`);
        return plantTypeDAO.softDeletePlantType(id);
    }
    async softDeleteAllPlantTypes() {
        debug(`PlantType: soft deleting..`);
        return plantTypeDAO.softDeleteAllPlantTypes();
    }
}

module.exports = new PlantTypeService();
