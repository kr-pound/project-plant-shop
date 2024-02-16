const { StaffData } = require('../../enum');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('staffs', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('username', 20).notNullable();
        table.string('password', 20).notNullable();
    }).then(() => {
        // Add admin account
        return knex('staffs').insert({
            id: StaffData.ADMIN.id,
            username: StaffData.ADMIN.username,
            password: StaffData.ADMIN.password
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('staffs');
};
