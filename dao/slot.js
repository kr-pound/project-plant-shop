const db = require('../db/db');

const debug = require('debug')('app:dao');

class SlotDAO {
    async createSlot(slot_code, slot_state_id, location_id) {
        const [createdSlot] = await db('slots').insert({
            slot_code,
            slot_state_id,
            location_id
        })
        .returning('*');

        if (!createdSlot) {
            debug(`--> Slot: created? : failed`);
            return;
        }
        debug(`Slot: created? : pass`);
        return createdSlot;
    }

    async getAllSlots() {

        // select all
        const query = await db('slots')
            .where('deleted_at', null)
            .select('id', 'slot_code', 'slot_state_id', 'location_id');

        return query;
    }
    async getSlot(id) {
        const [slot] = await db('slots')
            .select('id', 'slot_code', 'slot_state_id', 'location_id')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!slot) {
            debug(`--> Slot: get? : failed`);
            return;
        }
        debug(`Slot: get? : pass`);
        return slot;
    }

    async updateSlot(id, slot_code, slot_state_id, location_id) {
        const [updatedSlot] = await db('slots')
            .where('id', id)
            .update({
                slot_code, slot_state_id, location_id
            })
            .returning('*');

        if (!updatedSlot) {
            debug(`--> Slot: updated? : failed`);
            return;
        }
        debug(`Slot: updated? : pass`);
        return updatedMachine;
    }

    async softDeleteSlot(id) {
        const [softDeletedSlot] = await db('slots')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedSlot) {
            debug(`--> Slot: soft deleted? : failed`);
            return;
        }
        debug(`Slot: soft deleted? : pass`);
        return softDeletedSlot
    }
    async softDeleteAllSlots() {
        return await db('slots')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new SlotDAO();
