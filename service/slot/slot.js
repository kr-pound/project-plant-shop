const slotDAO = require('../../dao/slot');

const debug = require('debug')('app:service');

class SlotService {
    async createSlot(slot) {
        debug(`Slot: get the body : ${JSON.stringify(slot, null, 2)}`);
        const { slot_code, slot_state_id, location_id } = slot;
        debug(`Slot: creating..`);
        return slotDAO.createSlot(slot_code, slot_state_id, location_id);
    }

    async getAllSlots() {
        debug(`Slot: getting..`);
        return slotDAO.getAllSlots();
    }
    async getSlot(id) {
        debug(`Slot: get id : ${id}`);
        debug(`Slot: getting..`);
        return slotDAO.getSlot(id);
    }

    async updateSlot(id, slot) {
        debug(`Slot: get id : ${id}`);
        debug(`Slot: get the body : ${JSON.stringify(slot, null, 2)}`);
        const { slot_code, location_id } = slot;
        debug(`Slot: updating..`);
        return slotDAO.updateSlot(id, slot_code, location_id);
    }
    async updateSlotState(id, slot_state_id) {
        debug(`Slot: get id : ${id}`);
        debug(`Slot: updating slot state..`);
        return slotDAO.updateSlotState(id, slot_state_id);
    }

    async softDeleteSlot(id) {
        debug(`Slot: get id : ${id}`);
        debug(`Slot: soft deleting..`);
        return slotDAO.softDeleteSlot(id);
    }
    async softDeleteAllSlots() {
        debug(`Slot: soft deleting..`);
        return slotDAO.softDeleteAllSlots();
    }
}

module.exports = new SlotService();
