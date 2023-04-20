/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('caring_details', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('preset_id').references('id').inTable('presets').notNullable();
        table.integer('watering_period').notNullable();
        table.date('next_due').notNullable();
        table.text('document').notNullable();  // Storing QR code

        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('caring_details');
};
