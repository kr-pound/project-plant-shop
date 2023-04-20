// Update with your config settings.
const config = require('config');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: config.get('database.client'),
    connection: {
      database: config.get('database.connection.database'),
      user: config.get('database.connection.user'),
      password: config.get('database.connection.password')
    },
    pool: {
      min: config.get('database.pool.min'),
      max: config.get('database.pool.max')
    },
    migrations: {
      tableName: config.get('database.migrations.tableName')
    }
  },
};
