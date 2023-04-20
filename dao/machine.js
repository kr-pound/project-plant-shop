const db = require('../db/db');

const debug = require('debug')('app:dao');

class MachineDAO {
    async createMachine(id, capacity, plant_amount, staff_id) {
        const [createdMachine] = await db('machines').insert({
            id,
            capacity,
            plant_amount,
            staff_id
        })
        .returning('*');

        if (!createdMachine) {
            debug(`--> Machine: created? : failed`);
            return;
        }
        debug(`Machine: created? : pass`);
        return createdMachine;
    }

    async getAllMachines() {

        // select all
        const query = await db('machines')
            .where('deleted_at', null)
            .select('*');

        return query;
    }
    async getMachine(id) {
        const [machine] = await db('machines')
            .select('*')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!machine) {
            debug(`--> Machine: get? : failed`);
            return;
        }
        debug(`Machine: get? : pass`);
        return machine;
    }

    async updateMachine(id, capacity) {
        const [updatedMachine] = await db('machines')
            .where('id', id)
            .update({
                capacity, updated_at: db.fn.now()
            })
            .returning('*');

        if (!updatedMachine) {
            debug(`--> Machine: updated? : failed`);
            return;
        }
        debug(`Machine: updated? : pass`);
        return updatedMachine;
    }

    async softDeleteMachine(id) {
        const [softDeletedMachine] = await db('machines')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedMachine) {
            debug(`--> Machine: soft deleted? : failed`);
            return;
        }
        debug(`Machine: soft deleted? : pass`);
        return softDeletedMachine
    }
    async softDeleteAllMachines() {
        return await db('machines')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new MachineDAO();
