const { PlantState } = require('../enum');
const { SlotState } = require('../enum');
const plantService = require('./plant/plant');

const stateManagementService = require('./state_management');

const debug = require('debug')('app:service');

class PlantManagementService {
    async addPlantToSlot(plant) {

        // Check if 'slot state' is 'empty'
        debug(`PlantManagement: checking slot state..`);
        const slot = await stateManagementService.getSlotState(plant.slot_id);
        if (!slot) {
            return null;
        }

        const slot_state_id = slot.slot_state_id;

        if (slot_state_id != SlotState.EMPTY.id) {
            debug(`--> PlantManagement: checking slot state : failed`);
            debug(`--> PlantManagement: Slot state is not ${SlotState.EMPTY.name}..`);
            return null;
        }
        debug(`PlantManagement: current slot state : ${SlotState.EMPTY.name}`);

        // set Plant State = PENDING
        const { id, plant_type_id, slot_id, location_id } = plant
        const plant_state_id = PlantState.PENDING.id;

        plant = { id, plant_type_id, plant_state_id, slot_id, location_id };

        const createdPlant = await plantService.createPlant(plant);
        if (!createdPlant) {
            return null;
        }

        // set 'slot state' to be 'occupied'
        const updatedSlot = await stateManagementService.setSlotState(plant.slot_id, SlotState.OCCUPIED.id);
        if (!updatedSlot) {
            debug(`--> PlantManagement: updating slot state : failed`);
            debug(`--> PlantManagement: cannot update slot state to be ${SlotState.OCCUPIED.name}`);
            return null;
        }
        debug(`PlantManagement: updated slot state to be ${SlotState.OCCUPIED.name}`);

        // refresh plant amount
        const updatedMachine = await stateManagementService.refreshPlantAmount(plant.location_id);
        if (!updatedMachine) {
            debug(`--> PlantManagement: updating plant amount : failed`);
            return null;
        }
        debug(`PlantManagement: updated plant amount to be ${updatedMachine.plant_amount}`);

        return createdPlant;
    }

    async removePlantFromSlot(plant) {

        // remove plant
        const softDeletedPlant = await plantService.softDeletePlant(plant.id);
        if (!softDeletedPlant) {
            return null;
        }

        // set 'slot state' to be 'empty'
        const updatedSlot = await stateManagementService.setSlotState(plant.slot_id, SlotState.EMPTY.id);
        if (!updatedSlot) {
            debug(`--> PlantManagement: updating slot state : failed`);
            debug(`--> PlantManagement: cannot update slot state to be ${SlotState.EMPTY.name}`);
            return null;
        }
        debug(`PlantManagement: successfully removed plant from slot ${plant.slot_id}`);

        // refresh plant amount
        const updatedMachine = await stateManagementService.refreshPlantAmount(plant.location_id);
        if (!updatedMachine) {
            debug(`--> PlantManagement: updating plant amount : failed`);
            return null;
        }
        debug(`PlantManagement: updated plant amount to be ${updatedMachine.plant_amount}`);

        return softDeletedPlant
    }
}

module.exports = new PlantManagementService();