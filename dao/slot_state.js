const db = require('../db/db');

const debug = require('debug')('app:dao');

class SlotStateDAO {
    async getAllSlotStates() {

        // select all
        const query = await db('slot_states')
            .select('*');

        return query;
    }
    async getSlotState(id) {
        const [slot_state] = await db('slot_states')
            .select('*')
            .where('id', id)

        if (!slot_state) {
            debug(`--> Slot State: get? : failed`);
            return;
        }
        debug(`Slot State: get? : pass`);
        return slot_state;
    }
}

module.exports = new SlotStateDAO();
