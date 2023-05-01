const db = require('../db/db');

const debug = require('debug')('app:dao');

class PlantStateDAO {
    async getAllPlantStates() {

        // select all
        const query = await db('plant_states')
            .select('*');

        return query;
    }
    async getPlantState(id) {
        const [plant_state] = await db('plant_states')
            .select('*')
            .where('id', id)

        if (!plant_state) {
            debug(`--> Plant State: get? : failed`);
            return;
        }
        debug(`Plant State: get? : pass`);
        return plant_state;
    }
}

module.exports = new PlantStateDAO();
