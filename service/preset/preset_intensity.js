const presetIntensityDAO = require('../../dao/preset_intensity');

const debug = require('debug')('app:service');

class PresetIntensityService {
    async getAllPresetIntensities() {
        debug(`PresetIntensity: getting..`);
        return presetIntensityDAO.getAllPresetIntensities();
    }
    async getPresetIntensity(id) {
        debug(`PresetIntensity: get id : ${id}`);
        debug(`PresetIntensity: getting..`);
        return presetIntensityDAO.getPresetIntensity(id);
    }
}

module.exports = new PresetIntensityService();
