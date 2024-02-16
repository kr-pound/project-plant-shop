const db = require('../db/db');

const debug = require('debug')('app:dao');

class PresetDAO {
    async getAllPresets() {

        // select all
        const query = await db('presets')
            .select('*');

        return query;
    }
    async getPreset(id) {
        const [preset] = await db('presets')
            .select('*')
            .where('id', id)

        if (!preset) {
            debug(`--> Preset: get? : failed`);
            return;
        }
        debug(`Preset: get? : pass`);
        return preset;
    }
}

module.exports = new PresetDAO();
