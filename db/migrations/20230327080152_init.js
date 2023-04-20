/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('machines', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
            .references('id').inTable('locations');
        table.integer('capacity').notNullable();
        table.integer('plant_amount').notNullable();
        table.uuid('staff_id').references('id').inTable('staffs').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('machines');
};
