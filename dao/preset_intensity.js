const db = require('../db/db');

const debug = require('debug')('app:dao');

class PresetIntensityDAO {
    async getAllPresetIntensities() {

        // select all
        const query = await db('preset_intensities')
            .select('*');

        return query;
    }
    async getPresetIntensity(id) {
        const [preset_intensity] = await db('preset_intensities')
            .select('*')
            .where('id', id)

        if (!preset_intensity) {
            debug(`--> PresetIntensity: get? : failed`);
            return;
        }
        debug(`PresetIntensity: get? : pass`);
        return preset_intensity;
    }
}

module.exports = new PresetIntensityDAO();
