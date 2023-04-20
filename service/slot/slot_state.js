const slotStateDAO = require('../../dao/slot_state');

const debug = require('debug')('app:service');

class SlotStateService {
    async getAllSlotStates() {
        debug(`SlotState: getting..`);
        return slotStateDAO.getAllSlotStates();
    }
    async getSlotState(id) {
        debug(`SlotState: get id : ${id}`);
        debug(`SlotState: getting..`);
        return slotStateDAO.getSlotState(id);
    }
}

module.exports = new SlotStateService();
