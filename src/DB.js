const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'skills',
    password: 'fegaNaPa27_11',
    port: '5432'
})
module.exports = {
    pool
};