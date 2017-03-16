const config = require('./knexfile.js')
const env = "development"

module.exports = knex

knex.migrate.latest([config])
