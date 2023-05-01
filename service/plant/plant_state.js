const plantStateDAO = require('../../dao/plant_state');

const debug = require('debug')('app:service');

class PlantStateService {
    async getAllPlantStates() {
        debug(`PlantState: getting..`);
        return plantStateDAO.getAllPlantStates();
    }
    async getPlantState(id) {
        debug(`PlantState: get id : ${id}`);
        debug(`PlantState: getting..`);
        return plantStateDAO.getPlantState(id);
    }
}

module.exports = new PlantStateService();
