const { Preset } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('presets', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('intensity_id').references('id').inTable('preset_intensities').notNullable();
        table.uuid('lighting_id').references('id').inTable('preset_lightings').notNullable();
    }).then(() => {
        // Add 'presets' enum values: Full Sun
        return knex('presets').insert({
            id: Preset.FULL_SUN.id,
            intensity_id: Preset.FULL_SUN.intensity_id,
            lighting_id: Preset.FULL_SUN.lighting_id
        });
    }).then(() => {
        // Add 'presets' enum values: Partial Sun
        return knex('presets').insert({
            id: Preset.PARTIAL_SUN.id,
            intensity_id: Preset.PARTIAL_SUN.intensity_id,
            lighting_id: Preset.PARTIAL_SUN.lighting_id
        });
    }).then(() => {
        // Add 'presets' enum values: Partial Shade
        return knex('presets').insert({
            id: Preset.PARTIAL_SHADE.id,
            intensity_id: Preset.PARTIAL_SHADE.intensity_id,
            lighting_id: Preset.PARTIAL_SHADE.lighting_id
        });
    }).then(() => {
        // Add 'presets' enum values: Low Light
        return knex('presets').insert({
            id: Preset.LOW_LIGHT.id,
            intensity_id: Preset.LOW_LIGHT.intensity_id,
            lighting_id: Preset.LOW_LIGHT.lighting_id
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('presets');
};
