const { Category } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name', 20).notNullable();
        table.string('description', 255);
    }).then(() => {
        // Add 'categories' enum values: indoor
        return knex('categories').insert({
            id: Category.INDOOR.id,
            name: Category.INDOOR.name,
            description: Category.INDOOR.description
        });
    }).then(() => {
        // Add 'categories' enum values: outdoor
        return knex('categories').insert({
            id: Category.OUTDOOR.id,
            name: Category.OUTDOOR.name,
            description: Category.OUTDOOR.description
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories');
};
