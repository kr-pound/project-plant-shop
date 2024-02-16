const presetLightingDAO = require('../../dao/preset_lighting');

const debug = require('debug')('app:service');

class PresetLightingService {
    async getAllPresetLightings() {
        debug(`PresetLighting: getting..`);
        return presetLightingDAO.getAllPresetLightings();
    }
    async getPresetLighting(id) {
        debug(`PresetLighting: get id : ${id}`);
        debug(`PresetLighting: getting..`);
        return presetLightingDAO.getPresetLighting(id);
    }
}

module.exports = new PresetLightingService();
