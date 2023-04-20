const presetService = require('./preset');
const presetIntensityService = require('./preset_intensity');
const presetLightingService = require('./preset_lighting');

class CombinedPresetService {
    async getAllCombinedPresets() {

        // Get 'presets' data
        const presets = await presetService.getAllPresets();

        // Get 'preset_intensities' and 'preset_lightings' data
        const intensities = await presetIntensityService.getAllPresetIntensities();
        const lightings = await presetLightingService.getAllPresetLightings();

        const combinedPresets = [];

        // Combine the 'preset' with 'intensity' and 'lighting'
        for (const preset of presets) {
            const intensity = intensities.find(intensity => intensity.id === preset.intensity_id);
            const lighting = lightings.find(lighting => lighting.id === preset.lighting_id);

            const { intensity_id, lighting_id, ...presetData } = preset;

            combinedPresets.push({
                ...presetData,
                intensity: {
                    id: intensity.id,
                    name: intensity.name,
                },
                lighting: {
                    id: lighting.id,
                    name: lighting.name,
                    description: lighting.description,
                },
            });
        }

        return combinedPresets;
    }

    async getCombinedPreset(id) {

        // Get 'presets' data
        const preset = await presetService.getPreset(id);
        if (!preset) {
            return null;
        }

        // Combine the 'preset' with 'intensity' and 'lighting'
        const intensity = await presetIntensityService.getPresetIntensity(preset.intensity_id);
        const lighting = await presetLightingService.getPresetLighting(preset.lighting_id);

        const { intensity_id, lighting_id, ...presetData } = preset;

        return {
            ...presetData,
            intensity: {
                id: intensity.id,
                name: intensity.name,
            },
            lighting: {
                id: lighting.id,
                name: lighting.name,
                description: lighting.description,
            },
        };
    }
}

module.exports = new CombinedPresetService();
