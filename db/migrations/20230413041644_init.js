const { PresetIntensity } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('preset_intensities', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name', 20).notNullable();
        table.string('description', 255);
    }).then(() => {
        // Add 'preset_intensities' enum values: Direct
        return knex('preset_intensities').insert({
            id: PresetIntensity.DIRECT.id,
            name: PresetIntensity.DIRECT.name,
            description: PresetIntensity.DIRECT.description
        });
    }).then(() => {
        // Add 'preset_intensities' enum values: Indirect
        return knex('preset_intensities').insert({
            id: PresetIntensity.INDIRECT.id,
            name: PresetIntensity.INDIRECT.name,
            description: PresetIntensity.INDIRECT.description
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('preset_intensities');
};
