const db = require('../db/db');

const debug = require('debug')('app:dao');

class StaffDAO {

    async validateLogin(username, password) {
        const staff = await db('staffs')
            .where({ username, password })
            .select('id', 'username')
            .first();

        if (!staff) {
            debug(`--> Staff: validated? : failed`);
            return;
        }
        debug(`Staff: validated? : pass`);
        return staff;
    }

    async getStaff(id) {
        const [staff] = await db('staffs').select('*').where('id', id);

        if (!staff) {
            debug(`--> Staff: get? : failed`);
            return;
        }
        debug(`Staff: get? : pass`);
        return staff;
    }
}

module.exports = new StaffDAO();
