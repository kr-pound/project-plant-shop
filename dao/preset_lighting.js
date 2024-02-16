const db = require('../db/db');

const debug = require('debug')('app:dao');

class PresetLightingDAO {
    async getAllPresetLightings() {

        // select all
        const query = await db('preset_lightings')
            .select('*');

        return query;
    }
    async getPresetLighting(id) {
        const [preset_lighting] = await db('preset_lightings')
            .select('*')
            .where('id', id)

        if (!preset_lighting) {
            debug(`--> PresetLighting: get? : failed`);
            return;
        }
        debug(`PresetLighting: get? : pass`);
        return preset_lighting;
    }
}

module.exports = new PresetLightingDAO();
