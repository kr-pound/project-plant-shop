const knex = require('knex');
const config = require('config');
const knexfile = require('./knexfile');

// Get the current environment from the NODE_ENV environment variable
const env = process.env.NODE_ENV || 'development';

// Use the correct configuration settings for the current environment
const dbConfig = knexfile[env];

// Create the Knex instance using the configuration settings
const db = knex(dbConfig);


module.exports = db;
