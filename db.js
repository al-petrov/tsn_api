const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "nZ8xAjho",
    host: "localhost",
    port: 5432,
    database: 'test_social_network'
})

module.exports = pool