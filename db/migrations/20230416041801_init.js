/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('plant_types', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
            .references('id').inTable('caring_details');
        table.string('name', 50).notNullable();
        table.string('description', 255).notNullable();
        table.uuid('category_id').references('id').inTable('categories').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plant_types');
};
