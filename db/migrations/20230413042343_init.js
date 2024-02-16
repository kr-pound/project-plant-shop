const { PresetLighting } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('preset_lightings', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name', 20).notNullable();
        table.string('description', 255).notNullable;
    }).then(() => {
        // Add 'preset_lightings' enum values: Full Sun
        return knex('preset_lightings').insert({
            id: PresetLighting.FULL_SUN.id,
            name: PresetLighting.FULL_SUN.name,
            description: PresetLighting.FULL_SUN.description
        });
    }).then(() => {
        // Add 'preset_lightings' enum values: Partial Sun
        return knex('preset_lightings').insert({
            id: PresetLighting.PARTIAL_SUN.id,
            name: PresetLighting.PARTIAL_SUN.name,
            description: PresetLighting.PARTIAL_SUN.description
        });
    }).then(() => {
        // Add 'preset_lightings' enum values: Partial Shade
        return knex('preset_lightings').insert({
            id: PresetLighting.PARTIAL_SHADE.id,
            name: PresetLighting.PARTIAL_SHADE.name,
            description: PresetLighting.PARTIAL_SHADE.description
        });
    }).then(() => {
        // Add 'preset_lightings' enum values: Low Light
        return knex('preset_lightings').insert({
            id: PresetLighting.LOW_LIGHT.id,
            name: PresetLighting.LOW_LIGHT.name,
            description: PresetLighting.LOW_LIGHT.description
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('preset_lightings');
};
