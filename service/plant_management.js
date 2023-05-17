const { PlantState } = require('../enum');
const { SlotState } = require('../enum');
const plantService = require('./plant/plant');
const plantStateService = require('./plant/plant_state');

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

    async requestChangePlantState(plant_id, plant_state_id, initial_state_id = null) {

        // Check if the 'plant_id' exists and handle errors
        const plant = await plantService.getPlant(plant_id);
        if (!plant) {
            debug(`--> PlantManagement: id exist? : failed`);
            return null;
        }
        debug(`PlantManagement: id exist? : pass`);

        // Checking if the 'initail state' (before change) match the current state
        if (initial_state_id) {
            if (plant.plant_state_id != initial_state_id) {
                debug(`--> PlantManagement: current state match? : failed`);

                // Return the current 'plant_state'
                const plant_state = await plantStateService.getPlantState(plant.plant_state_id);
                return {
                    id: plant.id,
                    plant_state
                };
            }
        }
        debug(`PlantManagement: current state match? : pass`);

        // update 'plant state' in 'plant'
        const updatedData = await stateManagementService.setPlantState(plant_id, plant_state_id);
        if (!updatedData) {
            debug(`--> PlantManagement: updating plant state : failed`);
            debug(`--> PlantManagement: cannot update plant state to be ${updatedData.plant_state_id}`);
            return null;
        }
        debug(`PlantManagement: updated plant state to be ${updatedData.plant_state_id}`);

        debug(`PlantWithDetail: fetching 'plant_state' data..`);

        // Fetch the corresponding 'plant_state'
        const plant_state = await plantStateService.getPlantState(updatedData.plant_state_id);

        debug(`PlantManagement: plant state is now "${plant_state.name}"`);

        // Clear the SOLD plant
        if (plant_state.id == PlantState.SOLD.id) {
            // remove plant
            const softDeletedPlant = await this.removePlantFromSlot(plant);
            if (!softDeletedPlant) {
                return null;
            }
            debug(`PlantManagement: successfully cleared the sold plant`);
        }

        // Combine response
        return {
            id: updatedData.id,
            plant_state
        };
    }
}

module.exports = new PlantManagementService();