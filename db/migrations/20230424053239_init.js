const { PlantState } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('plant_states', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name', 20).notNullable();
        table.string('description', 255);
    }).then(() => {
        // Add 'plant_states' enum values: waiting
        return knex('plant_states').insert({
            id: PlantState.WAITING.id,
            name: PlantState.WAITING.name,
            description: PlantState.WAITING.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: pending
        return knex('plant_states').insert({
            id: PlantState.PENDING.id,
            name: PlantState.PENDING.name,
            description: PlantState.PENDING.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: ready
        return knex('plant_states').insert({
            id: PlantState.READY.id,
            name: PlantState.READY.name,
            description: PlantState.READY.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: due
        return knex('plant_states').insert({
            id: PlantState.DUE.id,
            name: PlantState.DUE.name,
            description: PlantState.DUE.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: disabled
        return knex('plant_states').insert({
            id: PlantState.DISABLED.id,
            name: PlantState.DISABLED.name,
            description: PlantState.DISABLED.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: sold
        return knex('plant_states').insert({
            id: PlantState.SOLD.id,
            name: PlantState.SOLD.name,
            description: PlantState.SOLD.description
        });
    }).then(() => {
        // Add 'plant_states' enum values: reserved
        return knex('plant_states').insert({
            id: PlantState.RESERVED.id,
            name: PlantState.RESERVED.name,
            description: PlantState.RESERVED.description
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plant_states');
};
