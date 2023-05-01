/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('plants', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
            .references('id').inTable('plant_details');
        table.uuid('plant_type_id').references('id').inTable('plant_types').notNullable();
        table.uuid('plant_state_id').references('id').inTable('plant_states').notNullable();
        table.uuid('slot_id').references('id').inTable('slots').notNullable();
        table.uuid('location_id').references('id').inTable('locations').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plants');
};
