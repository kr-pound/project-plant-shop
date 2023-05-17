const slotService = require('./slot/slot');
const plantService = require('./plant/plant')
const machineService = require('./machine/machine');

const debug = require('debug')('app:service');

class StateManagementService {

    // === Slot ===
    async getSlotState(id) {
        return slotService.getSlot(id);
    }
    async setSlotState(id, slot_state_id) {
        return slotService.updateSlotState(id, slot_state_id);
    }

    // === Machine ===
    async countPlantsByLocationId(location_id) {
        debug(`StateManagement: Getting plants for location ID: ${location_id}`);

        const allPlants = await plantService.getAllPlants();
        const plantsToGet = allPlants.filter(plant => plant.location_id === location_id);

        debug(`StateManagement: Successfully get ${plantsToGet.length} plants for location ID: ${location_id}`);
        return plantsToGet.length;
    }

    async refreshPlantAmount(location_id) {
        const plant_amount = await this.countPlantsByLocationId(location_id);
        const updatedMachine = await machineService.updatePlantAmount(location_id, plant_amount);
        if (!updatedMachine) {
            debug(`--> StateManagement: Failed to update 'plant_amount' of machine with ID: ${location_id}`);
            return null;
        }
        return updatedMachine;
    }

    // === Plant ===
    async getPlantState(id) {
        return plantService.getPlant(id);
    }
    async setPlantState(id, plant_state_id) {
        return plantService.updatePlantState(id, plant_state_id);
    }

}

module.exports = new StateManagementService();