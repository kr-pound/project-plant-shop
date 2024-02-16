const { SlotState } = require('../enum');
const slotService = require('./slot/slot');

const debug = require('debug')('app:service');

class SlotManagementService {
    async createSlotsForLocation(location_id, capacity) {
        debug(`SlotManagement: Creating slots for location ID: ${location_id} with capacity: ${capacity}`);

        const slots = [];

        for (let i = 0; i < capacity; i++) {
            const slotCode = `A${(i + 1).toString().padStart(2, '0')}`;
            const slot = {
                slot_code: slotCode,
                slot_state_id: SlotState.EMPTY.id,
                location_id: location_id
            };

            const createdSlot = await slotService.createSlot(slot);
            if (!createdSlot) {
                debug(`--> SlotManagement: Failed to create slot ${i + 1}`);
                return null;
            }

            slots.push(createdSlot);
        }

        debug(`SlotManagement: Successfully created ${capacity} slots for location ID: ${location_id}`);
        return slots;
    }

    // Soft Delete Based on 'location_id'
    async softDeleteSlotsByLocationId(location_id) {
        debug(`SlotManagement: Soft deleting slots for location ID: ${location_id}`);

        const allSlots = await slotService.getAllSlots();
        const slotsToDelete = allSlots.filter(slot => slot.location_id === location_id);

        const deletedSlots = [];
        for (const slot of slotsToDelete) {
            const deletedSlot = await slotService.softDeleteSlot(slot.id);
            if (!deletedSlot) {
                debug(`--> SlotManagement: Failed to soft delete slot with ID: ${slot.id}`);
                return null;
            }

            deletedSlots.push(deletedSlot);
        }

        debug(`SlotManagement: Successfully soft deleted ${deletedSlots.length} slots for location ID: ${location_id}`);
        return deletedSlots;
    }

    async softDeleteAllSlots() {
        debug(`SlotManagement: Soft deleting all slots`);

        const allSlots = await slotService.getAllSlots();
        const deletedSlots = [];

        for (const slot of allSlots) {
            const deletedSlot = await slotService.softDeleteSlot(slot.id);
            if (!deletedSlot) {
                debug(`SlotManagement: Failed to soft delete slot with ID: ${slot.id}`);
                return null;
            }

            deletedSlots.push(deletedSlot);
        }

        debug(`SlotManagement: Successfully soft deleted ${deletedSlots.length} slots`);
        return deletedSlots;
    }
}

module.exports = new SlotManagementService();