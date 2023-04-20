const { SlotState } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('slot_states', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name', 20).notNullable();
        table.string('description', 255);
    }).then(() => {
        // Add 'slot_states' enum values: empty
        return knex('slot_states').insert({
            id: SlotState.EMPTY.id,
            name: SlotState.EMPTY.name,
            description: SlotState.EMPTY.description
        });
    }).then(() => {
        // Add 'slot_states' enum values: occupied
        return knex('slot_states').insert({
            id: SlotState.OCCUPIED.id,
            name: SlotState.OCCUPIED.name,
            description: SlotState.OCCUPIED.description
        });
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('slot_states');
};
