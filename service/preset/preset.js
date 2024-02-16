const presetDAO = require('../../dao/preset');

const debug = require('debug')('app:service');

class PresetService {
    async getAllPresets() {
        debug(`Preset: getting..`);
        return presetDAO.getAllPresets();
    }
    async getPreset(id) {
        debug(`Preset: get id : ${id}`);
        debug(`Preset: getting..`);
        return presetDAO.getPreset(id);
    }
}

module.exports = new PresetService();
